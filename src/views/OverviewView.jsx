import { useState } from "react";
import {
  Zap,
  Activity,
  Cpu,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

export function OverviewView({ setTab, onShowToast }) {
  const [timeRange, setTimeRange] = useState("7d");

  const metrics = [
    {
      title: "Total AI Inferences",
      value: "142,890",
      change: "+14.8%",
      trend: "up",
      detail: "vs. previous 7-day period",
      icon: Cpu,
      color: "text-violet-400 bg-violet-600/10 border-violet-500/20",
    },
    {
      title: "Token Processing Volume",
      value: "48.2M",
      change: "+22.4%",
      trend: "up",
      detail: "Average $0.0004 / 1k tokens",
      icon: Zap,
      color: "text-cyan-400 bg-cyan-600/10 border-cyan-500/20",
    },
    {
      title: "Average Latency (P95)",
      value: "412ms",
      change: "-32ms",
      trend: "up",
      detail: "99.98% SLA compliance",
      icon: Clock,
      color: "text-emerald-400 bg-emerald-600/10 border-emerald-500/20",
    },
    {
      title: "Active Enterprise Agents",
      value: "18 Running",
      change: "100% Healthy",
      trend: "neutral",
      detail: "4 background scheduled tasks",
      icon: Layers,
      color: "text-amber-400 bg-amber-600/10 border-amber-500/20",
    },
  ];

  const recentEvents = [
    {
      id: "evt_9841",
      workflow: "Enterprise Market Radar — Competitor SWOT",
      model: "Gemini 2.5 Flash",
      tokens: "3,840",
      latency: "382ms",
      status: "SUCCESS",
      time: "2 mins ago",
    },
    {
      id: "evt_9840",
      workflow: "Automated SOW Proposal Generation",
      model: "Gemini 2.5 Pro",
      tokens: "8,120",
      latency: "840ms",
      status: "SUCCESS",
      time: "14 mins ago",
    },
    {
      id: "evt_9839",
      workflow: "Customer Review Sentiment Extraction",
      model: "Gemini 2.5 Flash",
      tokens: "1,240",
      latency: "210ms",
      status: "OPTIMIZED",
      time: "28 mins ago",
    },
    {
      id: "evt_9838",
      workflow: "Real-time Co-Pilot Multi-Turn Session",
      model: "Gemini 2.5 Flash",
      tokens: "4,620",
      latency: "445ms",
      status: "SUCCESS",
      time: "42 mins ago",
    },
    {
      id: "evt_9837",
      workflow: "Daily Knowledge Graph Index Sync",
      model: "Text-Embedding-004",
      tokens: "12,980",
      latency: "1,120ms",
      status: "SUCCESS",
      time: "1 hour ago",
    },
  ];

  const chartBars = [
    { day: "Mon", tokens: 5.2, inferences: 18.4 },
    { day: "Tue", tokens: 6.8, inferences: 22.1 },
    { day: "Wed", tokens: 7.4, inferences: 24.6 },
    { day: "Thu", tokens: 6.1, inferences: 20.8 },
    { day: "Fri", tokens: 8.9, inferences: 29.5 },
    { day: "Sat", tokens: 4.5, inferences: 14.2 },
    { day: "Sun", tokens: 9.3, inferences: 31.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome / Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-r from-violet-950/40 via-[#0e0e1a] to-cyan-950/20 p-6 sm:p-8 backdrop-blur-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600/15 px-3 py-1 text-[11px] font-mono text-violet-300 mb-3">
            <Sparkles className="h-3 w-3" />
            <span>AI Operations Intelligence Engine</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Enterprise Model Analytics & Automation Hub
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Monitor real-time token throughput, orchestrate automated market intelligence, draft enterprise client proposals, and classify customer sentiment in sub-second latency.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setTab("market-radar")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-600/25 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-600/35 transition-all"
            >
              <span>Launch Market Radar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setTab("proposal-studio")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] transition-all"
            >
              <span>Generate SOW Proposal</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow inside banner */}
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className="glass-card rounded-2xl p-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-400">{m.title}</span>
                <div className={`p-2 rounded-xl border ${m.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {m.value}
                </span>
                <span className="font-mono text-xs font-semibold text-emerald-400 flex items-center">
                  {m.change}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-zinc-500 font-mono">{m.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Charts & Workload Distribution */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Token Burn & Throughput Chart (Cols 8) */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-8 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-display text-base font-bold text-white">Daily Inference & Token Velocity</h3>
              <p className="text-xs text-zinc-400 font-mono">Millions of Tokens Processed per day</p>
            </div>

            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/[0.08] text-xs font-mono">
              {["24h", "7d", "30d"].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    timeRange === range
                      ? "bg-violet-600/40 text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Bar Visualization */}
          <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-white/[0.08]">
            {chartBars.map((bar) => {
              const heightPercent = (bar.tokens / 10) * 100;
              return (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-[#121224] border border-violet-500/30 text-[10px] font-mono px-2 py-1 rounded-lg shadow-xl pointer-events-none z-20 whitespace-nowrap">
                    <p className="text-white font-bold">{bar.tokens}M tokens</p>
                    <p className="text-zinc-400">{bar.inferences}k requests</p>
                  </div>

                  <div className="w-full max-w-[42px] bg-white/[0.04] rounded-t-xl overflow-hidden h-44 flex items-end">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-violet-600 via-indigo-500 to-cyan-400 rounded-t-xl transition-all duration-500 group-hover:brightness-125"
                    />
                  </div>
                  <span className="font-mono text-xs text-zinc-400">{bar.day}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Peak throughput: Friday (8.9M tokens)
            </span>
            <span>Cost efficiency: 98.4%</span>
          </div>
        </div>

        {/* Model Workload Breakdown (Cols 4) */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-white">Model Workload Share</h3>
            <p className="text-xs text-zinc-400 font-mono">Distribution across active deployments</p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-zinc-200">Gemini 2.5 Flash</span>
                  <span className="text-violet-300 font-bold">68%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full w-[68%] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">Sub-second streaming & high volume</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-zinc-200">Gemini 2.5 Pro</span>
                  <span className="text-cyan-300 font-bold">24%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full w-[24%] bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full" />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">Complex SOW & strategic analysis</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-zinc-200">Text-Embedding-004</span>
                  <span className="text-emerald-300 font-bold">8%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full w-[8%] bg-emerald-500 rounded-full" />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">Semantic search & indexing</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] text-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-violet-300 font-mono">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Dynamic Auto-Scaling Active
            </span>
          </div>
        </div>
      </div>

      {/* Live Operations Stream Table */}
      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <Activity className="h-4 w-4 text-violet-400" />
            <h3 className="font-display text-base font-bold text-white">Live Event & Inference Log</h3>
          </div>
          <span className="font-mono text-xs text-zinc-500">Auto-refreshing (realtime)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08] text-zinc-500 pb-2">
                <th className="py-2.5 font-normal">EVENT ID</th>
                <th className="py-2.5 font-normal">WORKFLOW / PIPELINE</th>
                <th className="py-2.5 font-normal">ENGINE</th>
                <th className="py-2.5 font-normal">TOKENS</th>
                <th className="py-2.5 font-normal">LATENCY</th>
                <th className="py-2.5 font-normal">STATUS</th>
                <th className="py-2.5 font-normal text-right">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {recentEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 text-violet-400 font-semibold">{evt.id}</td>
                  <td className="py-3 text-zinc-200 font-medium font-sans">{evt.workflow}</td>
                  <td className="py-3 text-zinc-400">{evt.model}</td>
                  <td className="py-3 text-zinc-400">{evt.tokens}</td>
                  <td className="py-3 text-zinc-400">{evt.latency}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      evt.status === "SUCCESS"
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-zinc-500">{evt.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
