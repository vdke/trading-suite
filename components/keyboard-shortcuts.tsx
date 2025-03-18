"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

// Definizione delle scorciatoie predefinite
const DEFAULT_SHORTCUTS = [
  {
    category: "Navigazione",
    shortcuts: [
      { key: "Alt + D", description: "Mostra/nascondi dashboard" },
      { key: "Alt + G", description: "Vai al grafico" },
      { key: "Alt + T", description: "Vai alle strategie" },
      { key: "Alt + P", description: "Vai al portfolio" },
      { key: "Alt + N", description: "Vai alle news" },
    ],
  },
  {
    category: "Dashboard",
    shortcuts: [
      { key: "Ctrl/Cmd + E", description: "Modalità modifica" },
      { key: "Ctrl/Cmd + S", description: "Salva layout" },
      { key: "Ctrl/Cmd + Z", description: "Annulla ultima modifica" },
      { key: "Ctrl/Cmd + Shift + Z", description: "Ripristina modifica" },
    ],
  },
  {
    category: "Trading",
    shortcuts: [
      { key: "B", description: "Ordine di acquisto rapido" },
      { key: "S", description: "Ordine di vendita rapido" },
      { key: "Esc", description: "Annulla ordine corrente" },
      { key: "O", description: "Mostra ordini aperti" },
      { key: "P", description: "Mostra posizioni" },
    ],
  },
  {
    category: "Grafico",
    shortcuts: [
      { key: "+", description: "Zoom in" },
      { key: "-", description: "Zoom out" },
      { key: "←/→", description: "Sposta il grafico" },
      { key: "I", description: "Aggiungi indicatore" },
      { key: "D", description: "Aggiungi strumento di disegno" },
      { key: "1-9", description: "Cambia timeframe" },
    ],
  },
  {
    category: "Generale",
    shortcuts: [
      { key: "F1", description: "Mostra guida scorciatoie" },
      { key: "Alt + T", description: "Cambia tema chiaro/scuro" },
      { key: "Ctrl/Cmd + F", description: "Cerca" },
      { key: "Ctrl/Cmd + ,", description: "Impostazioni" },
      { key: "Ctrl/Cmd + H", description: "Nascondi/mostra pannello laterale" },
    ],
  },
]

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  // Gestione scorciatoia F1 per aprire la guida
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(true)} title="Scorciatoie da tastiera (F1)">
        <Keyboard className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Scorciatoie da tastiera</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {DEFAULT_SHORTCUTS.map((category, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-medium text-lg border-b pb-1">{category.category}</h3>
                <div className="space-y-2">
                  {category.shortcuts.map((shortcut, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-muted-foreground">{shortcut.description}</span>
                      <kbd className="px-2 py-0.5 bg-muted rounded border ml-2">{shortcut.key}</kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted p-3 rounded-md mt-2">
            <p className="text-sm text-muted-foreground">
              Nota: Alcune scorciatoie potrebbero variare in base al contesto o alla configurazione del sistema. Premi{" "}
              <kbd className="px-1 py-0.5 bg-background rounded border">F1</kbd> in qualsiasi momento per visualizzare
              questa guida.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
