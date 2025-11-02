// components/traffic-over-time-chart.tsx
"use client"

import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import type { NetworkNode } from "@/app/api/nodes/route"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  nodes: NetworkNode[]
}

export const TrafficOverTimeChart = ({ nodes }: Props) => {
  // Simulate last 5 data points for each node
  const labels = ["-25s", "-20s", "-15s", "-10s", "-5s", "Now"]
  const datasets = nodes.map((node) => ({
    label: node.node_id,
    data: labels.map(() => Math.floor(node.traffic_mbps * (0.8 + Math.random() * 0.4))), // simulate small fluctuations
    fill: false,
    borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    tension: 0.3,
  }))

  const data = { labels, datasets }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Traffic Over Time (Mbps)",
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return <Line data={data} options={options} />
}
