"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { NetworkNode } from "@/app/api/nodes/route"

interface EnergyTrafficChartProps {
  nodes: NetworkNode[]
}

export function EnergyTrafficChart({ nodes }: EnergyTrafficChartProps) {
  const chartData = nodes
    .sort((a, b) => a.node_id.localeCompare(b.node_id))
    .map((node) => ({
      name: node.node_id.replace("NODE-", "N"),
      energy: node.energy_w,
      traffic: node.traffic_mbps,
    }))

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-foreground mb-4">Energy vs Traffic Analysis</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} iconType="line" />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
            activeDot={{ r: 5 }}
            name="Energy (W)"
          />
          <Line
            type="monotone"
            dataKey="traffic"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-2))", r: 3 }}
            activeDot={{ r: 5 }}
            name="Traffic (Mbps)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
