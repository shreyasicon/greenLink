// components/status-distribution-chart.tsx
"use client"

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, Title)

interface Props {
  activeNodes: number
  throttledNodes: number
  sleepingNodes: number
}

export const StatusDistributionChart = ({ activeNodes, throttledNodes, sleepingNodes }: Props) => {
  const data = {
    labels: ["Active", "Throttled", "Sleeping"],
    datasets: [
      {
        label: "Node Status",
        data: [activeNodes, throttledNodes, sleepingNodes],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)", // Active
          "rgba(255, 159, 64, 0.7)", // Throttled
          "rgba(201, 203, 207, 0.7)", // Sleeping
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Node Status Distribution",
      },
    },
  }

  return <Pie data={data} options={options} />
}
