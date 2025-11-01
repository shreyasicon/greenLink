import { NextResponse } from "next/server"

export interface NetworkNode {
  node_id: string
  traffic_mbps: number
  energy_w: number
  status: "active" | "throttled" | "sleeping"
  last_update: string
}

// Mock data - can be connected to DynamoDB later
function generateMockNodes(): NetworkNode[] {
  const nodes: NetworkNode[] = []
  const statuses: Array<"active" | "throttled" | "sleeping"> = ["active", "throttled", "sleeping"]

  for (let i = 1; i <= 12; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    let traffic_mbps = 0
    let energy_w = 0

    switch (status) {
      case "active":
        traffic_mbps = Math.random() * 800 + 200 // 200-1000 Mbps
        energy_w = Math.random() * 150 + 100 // 100-250W
        break
      case "throttled":
        traffic_mbps = Math.random() * 200 + 50 // 50-250 Mbps
        energy_w = Math.random() * 80 + 40 // 40-120W
        break
      case "sleeping":
        traffic_mbps = Math.random() * 20 // 0-20 Mbps
        energy_w = Math.random() * 20 + 5 // 5-25W
        break
    }

    nodes.push({
      node_id: `NODE-${String(i).padStart(3, "0")}`,
      traffic_mbps: Math.round(traffic_mbps * 10) / 10,
      energy_w: Math.round(energy_w * 10) / 10,
      status,
      last_update: new Date(Date.now() - Math.random() * 60000).toISOString(),
    })
  }

  return nodes
}

export async function GET() {
  try {
    const nodes = generateMockNodes()

    // Calculate summary metrics
    const totalEnergy = nodes.reduce((sum, node) => sum + node.energy_w, 0)
    const totalTraffic = nodes.reduce((sum, node) => sum + node.traffic_mbps, 0)
    const activeCount = nodes.filter((n) => n.status === "active").length
    const throttledCount = nodes.filter((n) => n.status === "throttled").length

    // Simulate energy savings from AI optimization
    const baselineEnergy = totalEnergy * 1.35
    const energySaved = Math.round((baselineEnergy - totalEnergy) * 10) / 10

    return NextResponse.json(
      {
        nodes,
        summary: {
          total_energy_w: Math.round(totalEnergy * 10) / 10,
          total_traffic_mbps: Math.round(totalTraffic * 10) / 10,
          active_nodes: activeCount,
          throttled_nodes: throttledCount,
          sleeping_nodes: nodes.filter((n) => n.status === "sleeping").length,
          energy_saved_w: energySaved,
          last_optimization: new Date(Date.now() - Math.random() * 300000).toISOString(),
          ai_action:
            activeCount > 8
              ? "Automated load balancing: Redistributed traffic from NODE-001, NODE-005 to NODE-009, NODE-012. Expected energy savings: 23W"
              : "System optimized. All nodes operating within efficiency targets.",
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching nodes:", error)
    return NextResponse.json({ error: "Failed to fetch node data" }, { status: 500 })
  }
}
