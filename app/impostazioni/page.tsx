import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Impostazioni | TradingSuite AI",
  description: "Configura le impostazioni della piattaforma",
}

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Impostazioni</h1>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Generali</TabsTrigger>
          <TabsTrigger value="appearance">Aspetto</TabsTrigger>
          <TabsTrigger value="notifications">Notifiche</TabsTrigger>
          <TabsTrigger value="advanced">Avanzate</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Generali</CardTitle>
              <CardDescription>Configura le impostazioni di base della piattaforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Lingua e Regione</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Lingua</Label>
                    <Select defaultValue="it">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Seleziona lingua" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">Italiano</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Orario</Label>
                    <Select defaultValue="europe-rome">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Seleziona fuso orario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe-rome">Europe/Rome (GMT+1)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferenze di Trading</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="confirm-orders">Conferma ordini prima dell'invio</Label>
                    <Switch id="confirm-orders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound-alerts">Avvisi sonori</Label>
                    <Switch id="sound-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-logout">Logout automatico dopo inattività</Label>
                    <Switch id="auto-logout" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessione di Trading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-start">Inizio sessione</Label>
                    <Input id="session-start" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-end">Fine sessione</Label>
                    <Input id="session-end" type="time" defaultValue="17:30" />
                  </div>
                </div>
              </div>

              <Button>Salva Impostazioni</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Aspetto</CardTitle>
              <CardDescription>Personalizza l'aspetto dell'interfaccia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tema</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center space-y-2">
                    <div className="w-full h-24 bg-white rounded-md"></div>
                    <Label className="cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="theme" className="sr-only" defaultChecked />
                        <div className="h-4 w-4 rounded-full border flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Chiaro</span>
                      </div>
                    </Label>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center space-y-2">
                    <div className="w-full h-24 bg-slate-900 rounded-md"></div>
                    <Label className="cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="theme" className="sr-only" />
                        <div className="h-4 w-4 rounded-full border flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full"></div>
                        </div>
                        <span>Scuro</span>
                      </div>
                    </Label>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center space-y-2">
                    <div className="w-full h-24 bg-gradient-to-b from-white to-slate-900 rounded-md"></div>
                    <Label className="cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="theme" className="sr-only" />
                        <div className="h-4 w-4 rounded-full border flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full"></div>
                        </div>
                        <span>Sistema</span>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Colori Grafici</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bullish-color">Rialzista</Label>
                    <div className="flex">
                      <Input id="bullish-color" type="color" defaultValue="#22c55e" className="w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bearish-color">Ribassista</Label>
                    <div className="flex">
                      <Input id="bearish-color" type="color" defaultValue="#ef4444" className="w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grid-color">Griglia</Label>
                    <div className="flex">
                      <Input id="grid-color" type="color" defaultValue="#6b7280" className="w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="background-color">Sfondo</Label>
                    <div className="flex">
                      <Input id="background-color" type="color" defaultValue="#ffffff" className="w-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Layout</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-mode">Modalità compatta</Label>
                    <Switch id="compact-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-tooltips">Mostra suggerimenti</Label>
                    <Switch id="show-tooltips" defaultChecked />
                  </div>
                </div>
              </div>

              <Button>Applica Modifiche</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifiche</CardTitle>
              <CardDescription>Gestisci le preferenze di notifica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canali di Notifica</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Notifiche push</Label>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS</Label>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="telegram-notifications">Telegram</Label>
                    <Switch id="telegram-notifications" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tipi di Notifica</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="price-alerts">Avvisi di prezzo</Label>
                    <Switch id="price-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="trade-execution">Esecuzione ordini</Label>
                    <Switch id="trade-execution" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="news-alerts">Notizie di mercato</Label>
                    <Switch id="news-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-notifications">Notifiche di sistema</Label>
                    <Switch id="system-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <Button>Salva Preferenze</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Avanzate</CardTitle>
              <CardDescription>Configurazioni avanzate per utenti esperti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connessioni API</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="api-enabled">Abilita connessioni API</Label>
                    <Switch id="api-enabled" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Chiave API</Label>
                    <div className="flex space-x-2">
                      <Input id="api-key" type="password" value="••••••••••••••••" readOnly className="flex-1" />
                      <Button variant="outline">Genera Nuova</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Prestazioni</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-performance">Modalità alte prestazioni</Label>
                    <Switch id="high-performance" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-caching">Cache dati</Label>
                    <Switch id="data-caching" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cache-size">Dimensione cache (MB)</Label>
                    <Input id="cache-size" type="number" defaultValue="500" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Backup e Ripristino</h3>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline">Esporta Impostazioni</Button>
                    <p className="text-xs text-muted-foreground">Esporta tutte le impostazioni in un file JSON</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline">Importa Impostazioni</Button>
                    <p className="text-xs text-muted-foreground">Importa impostazioni da un file JSON</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" className="text-red-500 hover:text-red-500">
                      Ripristina Impostazioni Predefinite
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Ripristina tutte le impostazioni ai valori predefiniti
                    </p>
                  </div>
                </div>
              </div>

              <Button>Salva Impostazioni</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
