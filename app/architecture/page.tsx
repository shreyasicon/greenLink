"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ArchitectureBlock {
  id: string
  title: string
  description: string
  icon: string
  position: { row: number; col: number }
}

const architectureBlocks: ArchitectureBlock[] = [
  {
    id: "edge",
    title: "Edge Nodes",
    description: "6G network nodes collecting real-time traffic and energy metrics from the telecom infrastructure.",
    icon: "📡",
    position: { row: 0, col: 0 },
  },
  {
    id: "gateway",
    title: "API Gateway",
    description: "AWS API Gateway receives metrics from edge nodes and routes requests to backend services.",
    icon: "🚪",
    position: { row: 0, col: 1 },
  },
  {
    id: "lambda-ingest",
    title: "Ingest Lambda",
    description: "Processes incoming metrics, validates data, and stores in DynamoDB for analysis.",
    icon: "⚡",
    position: { row: 1, col: 0 },
  },
  {
    id: "dynamodb",
    title: "DynamoDB",
    description: "NoSQL database storing node metrics, historical data, and optimization decisions.",
    icon: "💾",
    position: { row: 1, col: 1 },
  },
  {
    id: "bedrock",
    title: "Bedrock Agent",
    description: "AI agent powered by AWS Bedrock analyzes patterns and makes intelligent optimization decisions.",
    icon: "🧠",
    position: { row: 1, col: 2 },
  },
  {
    id: "lambda-action",
    title: "Action Lambda",
    description: "Executes AI decisions by sending throttle/sleep commands back to edge nodes.",
    icon: "⚙️",
    position: { row: 2, col: 1 },
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Real-time visualization of network status, energy savings, and AI optimization actions.",
    icon: "📊",
    position: { row: 2, col: 2 },
  },
]

const connections = [
  { from: "edge", to: "gateway" },
  { from: "gateway", to: "lambda-ingest" },
  { from: "lambda-ingest", to: "dynamodb" },
  { from: "dynamodb", to: "bedrock" },
  { from: "bedrock", to: "lambda-action" },
  { from: "lambda-action", to: "dashboard" },
  { from: "lambda-action", to: "edge" },
]

export default function ArchitecturePage() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)

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
            System Architecture
          </h1>
          <p className="text-muted-foreground">AWS-based agentic network optimizer data flow</p>
        </motion.div>

        <div className="relative mb-16" style={{ perspective: "2000px" }}>
          {/* Flow Container with Grid Layout */}
          <div className="relative grid grid-cols-3 gap-8 min-h-[600px]">
            {architectureBlocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                onHoverStart={() => setHoveredBlock(block.id)}
                onHoverEnd={() => setHoveredBlock(null)}
                onClick={() => setSelectedBlock(block.id)}
                style={{
                  gridColumn: block.position.col + 1,
                  gridRow: block.position.row + 1,
                  transformStyle: "preserve-3d",
                }}
                className={`relative rounded-xl border bg-gradient-to-br from-card to-card/50 p-6 cursor-pointer transition-all duration-500 ${
                  selectedBlock === block.id || hoveredBlock === block.id
                    ? "border-primary shadow-2xl shadow-primary/30 scale-110 z-10"
                    : "border-border hover:border-primary/50 hover:shadow-lg"
                }`}
              >
                {/* 3D depth effect */}
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 -z-10"
                  style={{ transform: "translateZ(-20px)" }}
                />

                {/* Icon with 3D float */}
                <motion.div
                  className="text-5xl mb-4"
                  animate={hoveredBlock === block.id ? { y: [-5, 5, -5], rotateZ: [-5, 5, -5] } : { y: 0, rotateZ: 0 }}
                  transition={{ duration: 2, repeat: hoveredBlock === block.id ? Number.POSITIVE_INFINITY : 0 }}
                >
                  {block.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2">{block.title}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{block.description}</p>

                {/* Pulse indicator */}
                {(selectedBlock === block.id || hoveredBlock === block.id) && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>
            ))}

            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrowhead-3d" markerWidth="12" markerHeight="12" refX="11" refY="3" orient="auto">
                  <polygon points="0 0, 12 3, 0 6" fill="oklch(0.6 0.18 142.5)" opacity="0.8" />
                </marker>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {connections.map((conn, idx) => (
                <motion.g key={`${conn.from}-${conn.to}`}>
                  <motion.path
                    d={`M ${150 + architectureBlocks.find((b) => b.id === conn.from)!.position.col * 300} ${
                      100 + architectureBlocks.find((b) => b.id === conn.from)!.position.row * 200
                    } L ${150 + architectureBlocks.find((b) => b.id === conn.to)!.position.col * 300} ${
                      100 + architectureBlocks.find((b) => b.id === conn.to)!.position.row * 200
                    }`}
                    stroke="oklch(0.6 0.18 142.5)"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#arrowhead-3d)"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: idx * 0.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  />
                  {/* Animated particle */}
                  <motion.circle
                    r="4"
                    fill="oklch(0.75 0.2 85)"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{
                      offsetDistance: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ duration: 2, delay: idx * 0.3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                    style={{
                      offsetPath: `path('M ${150 + architectureBlocks.find((b) => b.id === conn.from)!.position.col * 300} ${
                        100 + architectureBlocks.find((b) => b.id === conn.from)!.position.row * 200
                      } L ${150 + architectureBlocks.find((b) => b.id === conn.to)!.position.col * 300} ${
                        100 + architectureBlocks.find((b) => b.id === conn.to)!.position.row * 200
                      }')`,
                    }}
                  />
                </motion.g>
              ))}
            </svg>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-border bg-card/50 p-4">
            <h4 className="font-semibold text-foreground mb-2">Real-time Processing</h4>
            <p className="text-sm text-muted-foreground">Metrics processed in milliseconds with Lambda functions</p>
          </div>
          <div className="rounded-lg border border-border bg-card/50 p-4">
            <h4 className="font-semibold text-foreground mb-2">AI-Powered Decisions</h4>
            <p className="text-sm text-muted-foreground">Bedrock agents analyze patterns and optimize energy usage</p>
          </div>
          <div className="rounded-lg border border-border bg-card/50 p-4">
            <h4 className="font-semibold text-foreground mb-2">Scalable Infrastructure</h4>
            <p className="text-sm text-muted-foreground">Serverless architecture scales automatically with demand</p>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
