import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User, Settings, History, Bell, Shield, LogOut } from "lucide-react"

export const metadata: Metadata = {
  title: "Profilo | TradingSuite AI",
  description: "Gestisci il tuo profilo e le impostazioni personali",
}

export default function ProfilePage() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profilo Utente</CardTitle>
              <CardDescription>Gestisci le tue informazioni personali</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4 py-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profilo" />
                  <AvatarFallback>UT</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-medium">Trader Pro</h3>
                  <p className="text-sm text-muted-foreground">Piano Premium</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Modifica Profilo
                </Button>
              </div>

              <div className="space-y-1 mt-4">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Informazioni Personali
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Impostazioni Account
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <History className="mr-2 h-4 w-4" />
                  Cronologia Attività
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifiche
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy e Sicurezza
                </Button>
              </div>

              <div className="mt-8 pt-4 border-t">
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="settings">Impostazioni</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Panoramica Account</CardTitle>
                  <CardDescription>Riepilogo delle tue attività e statistiche</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Statistiche Trading</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Operazioni Totali</span>
                          <span className="font-medium">248</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Win Rate</span>
                          <span className="font-medium text-green-500">62%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Profit Factor</span>
                          <span className="font-medium">1.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Drawdown Max</span>
                          <span className="font-medium text-red-500">12%</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Attività Recenti</h4>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <p className="font-medium">Strategia modificata</p>
                          <p className="text-muted-foreground">Ieri, 15:30</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Backtest completato</p>
                          <p className="text-muted-foreground">2 giorni fa, 10:15</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Layout salvato</p>
                          <p className="text-muted-foreground">3 giorni fa, 14:22</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Piano Attuale</h4>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Piano Premium</p>
                          <p className="text-sm text-muted-foreground">Rinnovo: 15/04/2025</p>
                        </div>
                        <Button>Gestisci Piano</Button>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Dati in tempo reale</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Strategie illimitate</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Backtesting avanzato</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Supporto prioritario</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance di Trading</CardTitle>
                  <CardDescription>Analisi dettagliata delle tue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Grafici di performance verranno visualizzati qui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Impostazioni Profilo</CardTitle>
                  <CardDescription>Gestisci le preferenze del tuo account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Le impostazioni del profilo verranno visualizzate qui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
