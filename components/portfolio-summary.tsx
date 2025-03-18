"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

const portfolioData = {
  balance: 25480.75,
  change: 1250.5,
  changePercent: 5.15,
  allocation: [
    { name: "Futures", value: 45, color: "#3b82f6" },
    { name: "Forex", value: 30, color: "#10b981" },
    { name: "Indici", value: 15, color: "#f59e0b" },
    { name: "Crypto", value: 10, color: "#8b5cf6" },
  ],
}

export default function PortfolioSummary() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-primary" />
          <CardTitle>Portfolio</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold">${portfolioData.balance.toLocaleString()}</div>
            <div
              className={cn("flex items-center text-sm", portfolioData.change > 0 ? "text-green-500" : "text-red-500")}
            >
              {portfolioData.change > 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              ${Math.abs(portfolioData.change).toLocaleString()} ({portfolioData.changePercent}%)
            </div>
          </div>

          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={portfolioData.allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioData.allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Allocazione"]}
                  contentStyle={{
                    backgroundColor: "rgba(23, 23, 23, 0.8)",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                  }}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  formatter={(value) => <span style={{ fontSize: "12px" }}>{value}</span>}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="border rounded p-2">
              <div className="text-xs text-muted-foreground">Posizioni Aperte</div>
              <div className="text-lg font-semibold">8</div>
            </div>
            <div className="border rounded p-2">
              <div className="text-xs text-muted-foreground">P/L Giornaliero</div>
              <div className="text-lg font-semibold text-green-500">+$320.45</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
