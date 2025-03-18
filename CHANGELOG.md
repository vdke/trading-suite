# Changelog TradingSuite AI

Questo file contiene un registro di tutte le modifiche apportate ai file del progetto, inclusi i parametri modificati e le motivazioni delle modifiche.

## [Versione 1.3.0] - 2025-03-09

### Aggiunto
- `components/dashboard-manager.tsx`
  - Implementato sistema di dashboard personalizzabile con drag-and-drop
  - Aggiunta funzionalità per salvare/caricare layout
  - Implementato supporto per aggiungere/rimuovere widget
  - Aggiunte scorciatoie da tastiera (Ctrl/Cmd+E, Ctrl/Cmd+S)
  - Aggiunta esportazione/importazione dei layout

- `components/keyboard-shortcuts.tsx`
  - Creato componente per visualizzare e gestire le scorciatoie da tastiera
  - Implementata guida completa delle scorciatoie disponibili
  - Aggiunta apertura della guida tramite tasto F1

### Modificato
- `app/page.tsx`
  - Sostituito layout statico con il nuovo DashboardManager
  - Aggiunti import dinamici per migliorare le prestazioni di caricamento
  - Configurati tutti i widget disponibili per il dashboard

- `components/dashboard-layout.tsx`
  - Aggiunte scorciatoie da tastiera nella sidebar
  - Integrato componente KeyboardShortcuts nella barra di navigazione
  - Migliorata reattività su dispositivi mobili

- `package.json`
  - Aggiunte dipendenze: react-grid-layout, react-resizable
  - Aggiunti tipi TypeScript per react-grid-layout

## [Versione 1.2.0] - 2025-03-09

### Aggiunto
- `utils/update-changelog.ts`
  - Creata classe ChangelogUpdater per gestire l'aggiornamento automatico del changelog
  - Implementate funzioni per rilevare file modificati tramite git
  - Aggiunta logica per incrementare automaticamente la versione
  - Implementata struttura per categorizzare le modifiche

- `scripts/update-changelog.ts`
  - Creato script interattivo da riga di comando
  - Implementata interfaccia per selezionare file modificati
  - Aggiunta possibilità di specificare manualmente la versione
  - Implementato sistema per raccogliere descrizioni e motivi delle modifiche

- `package.json`
  - Aggiunto script "update-changelog" per eseguire lo script di aggiornamento
  - Aggiunte dipendenze necessarie: ts-node

### Modificato
- `CHANGELOG.md`
  - Aggiornata struttura per supportare il nuovo sistema di aggiornamento automatico
  - Motivo: Miglioramento del processo di documentazione delle modifiche

## [Versione 1.1.0] - 2025-03-09

### Modificato
- `components/portfolio-summary.tsx`
  - Sostituito il componente Chart non supportato con implementazione Recharts
  - Aggiunte importazioni: `PieChart`, `Pie`, `Cell`, `ResponsiveContainer`, `Legend`, `Tooltip` da recharts
  - Implementato grafico a torta con anello interno (donut chart)
  - Aggiunti tooltip e legenda personalizzati
  - Motivo: Risoluzione errore "The "/components/ui/chart" module does not provide an export named "Chart"."

## [Versione 1.0.0] - 2025-03-09

### Creati
- `app/page.tsx`
  - Implementato layout principale del dashboard
  - Aggiunta griglia responsive per i componenti
  - Integrati tutti i componenti principali

- `components/dashboard-layout.tsx`
  - Creato layout principale con sidebar e header
  - Implementato toggle tema chiaro/scuro
  - Aggiunta navigazione responsive
  - Implementato menu utente e notifiche

- `components/trading-view.tsx`
  - Implementato grafico candlestick con canvas
  - Aggiunti controlli per simboli e timeframe
  - Implementata visualizzazione dati di mercato simulati
  - Aggiunti controlli per zoom, crosshair e indicatori

- `components/strategy-panel.tsx`
  - Creato pannello per gestione strategie
  - Implementate schede per strategie, backtest e automazione
  - Aggiunti controlli per parametri e condizioni
  - Implementato sistema di avvio/stop strategie

- `components/market-overview.tsx`
  - Creato pannello panoramica mercati
  - Implementata visualizzazione dati in tempo reale
  - Aggiunti indicatori di performance con variazioni percentuali

- `components/portfolio-summary.tsx`
  - Creato pannello riepilogo portfolio
  - Implementato grafico allocazione asset
  - Aggiunte metriche di performance

- `components/risk-management.tsx`
  - Creato pannello gestione rischio
  - Implementate barre di progresso per metriche di rischio
  - Aggiunto sistema di avvisi

- `components/news-analysis.tsx`
  - Creato pannello news e analisi
  - Implementate schede per news, calendario economico e sentiment
  - Aggiunti feed di notizie e eventi economici simulati

- `hooks/use-media-query.tsx`
  - Implementato hook per responsive design
  - Aggiunta funzionalità per rilevare dimensioni schermo

- `tailwind.config.js`
  - Configurato tema Tailwind
  - Aggiunti colori personalizzati
  - Configurate animazioni e responsive design
