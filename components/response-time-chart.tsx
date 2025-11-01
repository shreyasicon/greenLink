"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { NetworkNode } from "@/app/api/nodes/route"

interface ResponseTimeChartProps {
  nodes: NetworkNode[]
}

export function ResponseTimeChart({ nodes }: ResponseTimeChartProps) {
  // Simulate response times based on node status and traffic
  const chartData = nodes.slice(0, 10).map((node) => {
    let baseLatency = 10
    if (node.status === "throttled") baseLatency = 25
    if (node.status === "sleeping") baseLatency = 50

    const latency = baseLatency + node.traffic_mbps / 100 + Math.random() * 5

    return {
      name: node.node_id.replace("NODE-", "N"),
      latency: Math.round(latency * 10) / 10,
    }
  })

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-foreground mb-4">Response Time (ms)</h3>
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
          />
          <Line
            type="monotone"
            dataKey="latency"
            stroke="hsl(var(--chart-5))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-5))", r: 3 }}
            activeDot={{ r: 5 }}
            name="Latency (ms)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
