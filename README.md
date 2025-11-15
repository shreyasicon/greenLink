# 🌱 GreenLink Agent

**Energy-Aware Self-Healing Network Intelligence**

GreenLink Agent is an AI-powered telecom network optimization dashboard that visualizes real-time node performance and demonstrates agentic decision-making for energy efficiency in 6G networks.

---

## 🚀 Features

- **Real-time Network Monitoring**: Track traffic, energy consumption, and status of network nodes
- **AI-Powered Optimization**: Three intelligent agents (Energy Optimizer, Traffic Balancer, Sleep Scheduler) make autonomous decisions
- **Interactive Analytics**: 6 comprehensive charts showing energy vs traffic, status distribution, performance metrics, and more
- **Architecture Visualization**: Interactive AWS data flow diagram with animated connections
- **Agent Intelligence Dashboard**: Real-time agent communication and decision explanations
- **Data Explorer**: Filterable table view of DynamoDB entries and action logs
- **3D Visual Effects**: Modern UI with depth, perspective, and smooth animations

---

## 📋 Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 🛠️ Installation & Setup

### Option 1: Quick Start (Recommended)

\`\`\`bash
# Clone or download the project
git clone <your-repo-url>
cd greenlink-agent

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Using shadcn CLI

\`\`\`bash
npx shadcn@latest init
# Follow prompts to set up the project
\`\`\`

---

## 📁 Project Structure

\`\`\`
greenlink-agent/
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── architecture/         # Architecture flow page
│   ├── agents/              # Agent intelligence page
│   ├── data/                # Data explorer page
│   └── api/
│       ├── nodes/           # Mock API for node data
│       └── data-logs/       # Mock API for logs
├── components/
│   ├── navbar.tsx           # Navigation bar
│   ├── footer.tsx           # Footer with tagline
│   ├── node-card.tsx        # Individual node display
│   ├── agent-explanation-card.tsx  # AI decision explanations
│   └── [charts]/            # 6 analytics chart components
├── public/
│   └── data/
│       ├── nodes.json       # Static node data (8 nodes)
│       └── actions.json     # Static agent actions (5 actions)
└── README.md
\`\`\`

---

## 🎯 Key Pages

### 1. **Dashboard** (`/`)
- Network node grid with color-coded status (🟢 Active, 🟠 Throttled, 🔴 Sleeping)
- Summary metrics: Total Energy, Energy Saved, Traffic, Node Counts
- Agent Explanation Card showing real-time AI decisions
- 6 analytics charts in 2x3 grid layout

### 2. **Architecture** (`/architecture`)
- Interactive AWS component blocks
- Data flow: API Gateway → Ingest Lambda → DynamoDB → Decision Lambda → Actions Table
- Animated connection lines with flowing particles
- Click blocks to highlight, hover for animations

### 3. **Agent Intelligence** (`/agents`)
- Three agent cards: Energy Optimizer, Traffic Balancer, Sleep Scheduler
- Real-time message feed showing agent communication
- Example inputs/outputs for each agent

### 4. **Data Explorer** (`/data`)
- Filterable table of DynamoDB entries
- Recent actions log with timestamps
- Summary statistics

---

## 🔧 Configuration

### Mock Data

The app uses two static JSON files for demo purposes:

- **`public/data/nodes.json`**: 8 network nodes with varied metrics
- **`public/data/actions.json`**: 5 agent optimization actions

### Connecting to Real Data

To connect to DynamoDB or other data sources:

1. Update `/app/api/nodes/route.ts` to fetch from your database
2. Replace mock data generation with real queries
3. Update `/app/api/data-logs/route.ts` for action logs
4. Set environment variables in `.env.local`:

\`\`\`env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
DYNAMODB_TABLE_NAME=greenlink-nodes
\`\`\`

---

## 📊 Data Schema

### Node Object
\`\`\`typescript
{
  node_id: string          // e.g., "NODE-001"
  traffic_mbps: number     // Current traffic in Mbps
  energy_w: number         // Energy consumption in Watts
  status: "active" | "throttled" | "sleeping"
  last_update: string      // ISO timestamp
  location?: string        // Optional location
  uptime_hours?: number    // Optional uptime
}
\`\`\`

### Action Object
\`\`\`typescript
{
  action_id: string
  timestamp: string
  agent: string            // Agent name
  action_type: string      // "throttle", "sleep", "redistribute", etc.
  target_nodes: string[]   // Array of node IDs
  reason: string           // Explanation
  energy_saved_w: number
  success: boolean
}
\`\`\`

---

## 🎨 Customization

### Colors & Theme

Edit `app/globals.css` to customize the color palette:

\`\`\`css
@theme inline {
  --color-primary: oklch(0.6 0.18 142.5);    /* Emerald green */
  --color-accent: oklch(0.75 0.2 85);        /* Yellow accent */
  --color-secondary: oklch(0.5 0.15 200);    /* Blue */
}
\`\`\`

### Status Colors

Update status mapping in `components/node-card.tsx`:

\`\`\`typescript
const statusConfig = {
  active: { color: "text-green-400", icon: "🟢" },
  throttled: { color: "text-orange-400", icon: "🟠" },
  sleeping: { color: "text-red-400", icon: "🔴" },
}
\`\`\`

---

## 📱 Mobile Responsiveness

The app is fully responsive with breakpoints:

- **Mobile**: Single column layout, stacked charts
- **Tablet** (`md:`): 2-column grid for nodes and charts
- **Desktop** (`lg:`): 3-column grid for optimal viewing

Test responsiveness:
\`\`\`bash
# Open in browser and use DevTools responsive mode
# Or test on actual devices
\`\`\`

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

Or connect your GitHub repo to Vercel for automatic deployments.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

## 🧪 Testing

\`\`\`bash
# Run development server
npm run dev

# Test API endpoints
curl http://localhost:3000/api/nodes
curl http://localhost:3000/api/data-logs

# Test static data
curl http://localhost:3000/data/nodes.json
curl http://localhost:3000/data/actions.json
\`\`\`

---

## 🐛 Troubleshooting

### Charts not displaying
- Ensure `recharts` is installed: `npm install recharts`
- Check browser console for errors
- Verify data format matches expected schema

### API errors
- Check `/app/api/nodes/route.ts` for correct data generation
- Verify JSON files exist in `public/data/`

### Styling issues
- Clear browser cache
- Rebuild: `npm run build`
- Check Tailwind CSS configuration

---

## 📚 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Emoji-based (no external icon library)
- **Backend**: Next.js API Routes (mock data)

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use this project for demos, education, or production.

---

## 🌟 Demo Tips

For best demo experience:

1. Start on Dashboard to show real-time monitoring
2. Click "Refresh Simulation" to show dynamic updates
3. Navigate to Architecture to explain data flow
4. Show Agents page for AI decision-making
5. Use Data Explorer to show detailed logs

**Key talking points:**
- "AI agents autonomously optimize network energy"
- "Real-time throttling saves 35% energy"
- "Self-healing network responds to traffic patterns"
- "Scalable AWS serverless architecture"

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check documentation in `/docs`
- Review code comments for implementation details

---

**Built with 🌱 for sustainable 6G networks**
https://v0.app/chat/green-link-lite-dashboard-sQTIgzSnIPN
