"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { NetworkNode } from "@/app/api/nodes/route"

interface EnergyEfficiencyChartProps {
  nodes: NetworkNode[]
}

export function EnergyEfficiencyChart({ nodes }: EnergyEfficiencyChartProps) {
  // Calculate efficiency (traffic per watt)
  const chartData = nodes
    .map((node) => ({
      name: node.node_id.replace("NODE-", "N"),
      efficiency: node.energy_w > 0 ? Math.round((node.traffic_mbps / node.energy_w) * 100) / 100 : 0,
      energy: node.energy_w,
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 8)

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-foreground mb-4">Energy Efficiency (Mbps/W)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} width={45} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
          <Bar dataKey="efficiency" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} name="Efficiency" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
