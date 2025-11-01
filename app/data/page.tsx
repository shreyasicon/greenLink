"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import type { DataLog } from "@/app/api/data-logs/route"

export default function DataExplorerPage() {
  const [logs, setLogs] = useState<DataLog[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "sleeping">("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/data-logs")
      const data = await response.json()
      setLogs(data.logs)
    } catch (error) {
      console.error("Failed to fetch logs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true
    if (filter === "active") return log.action === "activate" || log.action === "monitor"
    if (filter === "sleeping") return log.action === "sleep"
    return true
  })

  const totalEnergySaved = logs.reduce((sum, log) => sum + log.energy_saved, 0)

  const getActionBadge = (action: string) => {
    const styles = {
      throttle: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      sleep: "bg-slate-500/20 text-slate-300 border-slate-500/40",
      activate: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      monitor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    }
    return styles[action as keyof typeof styles] || styles.monitor
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-float">📊</div>
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.div
          initial={{ opacity: 0, rotateX: 20 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
          style={{ perspective: "1000px" }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
            Data Explorer
          </h1>
          <p className="text-muted-foreground">Browse DynamoDB entries and recent optimization actions</p>
        </motion.div>

        {/* Summary Stats with 3D cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Entries", value: logs.length, icon: "📊" },
            { label: "Total Energy Saved", value: `${totalEnergySaved}W`, icon: "⚡" },
            { label: "Recent Actions", value: filteredLogs.length, icon: "🔄" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-6 hover:scale-105 transition-all duration-300"
            >
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 -z-10"
                style={{ transform: "translateZ(-20px)" }}
              />
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            All Nodes
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            Active Nodes
          </button>
          <button
            onClick={() => setFilter("sleeping")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "sleeping"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            Sleeping Nodes
          </button>
        </div>

        {/* Data Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Node ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Traffic
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Energy
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Energy Saved
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLogs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{log.node_id}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{log.traffic_mbps} Mbps</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{log.energy_w}W</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getActionBadge(
                          log.action,
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-accent">
                      {log.energy_saved > 0 ? `${log.energy_saved}W` : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Actions Log */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Actions Log</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredLogs.slice(0, 10).map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {log.action === "sleep" ? "🔴" : log.action === "throttle" ? "🟠" : "🟢"}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {log.node_id} - {log.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                {log.energy_saved > 0 && (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-accent">{log.energy_saved}W saved</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  )
}
