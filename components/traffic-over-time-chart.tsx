"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { NetworkNode } from "@/app/api/nodes/route"

interface TrafficOverTimeChartProps {
  nodes: NetworkNode[]
}

export function TrafficOverTimeChart({ nodes }: TrafficOverTimeChartProps) {
  // Generate time-series data based on nodes
  const chartData = nodes.slice(0, 8).map((node, index) => ({
    time: `${index * 3}m`,
    traffic: node.traffic_mbps,
  }))

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-foreground mb-4">Traffic Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} width={45} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="traffic"
            stroke="hsl(var(--chart-2))"
            fillOpacity={1}
            fill="url(#colorTraffic)"
            name="Traffic (Mbps)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
