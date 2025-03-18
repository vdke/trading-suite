"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Save, Trash2, LayoutGrid, Download, Upload, Plus, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

// Import necessario per lo stile della griglia
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const ResponsiveGridLayout = WidthProvider(Responsive)

// Mappa dei widget disponibili
export const availableWidgets = {
  "trading-view": {
    name: "Grafico di Trading",
    component: "TradingView",
    minW: 3,
    minH: 4,
    defaultW: 6,
    defaultH: 8,
  },
  "market-overview": {
    name: "Panoramica Mercati",
    component: "MarketOverview",
    minW: 2,
    minH: 2,
    defaultW: 3,
    defaultH: 4,
  },
  "portfolio-summary": {
    name: "Portfolio",
    component: "PortfolioSummary",
    minW: 2,
    minH: 2,
    defaultW: 3,
    defaultH: 4,
  },
  "risk-management": {
    name: "Gestione Rischio",
    component: "RiskManagement",
    minW: 2,
    minH: 2,
    defaultW: 3,
    defaultH: 4,
  },
  "strategy-panel": {
    name: "Strategie",
    component: "StrategyPanel",
    minW: 2,
    minH: 3,
    defaultW: 3,
    defaultH: 8,
  },
  "news-analysis": {
    name: "News & Analisi",
    component: "NewsAnalysis",
    minW: 3,
    minH: 2,
    defaultW: 12,
    defaultH: 4,
  },
}

// Layout di default
const defaultLayouts = {
  lg: [
    { i: "trading-view", x: 0, y: 0, w: 9, h: 8 },
    { i: "market-overview", x: 0, y: 8, w: 4, h: 4 },
    { i: "portfolio-summary", x: 4, y: 8, w: 4, h: 4 },
    { i: "risk-management", x: 8, y: 8, w: 4, h: 4 },
    { i: "strategy-panel", x: 9, y: 0, w: 3, h: 8 },
    { i: "news-analysis", x: 0, y: 12, w: 12, h: 4 },
  ],
  md: [
    { i: "trading-view", x: 0, y: 0, w: 8, h: 6 },
    { i: "market-overview", x: 0, y: 6, w: 4, h: 4 },
    { i: "portfolio-summary", x: 4, y: 6, w: 4, h: 4 },
    { i: "risk-management", x: 8, y: 0, w: 4, h: 4 },
    { i: "strategy-panel", x: 8, y: 4, w: 4, h: 6 },
    { i: "news-analysis", x: 0, y: 10, w: 12, h: 4 },
  ],
  sm: [
    { i: "trading-view", x: 0, y: 0, w: 6, h: 6 },
    { i: "market-overview", x: 0, y: 6, w: 6, h: 4 },
    { i: "portfolio-summary", x: 0, y: 10, w: 6, h: 4 },
    { i: "risk-management", x: 0, y: 14, w: 6, h: 4 },
    { i: "strategy-panel", x: 0, y: 18, w: 6, h: 6 },
    { i: "news-analysis", x: 0, y: 24, w: 6, h: 4 },
  ],
  xs: [
    { i: "trading-view", x: 0, y: 0, w: 4, h: 6 },
    { i: "market-overview", x: 0, y: 6, w: 4, h: 4 },
    { i: "portfolio-summary", x: 0, y: 10, w: 4, h: 4 },
    { i: "risk-management", x: 0, y: 14, w: 4, h: 4 },
    { i: "strategy-panel", x: 0, y: 18, w: 4, h: 6 },
    { i: "news-analysis", x: 0, y: 24, w: 4, h: 4 },
  ],
}

interface DashboardManagerProps {
  widgetComponents: Record<string, React.ReactNode>
  onLayoutChange?: (layout: any, layouts: any) => void
}

export default function DashboardManager({ widgetComponents, onLayoutChange }: DashboardManagerProps) {
  const [layouts, setLayouts] = useState(defaultLayouts)
  const [savedLayouts, setSavedLayouts] = useState<Record<string, any>>({})
  const [currentLayout, setCurrentLayout] = useState<string>("default")
  const [newLayoutName, setNewLayoutName] = useState<string>("")
  const [editMode, setEditMode] = useState<boolean>(false)
  const [activeWidgets, setActiveWidgets] = useState<string[]>(defaultLayouts.lg.map((item) => item.i))
  const [widgetToAdd, setWidgetToAdd] = useState<string | null>(null)

  const isMobile = useMediaQuery("(max-width: 640px)")

  // Carica i layout salvati dal localStorage
  useEffect(() => {
    try {
      const savedLayoutsStr = localStorage.getItem("tradingsuite-layouts")
      if (savedLayoutsStr) {
        const savedLayoutsData = JSON.parse(savedLayoutsStr)
        setSavedLayouts(savedLayoutsData)
      }
    } catch (error) {
      console.error("Errore nel caricamento dei layout salvati:", error)
    }
  }, [])

  // Gestisce i tasti rapidi
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora gli eventi se si sta scrivendo in un input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Ctrl/Cmd + E: Modalità modifica
      if ((e.ctrlKey || e.metaKey) && e.key === "e") {
        e.preventDefault()
        setEditMode(!editMode)
        toast({
          title: editMode ? "Modalità modifica disattivata" : "Modalità modifica attivata",
          description: editMode ? "Il layout è ora bloccato" : "Ora puoi trascinare e ridimensionare i widget",
        })
      }

      // Ctrl/Cmd + S: Salva layout
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        saveCurrentLayout()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [editMode, layouts])

  // Salva il layout corrente
  const saveCurrentLayout = () => {
    if (currentLayout === "default") {
      // Apre il dialog per nominare il nuovo layout
      setNewLayoutName("")
      const saveButton = document.getElementById("open-save-dialog")
      if (saveButton) {
        ;(saveButton as HTMLButtonElement).click()
      }
    } else {
      // Sovrascrive il layout esistente
      const updatedLayouts = {
        ...savedLayouts,
        [currentLayout]: layouts,
      }

      try {
        localStorage.setItem("tradingsuite-layouts", JSON.stringify(updatedLayouts))
        setSavedLayouts(updatedLayouts)
        toast({
          title: "Layout salvato",
          description: `Il layout "${currentLayout}" è stato aggiornato.`,
        })
      } catch (error) {
        console.error("Errore nel salvare il layout:", error)
        toast({
          title: "Errore",
          description: "Impossibile salvare il layout.",
          variant: "destructive",
        })
      }
    }
  }

  // Salva il layout con un nuovo nome
  const saveLayoutAs = () => {
    if (!newLayoutName.trim()) {
      toast({
        title: "Nome non valido",
        description: "Inserisci un nome per il layout.",
        variant: "destructive",
      })
      return
    }

    const updatedLayouts = {
      ...savedLayouts,
      [newLayoutName]: layouts,
    }

    try {
      localStorage.setItem("tradingsuite-layouts", JSON.stringify(updatedLayouts))
      setSavedLayouts(updatedLayouts)
      setCurrentLayout(newLayoutName)
      toast({
        title: "Layout salvato",
        description: `Il layout "${newLayoutName}" è stato salvato.`,
      })
    } catch (error) {
      console.error("Errore nel salvare il layout:", error)
      toast({
        title: "Errore",
        description: "Impossibile salvare il layout.",
        variant: "destructive",
      })
    }
  }

  // Carica un layout salvato
  const loadLayout = (name: string) => {
    if (name === "default") {
      setLayouts(defaultLayouts)
      setActiveWidgets(defaultLayouts.lg.map((item) => item.i))
    } else if (savedLayouts[name]) {
      setLayouts(savedLayouts[name])
      setActiveWidgets(savedLayouts[name].lg.map((item: any) => item.i))
    }

    setCurrentLayout(name)
    setEditMode(false)

    toast({
      title: "Layout caricato",
      description: `Il layout "${name}" è stato caricato.`,
    })
  }

  // Elimina un layout salvato
  const deleteLayout = (name: string) => {
    const updatedLayouts = { ...savedLayouts }
    delete updatedLayouts[name]

    try {
      localStorage.setItem("tradingsuite-layouts", JSON.stringify(updatedLayouts))
      setSavedLayouts(updatedLayouts)

      if (currentLayout === name) {
        loadLayout("default")
      }

      toast({
        title: "Layout eliminato",
        description: `Il layout "${name}" è stato eliminato.`,
      })
    } catch (error) {
      console.error("Errore nell'eliminare il layout:", error)
      toast({
        title: "Errore",
        description: "Impossibile eliminare il layout.",
        variant: "destructive",
      })
    }
  }

  // Esporta tutti i layout
  const exportLayouts = () => {
    const allLayouts = {
      default: defaultLayouts,
      ...savedLayouts,
    }

    const dataStr = JSON.stringify(allLayouts, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "tradingsuite-layouts.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Layout esportati",
      description: "Tutti i layout sono stati esportati nel file.",
    })
  }

  // Importa layout
  const importLayouts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()

    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    const file = event.target.files[0]

    fileReader.readAsText(file, "UTF-8")
    fileReader.onload = (e) => {
      try {
        if (!e.target || typeof e.target.result !== "string") {
          throw new Error("Risultato non valido")
        }

        const importedLayouts = JSON.parse(e.target.result)

        // Verifica che i dati importati siano validi
        if (!importedLayouts || typeof importedLayouts !== "object") {
          throw new Error("Formato non valido")
        }

        // Combina i layout esistenti con quelli importati
        const combinedLayouts = {
          ...savedLayouts,
          ...importedLayouts,
        }

        // Rimuove il layout "default" dall'importazione (se presente)
        if (combinedLayouts.default && combinedLayouts.default !== defaultLayouts) {
          delete combinedLayouts.default
        }

        localStorage.setItem("tradingsuite-layouts", JSON.stringify(combinedLayouts))
        setSavedLayouts(combinedLayouts)

        toast({
          title: "Layout importati",
          description: "I layout sono stati importati correttamente.",
        })
      } catch (error) {
        console.error("Errore nell'importare i layout:", error)
        toast({
          title: "Errore",
          description: "Impossibile importare i layout. Formato non valido.",
          variant: "destructive",
        })
      }

      // Reset del campo file
      event.target.value = ""
    }

    fileReader.onerror = () => {
      toast({
        title: "Errore",
        description: "Impossibile leggere il file.",
        variant: "destructive",
      })
    }
  }

  // Gestisce l'aggiunta di un nuovo widget
  const addWidget = (widgetId: string) => {
    if (activeWidgets.includes(widgetId)) {
      toast({
        title: "Widget già presente",
        description: "Questo widget è già presente nel dashboard.",
        variant: "destructive",
      })
      return
    }

    const widget = availableWidgets[widgetId]
    if (!widget) return

    // Genera nuove posizioni per il widget in tutti i breakpoint
    const updatedLayouts = { ...layouts }
    ;["lg", "md", "sm", "xs"].forEach((breakpoint) => {
      const currentLayout = updatedLayouts[breakpoint] || []
      const newWidget = {
        i: widgetId,
        x: 0,
        y: Number.POSITIVE_INFINITY, // Posiziona in fondo
        w: widget.defaultW,
        h: widget.defaultH,
        minW: widget.minW,
        minH: widget.minH,
      }

      updatedLayouts[breakpoint] = [...currentLayout, newWidget]
    })

    setLayouts(updatedLayouts)
    setActiveWidgets([...activeWidgets, widgetId])
    setWidgetToAdd(null)

    toast({
      title: "Widget aggiunto",
      description: `Il widget "${widget.name}" è stato aggiunto al dashboard.`,
    })
  }

  // Rimuove un widget
  const removeWidget = (widgetId: string) => {
    const updatedLayouts = { ...layouts }
    ;["lg", "md", "sm", "xs"].forEach((breakpoint) => {
      if (updatedLayouts[breakpoint]) {
        updatedLayouts[breakpoint] = updatedLayouts[breakpoint].filter((item: any) => item.i !== widgetId)
      }
    })

    setLayouts(updatedLayouts)
    setActiveWidgets(activeWidgets.filter((id) => id !== widgetId))

    toast({
      title: "Widget rimosso",
      description: `Il widget "${availableWidgets[widgetId]?.name}" è stato rimosso.`,
    })
  }

  // Gestisce il cambio di layout
  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts)
    if (onLayoutChange) {
      onLayoutChange(currentLayout, allLayouts)
    }
  }

  // Filtra i widget disponibili che non sono già attivi
  const availableWidgetsToAdd = Object.entries(availableWidgets)
    .filter(([id]) => !activeWidgets.includes(id))
    .map(([id, widget]) => ({
      id,
      name: widget.name,
    }))

  return (
    <div className="dashboard-manager">
      {/* Barra degli strumenti */}
      <div className="flex items-center justify-between mb-4 bg-card rounded-md p-2 shadow-sm">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className={cn(editMode && "bg-primary text-primary-foreground")}
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            {editMode ? "Blocca Layout" : "Modifica Layout"}
          </Button>

          {editMode && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Aggiungi Widget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Aggiungi Widget</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {availableWidgetsToAdd.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Tutti i widget disponibili sono già stati aggiunti.</p>
                  ) : (
                    availableWidgetsToAdd.map((widget) => (
                      <Button
                        key={widget.id}
                        variant="outline"
                        onClick={() => addWidget(widget.id)}
                        className="justify-start"
                      >
                        {widget.name}
                      </Button>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button id="open-save-dialog" variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />
                Salva Layout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Salva Layout</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="layoutName" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="layoutName"
                    value={newLayoutName}
                    onChange={(e) => setNewLayoutName(e.target.value)}
                    className="col-span-3"
                    placeholder="Il mio layout"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={saveLayoutAs}>Salva</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Carica Layout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Carica Layout</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button
                  variant={currentLayout === "default" ? "secondary" : "outline"}
                  onClick={() => loadLayout("default")}
                  className="justify-start"
                >
                  Default
                </Button>

                {Object.keys(savedLayouts).length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nessun layout salvato. Salva un layout per vederlo qui.
                  </p>
                ) : (
                  Object.keys(savedLayouts).map((name) => (
                    <div key={name} className="flex items-center gap-2">
                      <Button
                        variant={currentLayout === name ? "secondary" : "outline"}
                        onClick={() => loadLayout(name)}
                        className="flex-grow justify-start"
                      >
                        {name}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => deleteLayout(name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={exportLayouts}>
                    <Download className="h-4 w-4 mr-1" />
                    Esporta
                  </Button>
                  <div className="relative">
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="import-layouts">
                        <Upload className="h-4 w-4 mr-1" />
                        Importa
                      </label>
                    </Button>
                    <Input
                      id="import-layouts"
                      type="file"
                      accept=".json"
                      onChange={importLayouts}
                      className="sr-only"
                    />
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Info scorciatoie da tastiera */}
      {editMode && (
        <div className="mb-4 p-2 bg-muted rounded-md text-sm flex items-center justify-between">
          <div>
            <span className="font-medium">Scorciatoie da tastiera:</span>{" "}
            <span>
              <kbd className="px-1 py-0.5 bg-background rounded border">Ctrl/Cmd + E</kbd> Modalità modifica,{" "}
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-background rounded border">Ctrl/Cmd + S</kbd> Salva layout
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setEditMode(false)}>
            <X className="h-4 w-4 mr-1" />
            Chiudi
          </Button>
        </div>
      )}

      {/* Dashboard Grid */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4 }}
        rowHeight={60}
        isDraggable={editMode}
        isResizable={editMode}
        onLayoutChange={handleLayoutChange}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {activeWidgets.map((widgetId) => {
          const Widget = widgetComponents[widgetId]
          if (!Widget) return null

          return (
            <div key={widgetId} className="relative">
              {editMode && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-1 top-1 z-50"
                  onClick={() => removeWidget(widgetId)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {Widget}
            </div>
          )
        })}
      </ResponsiveGridLayout>
    </div>
  )
}
