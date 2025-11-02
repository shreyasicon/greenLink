// components/node-performance-chart.tsx
"use client"

import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import type { NetworkNode } from "@/app/api/nodes/route"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  nodes: NetworkNode[]
}

export const NodePerformanceChart = ({ nodes }: Props) => {
  const labels = nodes.map((node) => node.node_id)
  const activateData = nodes.map((node) => node.action === "activate" ? 1 : 0)
  const throttleData = nodes.map((node) => node.action === "throttle" ? 1 : 0)
  const sleepData = nodes.map((node) => node.action === "sleep" ? 1 : 0)

  const data = {
    labels,
    datasets: [
      {
        label: "Activate",
        data: activateData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
      {
        label: "Throttle",
        data: throttleData,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.3,
      },
      {
        label: "Sleep",
        data: sleepData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: true, text: "Node Actions Performance" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (value: number) => ["", "Yes"][value], // 0 -> "", 1 -> Yes
        },
      },
    },
  }

  return <Line data={data} options={options} />
}
