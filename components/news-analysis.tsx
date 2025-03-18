"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Newspaper, Calendar, TrendingUp, BarChart3 } from "lucide-react"

const newsData = [
  {
    title: "La FED mantiene i tassi invariati, segnala possibili tagli nel 2024",
    source: "Bloomberg",
    time: "2 ore fa",
    impact: "alta",
    sentiment: "positivo",
    assets: ["S&P 500", "Nasdaq", "USD"],
  },
  {
    title: "Dati sull'occupazione USA superano le aspettative",
    source: "Reuters",
    time: "4 ore fa",
    impact: "media",
    sentiment: "positivo",
    assets: ["USD", "S&P 500"],
  },
  {
    title: "BCE: inflazione in calo ma preoccupazioni per la crescita",
    source: "Financial Times",
    time: "6 ore fa",
    impact: "media",
    sentiment: "neutro",
    assets: ["EUR", "DAX"],
  },
  {
    title: "Tensioni geopolitiche in Medio Oriente influenzano il prezzo del petrolio",
    source: "CNBC",
    time: "8 ore fa",
    impact: "alta",
    sentiment: "negativo",
    assets: ["Petrolio", "Oro"],
  },
  {
    title: "Risultati trimestrali tech superano le aspettative",
    source: "Wall Street Journal",
    time: "12 ore fa",
    impact: "alta",
    sentiment: "positivo",
    assets: ["Nasdaq", "S&P 500"],
  },
]

const calendarData = [
  {
    time: "14:30",
    event: "Dati Occupazione USA (NFP)",
    forecast: "180K",
    previous: "175K",
    impact: "alta",
  },
  {
    time: "16:00",
    event: "ISM Manifatturiero",
    forecast: "49.5",
    previous: "48.7",
    impact: "media",
  },
  {
    time: "20:00",
    event: "Decisione Tassi FED",
    forecast: "5.50%",
    previous: "5.50%",
    impact: "alta",
  },
  {
    time: "Domani 10:00",
    event: "PIL Eurozona (QoQ)",
    forecast: "0.3%",
    previous: "0.2%",
    impact: "media",
  },
  {
    time: "Domani 11:00",
    event: "Inflazione Eurozona (YoY)",
    forecast: "2.4%",
    previous: "2.6%",
    impact: "alta",
  },
]

export default function NewsAnalysis() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <CardTitle>News & Analisi</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="news">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          </TabsList>

          <TabsContent value="news">
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4 mt-2">
                {newsData.map((item, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          item.sentiment === "positivo"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : item.sentiment === "negativo"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }
                      >
                        {item.sentiment}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>
                        {item.source} • {item.time}
                      </div>
                      <div>
                        Impatto:{" "}
                        <span
                          className={
                            item.impact === "alta"
                              ? "text-red-500"
                              : item.impact === "media"
                                ? "text-yellow-500"
                                : "text-green-500"
                          }
                        >
                          {item.impact}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.assets.map((asset, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="calendar">
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-3 mt-2">
                {calendarData.map((item, index) => (
                  <div key={index} className="border-b pb-2 last:border-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{item.event}</div>
                          <div className="text-xs text-muted-foreground">{item.time}</div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.impact === "alta"
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : item.impact === "media"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-green-500/10 text-green-500 border-green-500/20"
                        }
                      >
                        {item.impact}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                      <div>
                        <span className="text-muted-foreground">Previsione:</span> {item.forecast}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Precedente:</span> {item.previous}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="sentiment">
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Sentiment di Mercato</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>S&P 500</span>
                      <span className="text-green-500">Rialzista (65%)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>EUR/USD</span>
                      <span className="text-red-500">Ribassista (58%)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Oro</span>
                      <span className="text-green-500">Rialzista (72%)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Bitcoin</span>
                      <span className="text-yellow-500">Neutrale (50%)</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Posizionamento COT</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>S&P 500</span>
                      <span>Long: 68% | Short: 32%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>EUR/USD</span>
                      <span>Long: 42% | Short: 58%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Oro</span>
                      <span>Long: 75% | Short: 25%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Petrolio</span>
                      <span>Long: 55% | Short: 45%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium mb-2">Analisi AI del Sentiment</div>
                <div className="text-xs text-muted-foreground">
                  L'analisi del sentiment basata su AI indica un atteggiamento cautamente ottimista sui mercati
                  azionari, con particolare attenzione ai titoli tecnologici. Il sentiment sul dollaro USA è in
                  miglioramento dopo i recenti dati economici positivi, mentre l'euro mostra debolezza a causa delle
                  preoccupazioni sulla crescita nell'Eurozona.
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
