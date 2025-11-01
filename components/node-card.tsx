"use client"

import type { NetworkNode } from "@/app/api/nodes/route"

interface NodeCardProps {
  node: NetworkNode
  index: number
}

export function NodeCard({ node, index }: NodeCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
      case "throttled":
        return "bg-amber-500/20 border-amber-500/40 text-amber-300"
      case "sleeping":
        return "bg-slate-500/20 border-slate-500/40 text-slate-300"
      default:
        return "bg-gray-500/20 border-gray-500/40 text-gray-300"
    }
  }

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "active":
        return "🟢"
      case "throttled":
        return "🟠"
      case "sleeping":
        return "🔴"
      default:
        return "⚪"
    }
  }

  const statusColorClass = getStatusColor(node.status)
  const lastUpdateTime = new Date(node.last_update)
  const timeDiff = Math.floor((Date.now() - lastUpdateTime.getTime()) / 1000)
  const timeAgoStr = timeDiff < 60 ? `${timeDiff}s ago` : `${Math.floor(timeDiff / 60)}m ago`

  return (
    <div className="animate-slide-in-up" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="group relative h-full rounded-lg border border-border bg-card p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{node.node_id}</h3>
              <p className="text-xs text-muted-foreground mt-1">{timeAgoStr}</p>
            </div>
            <span className="text-2xl animate-pulse-glow">{getStatusEmoji(node.status)}</span>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 border ${statusColorClass}`}>
            <span className="h-2 w-2 rounded-full bg-current" />
            <span className="text-xs font-medium capitalize">{node.status}</span>
          </div>

          {/* Metrics */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-muted-foreground">Traffic</label>
                <span className="text-sm font-semibold text-foreground">{node.traffic_mbps} Mbps</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((node.traffic_mbps / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-muted-foreground">Energy</label>
                <span className="text-sm font-semibold text-foreground">{node.energy_w}W</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((node.energy_w / 300) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
