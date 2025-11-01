"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface StatusDistributionChartProps {
  activeNodes: number
  throttledNodes: number
  sleepingNodes: number
}

export function StatusDistributionChart({ activeNodes, throttledNodes, sleepingNodes }: StatusDistributionChartProps) {
  const data = [
    { name: "Active", value: activeNodes, color: "hsl(142, 76%, 36%)" },
    { name: "Throttled", value: throttledNodes, color: "hsl(38, 92%, 50%)" },
    { name: "Sleeping", value: sleepingNodes, color: "hsl(var(--muted))" },
  ]

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-foreground mb-4">Node Status Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
