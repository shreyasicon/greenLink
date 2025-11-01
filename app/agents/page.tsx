"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface Agent {
  id: string
  name: string
  icon: string
  function: string
  status: "Running" | "Idle"
  input: string
  output: string
  color: string
}

interface Message {
  id: string
  from: string
  to: string
  content: string
  timestamp: number
}

const agents: Agent[] = [
  {
    id: "ingest",
    name: "Ingest Agent",
    icon: "📥",
    function: "Collects and validates real-time metrics from edge nodes",
    status: "Running",
    input: '{"node_id": "NODE-001", "traffic_mbps": 450, "energy_w": 180}',
    output: '{"status": "validated", "stored": true, "timestamp": "2025-01-11T10:30:00Z"}',
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "decision",
    name: "Decision Agent",
    icon: "🧠",
    function: "Analyzes patterns using Bedrock LLM and makes optimization decisions",
    status: "Running",
    input: '{"nodes": 12, "avg_traffic": 420, "total_energy": 2100}',
    output: '{"action": "throttle", "target_nodes": ["NODE-003", "NODE-007"], "reason": "Low traffic detected"}',
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "action",
    name: "Action Agent",
    icon: "⚡",
    function: "Executes optimization commands (throttle/sleep) on target nodes",
    status: "Running",
    input: '{"command": "throttle", "nodes": ["NODE-003"], "level": 0.7}',
    output: '{"executed": true, "energy_saved": 45, "nodes_affected": 1}',
    color: "from-emerald-500/20 to-green-500/20",
  },
]

const messageTemplates = [
  { from: "ingest", to: "decision", content: "New metrics: NODE-005 traffic spike detected" },
  { from: "decision", to: "action", content: "Optimize NODE-005: reduce power by 30%" },
  { from: "action", to: "ingest", content: "Executed: NODE-005 throttled, 42W saved" },
  { from: "ingest", to: "decision", content: "Alert: NODE-012 entering low-traffic period" },
  { from: "decision", to: "action", content: "Command: Put NODE-012 to sleep mode" },
  { from: "action", to: "decision", content: "Confirmed: NODE-012 sleeping, 85W saved" },
]

export default function AgentsPage() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const template = messageTemplates[messageIndex % messageTemplates.length]
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        from: template.from,
        to: template.to,
        content: template.content,
        timestamp: Date.now(),
      }
      setMessages((prev) => [newMessage, ...prev].slice(0, 8))
      setMessageIndex((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [messageIndex])

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
            Agent Intelligence
          </h1>
          <p className="text-muted-foreground">Three autonomous agents working together to optimize network energy</p>
        </motion.div>

        {/* Agent Cards with 3D effects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onHoverStart={() => setActiveAgent(agent.id)}
              onHoverEnd={() => setActiveAgent(null)}
              style={{ transformStyle: "preserve-3d" }}
              className={`relative rounded-xl border bg-gradient-to-br ${agent.color} border-border p-6 cursor-pointer transition-all duration-500 ${
                activeAgent === agent.id ? "scale-105 shadow-2xl shadow-primary/20" : ""
              }`}
            >
              {/* 3D depth layer */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 -z-10"
                style={{ transform: "translateZ(-30px)" }}
              />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{agent.icon}</div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    agent.status === "Running"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-slate-500/20 text-slate-300 border border-slate-500/40"
                  }`}
                >
                  {agent.status}
                </div>
              </div>

              {/* Name & Function */}
              <h3 className="text-xl font-bold text-foreground mb-2">{agent.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{agent.function}</p>

              {/* Input/Output */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                    Example Input
                  </label>
                  <div className="mt-1 rounded bg-black/30 p-3 font-mono text-xs text-foreground/80 overflow-x-auto">
                    {agent.input}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                    Example Output
                  </label>
                  <div className="mt-1 rounded bg-black/30 p-3 font-mono text-xs text-foreground/80 overflow-x-auto">
                    {agent.output}
                  </div>
                </div>
              </div>

              {/* Pulse indicator for running agents */}
              {agent.status === "Running" && (
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card/50 backdrop-blur p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Real-Time Agent Communication</h2>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => {
                const fromAgent = agents.find((a) => a.id === message.from)
                const toAgent = agents.find((a) => a.id === message.to)

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-card to-muted/30 border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{fromAgent?.icon}</span>
                      <span className="text-xl">→</span>
                      <span className="text-2xl">{toAgent?.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-primary">{fromAgent?.name}</span>
                        <span className="text-xs text-muted-foreground">to</span>
                        <span className="text-sm font-semibold text-accent">{toAgent?.name}</span>
                      </div>
                      <p className="text-sm text-foreground">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Agent Communication Flow Visualization */}
        <div className="rounded-xl border border-border bg-card/50 backdrop-blur p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Agent Communication Flow</h2>

          <div className="relative flex items-center justify-between">
            {/* Agent Icons */}
            {agents.map((agent, index) => (
              <div key={agent.id} className="flex flex-col items-center gap-2 z-10">
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${agent.color} border-2 flex items-center justify-center text-2xl ${
                    messageIndex === index ? "border-primary" : "border-border"
                  }`}
                  animate={
                    messageIndex === index
                      ? {
                          scale: [1, 1.1, 1],
                          borderColor: ["oklch(0.6 0.18 142.5)", "oklch(0.75 0.2 85)", "oklch(0.6 0.18 142.5)"],
                        }
                      : {}
                  }
                  transition={{ duration: 1 }}
                >
                  {agent.icon}
                </motion.div>
                <span className="text-xs font-medium text-muted-foreground">{agent.name}</span>
              </div>
            ))}

            {/* Animated Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: "32px" }}>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="oklch(0.6 0.18 142.5)" />
                </marker>
              </defs>

              {/* Arrow 1: Ingest to Decision */}
              <motion.line
                x1="20%"
                y1="0"
                x2="48%"
                y2="0"
                stroke="oklch(0.6 0.18 142.5)"
                strokeWidth="2"
                markerEnd="url(#arrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: messageIndex >= 0 ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              />

              {/* Arrow 2: Decision to Action */}
              <motion.line
                x1="52%"
                y1="0"
                x2="80%"
                y2="0"
                stroke="oklch(0.6 0.18 142.5)"
                strokeWidth="2"
                markerEnd="url(#arrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: messageIndex >= 1 ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              />
            </svg>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">Messages flow from Ingest → Decision → Action in real-time</p>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
