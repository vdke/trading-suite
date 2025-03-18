import type { Metadata } from "next"
import dynamic from "next/dynamic"
import DashboardLayout from "@/components/dashboard-layout"

// Utilizziamo dynamic import con SSR disabilitato per i componenti interattivi
const DashboardManager = dynamic(() => import("@/components/dashboard-manager"), { ssr: false })
const TradingView = dynamic(() => import("@/components/trading-view"), { ssr: false })
const StrategyPanel = dynamic(() => import("@/components/strategy-panel"), { ssr: false })
const MarketOverview = dynamic(() => import("@/components/market-overview"), { ssr: false })
const PortfolioSummary = dynamic(() => import("@/components/portfolio-summary"), { ssr: false })
const RiskManagement = dynamic(() => import("@/components/risk-management"), { ssr: false })
const NewsAnalysis = dynamic(() => import("@/components/news-analysis"), { ssr: false })

export const metadata: Metadata = {
  title: "TradingSuite AI - Dashboard",
  description: "Piattaforma avanzata per il trading di Futures, Indici e Forex",
}

export default function DashboardPage() {
  // Definiamo tutti i widget disponibili
  const widgetComponents = {
    "trading-view": <TradingView />,
    "strategy-panel": <StrategyPanel />,
    "market-overview": <MarketOverview />,
    "portfolio-summary": <PortfolioSummary />,
    "risk-management": <RiskManagement />,
    "news-analysis": <NewsAnalysis />,
  }

  return (
    <DashboardLayout>
      <DashboardManager widgetComponents={widgetComponents} />
    </DashboardLayout>
  )
}
