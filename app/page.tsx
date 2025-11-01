"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { NodeCard } from "@/components/node-card"
import { SummarySection } from "@/components/summary-section"
import { EnergyTrafficChart } from "@/components/energy-traffic-chart"
import { StatusDistributionChart } from "@/components/status-distribution-chart"
import { TrafficOverTimeChart } from "@/components/traffic-over-time-chart"
import { EnergyEfficiencyChart } from "@/components/energy-efficiency-chart"
import { NodePerformanceChart } from "@/components/node-performance-chart"
import { ResponseTimeChart } from "@/components/response-time-chart"
import type { NetworkNode } from "@/app/api/nodes/route"

interface ApiResponse {
  nodes: NetworkNode[]
  summary: {
    total_energy_w: number
    total_traffic_mbps: number
    active_nodes: number
    throttled_nodes: number
    sleeping_nodes: number
    energy_saved_w: number
    last_optimization: string
    ai_action: string
  }
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const fetchData = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/nodes")
      const json = await response.json()
      setData(json)
      setLastRefresh(new Date())
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Auto-refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-float">🌱</div>
          <p className="text-muted-foreground">Initializing GreenLink Agent...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
        style={{ perspective: "1000px" }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
          Network Performance Dashboard
        </h1>
        <p className="text-muted-foreground">Real-time monitoring and AI-powered optimization</p>
      </motion.div>

      {/* Refresh Button */}
      <div className="flex justify-end items-center gap-3">
        {lastRefresh && (
          <div className="text-right text-xs text-muted-foreground">
            <p>Last updated</p>
            <p className="font-mono">{lastRefresh.toLocaleTimeString()}</p>
          </div>
        )}
        <button
          onClick={fetchData}
          disabled={isRefreshing}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span className={isRefreshing ? "animate-spin" : ""}>↻</span>
          {isRefreshing ? "Refreshing..." : "Refresh Simulation"}
        </button>
      </div>

      {/* Summary Section */}
      {data && (
        <SummarySection
          totalEnergy={data.summary.total_energy_w}
          energySaved={data.summary.energy_saved_w}
          aiAction={data.summary.ai_action}
          lastOptimization={data.summary.last_optimization}
          activeNodes={data.summary.active_nodes}
          throttledNodes={data.summary.throttled_nodes}
          sleepingNodes={data.summary.sleeping_nodes}
          totalTraffic={data.summary.total_traffic_mbps}
        />
      )}

      {/* Updated Charts Section */}
      {data && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Analytics Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EnergyTrafficChart nodes={data.nodes} />
            <StatusDistributionChart
              activeNodes={data.summary.active_nodes}
              throttledNodes={data.summary.throttled_nodes}
              sleepingNodes={data.summary.sleeping_nodes}
            />
            <TrafficOverTimeChart nodes={data.nodes} />
            <EnergyEfficiencyChart nodes={data.nodes} />
            <NodePerformanceChart nodes={data.nodes} />
            <ResponseTimeChart nodes={data.nodes} />
          </div>
        </div>
      )}

      {/* Nodes Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Network Nodes</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {data?.nodes.map((node, index) => (
            <NodeCard key={node.node_id} node={node} index={index} />
          ))}
        </motion.div>
      </div>
    </main>
  )
}
