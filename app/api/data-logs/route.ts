import { NextResponse } from "next/server"

export interface DataLog {
  id: string
  node_id: string
  traffic_mbps: number
  energy_w: number
  action: string
  energy_saved: number
  timestamp: string
}

export async function GET() {
  // Mock data logs from DynamoDB
  const logs: DataLog[] = Array.from({ length: 20 }, (_, i) => {
    const actions = ["throttle", "sleep", "activate", "monitor"]
    const action = actions[Math.floor(Math.random() * actions.length)]
    const nodeNum = String(i + 1).padStart(3, "0")

    return {
      id: `log-${Date.now()}-${i}`,
      node_id: `NODE-${nodeNum}`,
      traffic_mbps: Math.floor(Math.random() * 800) + 100,
      energy_w: Math.floor(Math.random() * 200) + 50,
      action,
      energy_saved:
        action === "sleep"
          ? Math.floor(Math.random() * 80) + 20
          : action === "throttle"
            ? Math.floor(Math.random() * 40) + 10
            : 0,
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return NextResponse.json({ logs })
}
