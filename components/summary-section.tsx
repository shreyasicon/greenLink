"use client"

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

export function SummarySection({
  totalEnergy,
  energySaved,
  aiAction,
  lastOptimization,
  activeNodes,
  throttledNodes,
  sleepingNodes,
  totalTraffic,
}: SummarySectionProps) {
  const lastOptTime = new Date(lastOptimization)
  const timeDiff = Math.floor((Date.now() - lastOptTime.getTime()) / 1000)
  const timeAgoStr = timeDiff < 60 ? `${timeDiff}s` : `${Math.floor(timeDiff / 60)}m`

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors">
          <p className="text-xs font-medium text-muted-foreground mb-1">Total Energy Used</p>
          <p className="text-2xl font-bold text-foreground">{totalEnergy}W</p>
          <p className="text-xs text-muted-foreground mt-2">Current consumption</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 hover:border-accent/50 transition-colors">
          <p className="text-xs font-medium text-muted-foreground mb-1">Energy Saved</p>
          <p className="text-2xl font-bold text-accent">{energySaved}W</p>
          <p className="text-xs text-muted-foreground mt-2">Via AI optimization</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors">
          <p className="text-xs font-medium text-muted-foreground mb-1">Network Traffic</p>
          <p className="text-2xl font-bold text-foreground">{totalTraffic.toFixed(0)} Mbps</p>
          <p className="text-xs text-muted-foreground mt-2">Total throughput</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 hover:border-secondary/50 transition-colors">
          <p className="text-xs font-medium text-muted-foreground mb-1">Active Nodes</p>
          <div className="flex gap-2 mt-2">
            <span className="text-lg">🟢 {activeNodes}</span>
            <span className="text-lg">🟠 {throttledNodes}</span>
            <span className="text-lg">🔴 {sleepingNodes}</span>
          </div>
        </div>
      </div>

      {/* AI Action Explanation */}
      <div className="rounded-lg border border-border/50 bg-gradient-to-br from-primary/10 to-accent/5 p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🤖</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Last AI Action</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{aiAction}</p>
            <p className="text-xs text-muted-foreground mt-3">Optimized {timeAgoStr} ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
