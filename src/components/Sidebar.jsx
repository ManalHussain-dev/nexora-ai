import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Smile,
  Bot,
  KeyRound,
  ShieldCheck,
  Zap,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export function Sidebar({ currentTab, setTab, userRole, setUserRole }) {
  const navItems = [
    { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
    { id: "market-radar", label: "Market & Competitor Radar", icon: TrendingUp },
    { id: "proposal-studio", label: "Proposal & SOW Studio", icon: FileText },
    { id: "sentiment", label: "Sentiment Classifier", icon: Smile },
    { id: "copilot", label: "AI Co-Pilot Console", icon: Bot },
    { id: "api-keys", label: "API Keys & Quotas", icon: KeyRound },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-white/[0.08] bg-[#0a0a14] flex flex-col justify-between p-4 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-3 py-3 border-b border-white/[0.07] mb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h1 className="font-display text-sm font-bold tracking-wider text-white flex items-center gap-1.5">
              <span>NEXORA</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 font-mono border border-violet-500/30">
                AI
              </span>
            </h1>
            <p className="text-[10px] font-mono text-zinc-500">Enterprise Operations</p>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="mb-6 px-2">
          <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-2">
            <div className="flex items-center justify-between text-[11px] mb-1.5 px-1 font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-violet-400" />
                Active View
              </span>
              <span className="text-zinc-500 text-[10px]">{userRole}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setUserRole("Admin")}
                className={`py-1.5 rounded-lg font-medium transition-all ${
                  userRole === "Admin"
                    ? "bg-violet-600/30 text-white border border-violet-500/40 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                👑 Admin
              </button>
              <button
                type="button"
                onClick={() => setUserRole("Analyst")}
                className={`py-1.5 rounded-lg font-medium transition-all ${
                  userRole === "Analyst"
                    ? "bg-cyan-600/30 text-white border border-cyan-500/40 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                🔬 Analyst
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 text-left ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600/25 to-indigo-600/15 text-white border border-violet-500/35 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-violet-400" : "text-zinc-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Stats */}
      <div className="pt-4 border-t border-white/[0.08] space-y-3">
        <div className="rounded-2xl border border-white/[0.06] bg-black/50 p-3 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Gemini 2.5 Flash
            </span>
            <span className="text-emerald-400">Online</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] font-mono text-zinc-500">
            <span>28.4k / 50k tokens</span>
            <span>56%</span>
          </div>
        </div>

        <a
          href="https://github.com/ManalHussain-dev"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between text-[11px] font-mono text-zinc-500 hover:text-violet-300 transition-colors px-2"
        >
          <span>Crafted by Manal Hussain</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </aside>
  );
}
