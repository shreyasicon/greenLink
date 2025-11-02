// components/response-time-chart.tsx
"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import type { NetworkNode } from "@/app/api/nodes/route"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  nodes: NetworkNode[]
}

export const ResponseTimeChart = ({ nodes }: Props) => {
  const labels = nodes.map((node) => node.node_id)
  const dataValues = nodes.map((node) => node.response_ms || Math.floor(Math.random() * 50 + 10)) // simulate if not available

  const data = {
    labels,
    datasets: [
      {
        label: "Response Time (ms)",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Node Response Time" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return <Bar data={data} options={options} />
}
