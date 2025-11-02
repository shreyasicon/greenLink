// components/energy-traffic-chart.tsx
"use client"

import { Bar } from "react-chartjs-2"
import { NetworkNode } from "@/app/api/nodes/route"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  nodes: NetworkNode[]
}

export const EnergyTrafficChart = ({ nodes }: Props) => {
  const labels = nodes.map((node) => node.node_id)
  const trafficData = nodes.map((node) => node.traffic_mbps)
  const energyData = nodes.map((node) => node.energy_w)

  const data = {
    labels,
    datasets: [
      {
        label: "Traffic (Mbps)",
        data: trafficData,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Energy (W)",
        data: energyData,
        backgroundColor: "rgba(255, 206, 86, 0.7)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Node Traffic vs Energy",
      },
    },
  }

  return <Bar data={data} options={options} />
}
