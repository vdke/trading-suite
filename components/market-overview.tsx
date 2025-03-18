"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const marketData = [
  {
    name: "S&P 500",
    symbol: "ES1!",
    price: 4235.75,
    change: 0.68,
    volume: "1.2M",
  },
  {
    name: "Nasdaq",
    symbol: "NQ1!",
    price: 14582.3,
    change: 1.24,
    volume: "890K",
  },
  {
    name: "EUR/USD",
    symbol: "EURUSD",
    price: 1.0842,
    change: -0.12,
    volume: "2.5M",
  },
  {
    name: "Gold",
    symbol: "GC1!",
    price: 2028.5,
    change: 0.45,
    volume: "450K",
  },
  {
    name: "Bitcoin",
    symbol: "BTCUSD",
    price: 43250.75,
    change: 2.35,
    volume: "1.8B",
  },
]

export default function MarketOverview() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Panoramica Mercati</CardTitle>
          </div>
          <Badge variant="outline">Live</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1 border-b last:border-0">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.symbol}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{item.price.toLocaleString()}</div>
                <div className={cn("flex items-center text-xs", item.change > 0 ? "text-green-500" : "text-red-500")}>
                  {item.change > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {item.change > 0 ? "+" : ""}
                  {item.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
