import { useState } from "react";
import { generateAIContent } from "../services/geminiService";
import confetti from "canvas-confetti";
import {
  FileText,
  Sparkles,
  Copy,
  Download,
  Check,
  Printer,
  Layers,
  Code2,
} from "lucide-react";

export function ProposalStudioView({ apiKey, onShowToast }) {
  const [projectTitle, setProjectTitle] = useState("Enterprise AI Logistics Portal");
  const [clientIndustry, setClientIndustry] = useState("Supply Chain & Logistics");
  const [timeline, setTimeline] = useState("6 Weeks (3 Sprints)");
  const [budgetTier, setBudgetTier] = useState("$12,000 — $20,000 USD");
  const [techStack, setTechStack] = useState("React 19, Tailwind CSS, Node.js, Express, PostgreSQL, Gemini API");
  const [tone, setTone] = useState("Technical & Executive");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);

  const presets = [
    {
      title: "FinTech Automated Invoicing Engine",
      industry: "FinTech & Payments",
      timeline: "4 Weeks",
      budget: "$8,500 — $14,000",
      stack: "Next.js, Stripe, Express, PostgreSQL",
    },
    {
      title: "AI Healthcare Patient Intake Platform",
      industry: "Digital Health (HIPAA)",
      timeline: "8 Weeks",
      budget: "$20,000 — $35,000",
      stack: "React, Flutter, Firebase, Cloud Functions",
    },
    {
      title: "Real-Time Fleet Telemetry Dashboard",
      industry: "IoT & Transportation",
      timeline: "6 Weeks",
      budget: "$15,000 — $25,000",
      stack: "React, WebSockets, Tailwind, Node.js, TimescaleDB",
    },
  ];

  const handleApplyPreset = (p) => {
    setProjectTitle(p.title);
    setClientIndustry(p.industry);
    setTimeline(p.timeline);
    setBudgetTier(p.budget);
    setTechStack(p.stack);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const prompt = `Draft a comprehensive, professional Project Proposal and Scope of Work (SOW) for:
Project Name: ${projectTitle}
Client Industry: ${clientIndustry}
Estimated Timeline: ${timeline}
Budget Estimate: ${budgetTier}
Recommended Tech Stack: ${techStack}
Tone: ${tone}

Include an Executive Summary, Technical Architecture specifications, Sprint-by-Sprint Milestones, Security & SLA guarantees, and Acceptance Criteria.`;

    try {
      const output = await generateAIContent({
        prompt,
        systemInstruction: "You are a Principal Solutions Architect and Enterprise Project Director drafting formal client SOWs.",
        apiKey,
      });

      setResult(output);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 } });
      onShowToast("Proposal & SOW generated successfully!", "success");
    } catch (err) {
      onShowToast("Failed to generate proposal: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast("Copied SOW to clipboard!", "success");
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}-sow.md`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast("Markdown SOW downloaded!", "success");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-r from-indigo-950/30 to-purple-950/20 p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Client Proposal & SOW Architecture Studio
            </h2>
            <p className="text-xs text-zinc-400">
              Transform high-level client requirements into complete, production-grade Scopes of Work with architectural blueprints and milestone roadmaps.
            </p>
          </div>
        </div>

        {/* 1-Click Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
          <span className="font-mono text-[11px] text-zinc-500 mr-1">Project Presets:</span>
          {presets.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-indigo-500/40 hover:text-white hover:bg-indigo-600/10 transition-all"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Input Form (Cols 5) */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-5">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Project Title
              </label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g. Next-Gen B2B Analytics Portal"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Industry
                </label>
                <input
                  type="text"
                  required
                  value={clientIndustry}
                  onChange={(e) => setClientIndustry(e.target.value)}
                  placeholder="FinTech / SaaS"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Timeline
                </label>
                <input
                  type="text"
                  required
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="e.g. 6 Weeks"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Target Budget Estimate
              </label>
              <input
                type="text"
                required
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                placeholder="e.g. $10,000 — $20,000"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Technical Stack & Architecture
              </label>
              <input
                type="text"
                required
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. React 19, Express, PostgreSQL"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-lg hover:from-indigo-500 hover:to-violet-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin text-white" />
                  <span>Architecting Scope of Work...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Complete Proposal SOW</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Window (Cols 7) */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-7 min-h-[500px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <span className="font-display text-sm font-bold text-white">Generated SOW Specification</span>

              {result && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white"
                    title="Copy Markdown"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white"
                    title="Download SOW"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white"
                    title="Print Document"
                  >
                    <Printer className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-24 text-center space-y-3">
                <div className="mx-auto h-9 w-9 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <p className="font-mono text-xs text-zinc-400">Synthesizing architecture deliverables & milestones...</p>
              </div>
            ) : result ? (
              <div className="text-xs leading-relaxed space-y-3 font-sans text-zinc-300 whitespace-pre-line max-h-[520px] overflow-y-auto pr-2">
                {result}
              </div>
            ) : (
              <div className="py-28 text-center space-y-2">
                <FileText className="h-8 w-8 text-zinc-600 mx-auto" />
                <p className="text-sm font-bold text-zinc-400">No proposal drafted yet</p>
                <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                  Fill in the project requirements or select a preset and click "Generate Complete Proposal SOW".
                </p>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Ready for Client Signature</span>
              <span>Tokens: ~1,420 tokens</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
