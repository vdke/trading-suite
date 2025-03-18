"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle } from "lucide-react"

const riskData = {
  dailyDrawdown: {
    current: 1.2,
    limit: 3,
  },
  weeklyDrawdown: {
    current: 2.8,
    limit: 5,
  },
  leverage: {
    current: 3.5,
    limit: 10,
  },
  marginUsed: {
    current: 35,
    limit: 80,
  },
  alerts: ["Volatilità elevata su EUR/USD", "Notizie macroeconomiche alle 14:30"],
}

export default function RiskManagement() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Gestione Rischio</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Drawdown Giornaliero</span>
              <span className="font-medium">
                {riskData.dailyDrawdown.current}% / {riskData.dailyDrawdown.limit}%
              </span>
            </div>
            <Progress value={(riskData.dailyDrawdown.current / riskData.dailyDrawdown.limit) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Drawdown Settimanale</span>
              <span className="font-medium">
                {riskData.weeklyDrawdown.current}% / {riskData.weeklyDrawdown.limit}%
              </span>
            </div>
            <Progress value={(riskData.weeklyDrawdown.current / riskData.weeklyDrawdown.limit) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Leva Finanziaria</span>
              <span className="font-medium">
                {riskData.leverage.current}x / {riskData.leverage.limit}x
              </span>
            </div>
            <Progress value={(riskData.leverage.current / riskData.leverage.limit) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Margine Utilizzato</span>
              <span className="font-medium">
                {riskData.marginUsed.current}% / {riskData.marginUsed.limit}%
              </span>
            </div>
            <Progress value={(riskData.marginUsed.current / riskData.marginUsed.limit) * 100} className="h-2" />
          </div>

          <div className="border rounded-md p-2 mt-2">
            <div className="flex items-center space-x-2 text-amber-500 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium text-sm">Avvisi</span>
            </div>
            <ul className="text-xs space-y-1">
              {riskData.alerts.map((alert, index) => (
                <li key={index} className="text-muted-foreground">
                  • {alert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
