"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface AgentAction {
  action_id: string
  timestamp: string
  agent: string
  action_type: string
  target_nodes: string[]
  reason: string
  energy_saved_w: number
  success: boolean
}

export function AgentExplanationCard() {
  const [actions, setActions] = useState<AgentAction[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch("/data/actions.json")
      .then((res) => res.json())
      .then((data) => setActions(data))
      .catch((err) => console.error("Failed to load actions:", err))
  }, [])

  useEffect(() => {
    if (actions.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % actions.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [actions.length])

  if (actions.length === 0) return null

  const currentAction = actions[currentIndex]
  const timeAgo = new Date(currentAction.timestamp).toLocaleTimeString()

  const actionTypeColors: Record<string, string> = {
    throttle: "text-orange-400",
    sleep: "text-red-400",
    redistribute: "text-blue-400",
    alert: "text-yellow-400",
    activate: "text-green-400",
  }

  const actionTypeIcons: Record<string, string> = {
    throttle: "🟠",
    sleep: "🔴",
    redistribute: "🔄",
    alert: "⚠️",
    activate: "🟢",
  }

  return (
    <motion.div
      key={currentAction.action_id}
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-6 shadow-lg"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* 3D depth layer */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 -z-10"
        style={{ transform: "translateZ(-15px)" }}
      />

      <div className="flex items-start gap-4">
        <motion.div
          className="text-4xl"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {actionTypeIcons[currentAction.action_type] || "🤖"}
        </motion.div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-foreground">Agent Decision Explanation</h3>
            <span className="text-xs text-muted-foreground font-mono">{timeAgo}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary">{currentAction.agent}</span>
            <span className="text-xs text-muted-foreground">→</span>
            <span className={`text-sm font-medium ${actionTypeColors[currentAction.action_type]}`}>
              {currentAction.action_type.toUpperCase()}
            </span>
          </div>

          <p className="text-sm text-foreground/90 leading-relaxed">{currentAction.reason}</p>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Target Nodes:</span>
              <div className="flex gap-1">
                {currentAction.target_nodes.map((node) => (
                  <span key={node} className="text-xs font-mono bg-primary/20 px-2 py-1 rounded">
                    {node}
                  </span>
                ))}
              </div>
            </div>

            {currentAction.energy_saved_w > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Energy Saved:</span>
                <span className="text-sm font-bold text-accent">{currentAction.energy_saved_w}W</span>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div className="flex gap-1 pt-2">
            {actions.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
