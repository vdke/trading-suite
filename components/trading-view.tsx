"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CandlestickChart,
  LineChart,
  BarChart,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Crosshair,
  PanelLeft,
  PanelRight,
} from "lucide-react"
import { io } from "socket.io-client"

// Simulated price data
const generatePriceData = (days = 100, startPrice = 4200, volatility = 0.01) => {
  const data = []
  let price = startPrice

  for (let i = 0; i < days; i++) {
    const change = price * volatility * (Math.random() * 2 - 1)
    const open = price
    const close = price + change
    const high = Math.max(open, close) + Math.random() * price * volatility * 0.5
    const low = Math.min(open, close) - Math.random() * price * volatility * 0.5

    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    })

    price = close
  }

  return data
}

export default function TradingView() {
  const [priceData, setPriceData] = useState(generatePriceData())
  const [symbol, setSymbol] = useState("ES1!")
  const [timeframe, setTimeframe] = useState("1D")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw chart
    drawCandlestickChart(ctx, priceData, canvas.width, canvas.height)
  }, [priceData, canvasRef])

  useEffect(() => {
    // Establish WebSocket connection
    const socket = io("http://localhost:3001") // Replace with your server URL

    // Listen for real-time price updates
    socket.on("priceUpdate", (data) => {
      setPriceData((prevData) => {
        const newData = [...prevData]
        newData[newData.length - 1] = data
        return newData
      })
    })

    // Clean up connection on unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  const drawCandlestickChart = (ctx: CanvasRenderingContext2D, data: any[], width: number, height: number) => {
    if (!data.length) return

    // Find min and max values
    const prices = data.flatMap((d) => [d.high, d.low])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    // Padding
    const padding = { top: 20, right: 50, bottom: 30, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Scale factors
    const xScale = chartWidth / (data.length - 1)
    const yScale = chartHeight / priceRange

    // Draw price axis
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 0.5
    ctx.beginPath()
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + chartHeight - (i / 5) * chartHeight
      const price = minPrice + (i / 5) * priceRange
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)

      // Price labels
      ctx.fillStyle = "#888"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(price.toFixed(2), width - padding.right + 5, y + 4)
    }
    ctx.stroke()

    // Draw date axis
    ctx.beginPath()
    for (let i = 0; i < data.length; i += Math.ceil(data.length / 10)) {
      const x = padding.left + i * xScale
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, height - padding.bottom)

      // Date labels
      if (i % Math.ceil(data.length / 5) === 0) {
        ctx.fillStyle = "#888"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(data[i].date.slice(5), x, height - padding.bottom + 15)
      }
    }
    ctx.stroke()

    // Draw candlesticks
    for (let i = 0; i < data.length; i++) {
      const d = data[i]
      const x = padding.left + i * xScale
      const open = height - padding.bottom - (d.open - minPrice) * yScale
      const close = height - padding.bottom - (d.close - minPrice) * yScale
      const high = height - padding.bottom - (d.high - minPrice) * yScale
      const low = height - padding.bottom - (d.low - minPrice) * yScale

      // Wick
      ctx.beginPath()
      ctx.strokeStyle = d.open > d.close ? "#ef4444" : "#22c55e"
      ctx.moveTo(x, high)
      ctx.lineTo(x, low)
      ctx.stroke()

      // Body
      const bodyHeight = Math.abs(close - open)
      const y = Math.min(open, close)
      ctx.fillStyle = d.open > d.close ? "#ef4444" : "#22c55e"
      ctx.fillRect(x - 3, y, 6, bodyHeight)
    }

    // Draw current price line
    const lastPrice = data[data.length - 1].close
    const y = height - padding.bottom - (lastPrice - minPrice) * yScale
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.setLineDash([5, 3])
    ctx.moveTo(padding.left, y)
    ctx.lineTo(width - padding.right, y)
    ctx.stroke()
    ctx.setLineDash([])

    // Current price label
    ctx.fillStyle = "#3b82f6"
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "right"
    ctx.fillText(lastPrice.toFixed(2), width - padding.right + 40, y + 4)
  }

  const refreshData = () => {
    setPriceData(generatePriceData())
  }

  const changeSymbol = (newSymbol: string) => {
    setSymbol(newSymbol)
    setPriceData(
      generatePriceData(
        100,
        newSymbol === "ES1!" ? 4200 : newSymbol === "NQ1!" ? 14500 : newSymbol === "EURUSD" ? 1.08 : 4000,
        newSymbol === "EURUSD" ? 0.003 : 0.01,
      ),
    )
  }

  return (
    <Card className="h-[600px]">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CandlestickChart className="h-5 w-5 text-primary" />
            <CardTitle>Grafico di Trading</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={symbol} onValueChange={changeSymbol}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Simbolo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ES1!">ES1! (S&P 500)</SelectItem>
                <SelectItem value="NQ1!">NQ1! (Nasdaq)</SelectItem>
                <SelectItem value="EURUSD">EUR/USD</SelectItem>
                <SelectItem value="BTCUSD">BTC/USD</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1m</SelectItem>
                <SelectItem value="5m">5m</SelectItem>
                <SelectItem value="15m">15m</SelectItem>
                <SelectItem value="1H">1H</SelectItem>
                <SelectItem value="4H">4H</SelectItem>
                <SelectItem value="1D">1D</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 h-[calc(100%-70px)]">
        <Tabs defaultValue="chart" className="h-full">
          <div className="flex justify-between items-center mb-2">
            <TabsList>
              <TabsTrigger value="chart">Grafico</TabsTrigger>
              <TabsTrigger value="depth">Profondità</TabsTrigger>
              <TabsTrigger value="orderbook">Order Book</TabsTrigger>
            </TabsList>
            <div className="flex space-x-1">
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Crosshair className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LineChart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <BarChart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <PanelLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <PanelRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="chart" className="h-[calc(100%-40px)]">
            <div className="relative h-full">
              <canvas ref={canvasRef} className="w-full h-full" />
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <Button variant="outline" size="sm">
                  RSI
                </Button>
                <Button variant="outline" size="sm">
                  MACD
                </Button>
                <Button variant="outline" size="sm">
                  Bollinger
                </Button>
                <Button variant="outline" size="sm">
                  Fibonacci
                </Button>
              </div>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                  Compra
                </Button>
                <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                  Vendi
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="depth" className="h-[calc(100%-40px)]">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Visualizzazione profondità di mercato
            </div>
          </TabsContent>

          <TabsContent value="orderbook" className="h-[calc(100%-40px)]">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="border rounded-md p-2">
                <div className="text-sm font-medium mb-2 text-green-500">Acquisti</div>
                <div className="space-y-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`buy-${i}`} className="flex justify-between text-xs">
                      <span>{(priceData[priceData.length - 1].close - i * 0.25).toFixed(2)}</span>
                      <span>{Math.floor(Math.random() * 100) + 1}</span>
                      <span>{Math.floor(Math.random() * 10000) + 1000}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border rounded-md p-2">
                <div className="text-sm font-medium mb-2 text-red-500">Vendite</div>
                <div className="space-y-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`sell-${i}`} className="flex justify-between text-xs">
                      <span>{(priceData[priceData.length - 1].close + i * 0.25).toFixed(2)}</span>
                      <span>{Math.floor(Math.random() * 100) + 1}</span>
                      <span>{Math.floor(Math.random() * 10000) + 1000}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
