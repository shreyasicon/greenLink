import React from "react"

interface SummarySectionProps {
  totalEnergy: number
  energySaved: number
  aiAction: string
  lastOptimization: string
  activeNodes: number
  throttledNodes: number
  sleepingNodes: number
  totalTraffic: number
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  totalEnergy,
  energySaved,
  aiAction,
  lastOptimization,
  activeNodes,
  throttledNodes,
  sleepingNodes,
  totalTraffic
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4 border rounded-lg bg-card text-center">
        <p className="text-sm text-muted-foreground">Total Traffic</p>
        <p className="text-xl font-bold">{totalTraffic} Mbps</p>
      </div>
      <div className="p-4 border rounded-lg bg-card text-center">
        <p className="text-sm text-muted-foreground">Total Energy</p>
        <p className="text-xl font-bold">{totalEnergy} W</p>
      </div>
      <div className="p-4 border rounded-lg bg-card text-center">
        <p className="text-sm text-muted-foreground">Energy Saved</p>
        <p className="text-xl font-bold">{energySaved} W</p>
      </div>
      <div className="p-4 border rounded-lg bg-card text-center">
        <p className="text-sm text-muted-foreground">Last AI Action</p>
        <p className="text-xl font-bold">{aiAction}</p>
        <p className="text-xs text-muted-foreground">{lastOptimization}</p>
      </div>
    </div>
  )
}
