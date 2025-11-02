import React from "react"
import type { NetworkNode } from "@/app/api/nodes/route"

interface NodeCardProps {
  node: NetworkNode
  index: number
}

export const NodeCard: React.FC<NodeCardProps> = ({ node, index }) => {
  const getStatusColor = (action: string) => {
    switch (action) {
      case "activate":
        return "bg-green-500"
      case "throttle":
        return "bg-orange-500"
      case "sleep":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{node.node_id}</h3>
        <span className={`w-3 h-3 rounded-full ${getStatusColor(node.action)}`}></span>
      </div>
      <p>Traffic: {node.traffic_mbps} Mbps</p>
      <p>Energy: {node.energy_w} W</p>
      {node.energy_saved_w !== undefined && <p>Saved: {node.energy_saved_w} W</p>}
      <p className="mt-2 font-mono text-sm text-muted-foreground">Last action: {node.action}</p>
    </div>
  )
}
