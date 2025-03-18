"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { BrainCircuit, Play, Pause, Save, Plus } from "lucide-react"

export default function StrategyPanel() {
  const [activeStrategy, setActiveStrategy] = useState("trend_following")
  const [isRunning, setIsRunning] = useState(false)

  const strategies = [
    {
      id: "trend_following",
      name: "Trend Following",
      description: "Strategia basata su EMA e RSI",
      parameters: [
        { name: "EMA Veloce", value: 9, min: 3, max: 50 },
        { name: "EMA Lenta", value: 21, min: 10, max: 200 },
        { name: "RSI Periodo", value: 14, min: 2, max: 30 },
        { name: "RSI Ipercomprato", value: 70, min: 50, max: 90 },
        { name: "RSI Ipervenduto", value: 30, min: 10, max: 50 },
      ],
      conditions: [
        "EMA Veloce > EMA Lenta (Long)",
        "EMA Veloce < EMA Lenta (Short)",
        "RSI < 30 (Ipervenduto)",
        "RSI > 70 (Ipercomprato)",
      ],
      performance: {
        winRate: 62,
        profitFactor: 1.8,
        sharpeRatio: 1.4,
        maxDrawdown: 12,
      },
    },
    {
      id: "mean_reversion",
      name: "Mean Reversion",
      description: "Strategia basata su Bollinger Bands",
      parameters: [
        { name: "BB Periodo", value: 20, min: 5, max: 50 },
        { name: "BB Deviazione", value: 2, min: 1, max: 4 },
        { name: "ATR Periodo", value: 14, min: 5, max: 30 },
        { name: "Take Profit (ATR)", value: 2, min: 0.5, max: 5 },
        { name: "Stop Loss (ATR)", value: 1.5, min: 0.5, max: 5 },
      ],
      conditions: [
        "Prezzo < BB Inferiore (Long)",
        "Prezzo > BB Superiore (Short)",
        "RSI < 20 (Conferma Long)",
        "RSI > 80 (Conferma Short)",
      ],
      performance: {
        winRate: 58,
        profitFactor: 1.6,
        sharpeRatio: 1.2,
        maxDrawdown: 15,
      },
    },
    {
      id: "breakout",
      name: "Breakout",
      description: "Strategia basata su rottura di range",
      parameters: [
        { name: "Periodo Range", value: 20, min: 5, max: 100 },
        { name: "ATR Filtro", value: 1.5, min: 0.5, max: 5 },
        { name: "Volume Minimo", value: 150, min: 50, max: 500 },
        { name: "Take Profit (ATR)", value: 3, min: 1, max: 10 },
        { name: "Stop Loss (ATR)", value: 2, min: 0.5, max: 5 },
      ],
      conditions: [
        "Prezzo > Massimo(n) (Long)",
        "Prezzo < Minimo(n) (Short)",
        "Volume > Media Volume * 1.5",
        "ATR > Media ATR",
      ],
      performance: {
        winRate: 45,
        profitFactor: 2.1,
        sharpeRatio: 1.6,
        maxDrawdown: 18,
      },
    },
  ]

  const currentStrategy = strategies.find((s) => s.id === activeStrategy)

  return (
    <Card className="h-[600px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <CardTitle>Strategie</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nuova
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2 h-[calc(100%-70px)] overflow-y-auto">
        <Tabs defaultValue="strategies" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strategies">Strategie</TabsTrigger>
            <TabsTrigger value="backtest">Backtest</TabsTrigger>
            <TabsTrigger value="automation">Automazione</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-4 mt-2">
            <Select value={activeStrategy} onValueChange={setActiveStrategy}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona strategia" />
              </SelectTrigger>
              <SelectContent>
                {strategies.map((strategy) => (
                  <SelectItem key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currentStrategy && (
              <>
                <div className="text-sm text-muted-foreground">{currentStrategy.description}</div>

                <Accordion type="single" collapsible defaultValue="parameters">
                  <AccordionItem value="parameters">
                    <AccordionTrigger>Parametri</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {currentStrategy.parameters.map((param, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <Label>{param.name}</Label>
                              <span className="text-sm">{param.value}</span>
                            </div>
                            <Slider defaultValue={[param.value]} max={param.max} min={param.min} step={1} />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="conditions">
                    <AccordionTrigger>Condizioni</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {currentStrategy.conditions.map((condition, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{condition}</span>
                            <Switch defaultChecked={index < 2} />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="performance">
                    <AccordionTrigger>Performance</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="border rounded p-2">
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                          <div className="text-lg font-semibold">{currentStrategy.performance.winRate}%</div>
                        </div>
                        <div className="border rounded p-2">
                          <div className="text-xs text-muted-foreground">Profit Factor</div>
                          <div className="text-lg font-semibold">{currentStrategy.performance.profitFactor}</div>
                        </div>
                        <div className="border rounded p-2">
                          <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
                          <div className="text-lg font-semibold">{currentStrategy.performance.sharpeRatio}</div>
                        </div>
                        <div className="border rounded p-2">
                          <div className="text-xs text-muted-foreground">Max Drawdown</div>
                          <div className="text-lg font-semibold">{currentStrategy.performance.maxDrawdown}%</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Salva
                  </Button>
                  <Button
                    variant={isRunning ? "destructive" : "default"}
                    size="sm"
                    onClick={() => setIsRunning(!isRunning)}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="h-4 w-4 mr-1" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Avvia
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="backtest" className="h-[calc(100%-40px)]">
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="start-date">Data Inizio</Label>
                  <Input id="start-date" type="date" defaultValue="2023-01-01" />
                </div>
                <div>
                  <Label htmlFor="end-date">Data Fine</Label>
                  <Input id="end-date" type="date" defaultValue="2023-12-31" />
                </div>
              </div>

              <div>
                <Label htmlFor="initial-capital">Capitale Iniziale</Label>
                <Input id="initial-capital" type="number" defaultValue="10000" />
              </div>

              <div className="flex justify-center pt-4">
                <Button>Esegui Backtest</Button>
              </div>

              <div className="border rounded-md p-3 mt-4">
                <div className="text-sm font-medium mb-2">Risultati Backtest</div>
                <div className="text-sm text-muted-foreground">Esegui un backtest per visualizzare i risultati</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="h-[calc(100%-40px)]">
            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <Label>Trading Automatico</Label>
                <Switch />
              </div>

              <div>
                <Label htmlFor="max-positions">Posizioni Massime</Label>
                <Input id="max-positions" type="number" defaultValue="3" />
              </div>

              <div>
                <Label htmlFor="risk-per-trade">Rischio per Trade (%)</Label>
                <Input id="risk-per-trade" type="number" defaultValue="1" />
              </div>

              <div>
                <Label>Orario di Trading</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input type="time" defaultValue="09:00" />
                  <Input type="time" defaultValue="17:30" />
                </div>
              </div>

              <div className="border rounded-md p-3 mt-4">
                <div className="text-sm font-medium mb-2">Notifiche</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Telegram</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
