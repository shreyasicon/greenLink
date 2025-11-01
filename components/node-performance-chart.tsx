"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"
import type { NetworkNode } from "@/app/api/nodes/route"

interface NodePerformanceChartProps {
  nodes: NetworkNode[]
}

export function NodePerformanceChart({ nodes }: NodePerformanceChartProps) {
  // Calculate average metrics by status
  const activeNodes = nodes.filter((n) => n.status === "active")
  const throttledNodes = nodes.filter((n) => n.status === "throttled")
  const sleepingNodes = nodes.filter((n) => n.status === "sleeping")

  const avgTraffic = (nodeList: NetworkNode[]) =>
    nodeList.length > 0 ? nodeList.reduce((sum, n) => sum + n.traffic_mbps, 0) / nodeList.length : 0

  const avgEnergy = (nodeList: NetworkNode[]) =>
    nodeList.length > 0 ? nodeList.reduce((sum, n) => sum + n.energy_w, 0) / nodeList.length : 0

  const chartData = [
    {
      metric: "Active Traffic",
      value: Math.round(avgTraffic(activeNodes)),
      fullMark: 1000,
    },
    {
      metric: "Active Energy",
      value: Math.round(avgEnergy(activeNodes)),
      fullMark: 250,
    },
    {
      metric: "Throttled Traffic",
      value: Math.round(avgTraffic(throttledNodes)),
      fullMark: 1000,
    },
    {
      metric: "Throttled Energy",
      value: Math.round(avgEnergy(throttledNodes)),
      fullMark: 250,
    },
    {
      metric: "Sleeping Traffic",
      value: Math.round(avgTraffic(sleepingNodes)),
      fullMark: 1000,
    },
  ]

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-foreground mb-4">Node Performance Radar</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={10} />
          <PolarRadiusAxis angle={90} domain={[0, "auto"]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="hsl(var(--chart-4))"
            fill="hsl(var(--chart-4))"
            fillOpacity={0.6}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
