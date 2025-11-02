// components/energy-efficiency-chart.tsx
"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import type { NetworkNode } from "@/app/api/nodes/route"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  nodes: NetworkNode[]
}

export const EnergyEfficiencyChart = ({ nodes }: Props) => {
  const labels = nodes.map((node) => node.node_id)
  const trafficData = nodes.map((node) => node.traffic_mbps)
  const energyData = nodes.map((node) => node.energy_w)

  const data = {
    labels,
    datasets: [
      {
        label: "Traffic (Mbps)",
        data: trafficData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Energy (W)",
        data: energyData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: {
        display: true,
        text: "Node Energy vs Traffic",
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return <Bar data={data} options={options} />
}
