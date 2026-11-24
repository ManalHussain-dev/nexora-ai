import { useState } from "react";
import { generateAIContent } from "../services/geminiService";
import confetti from "canvas-confetti";
import {
  TrendingUp,
  Sparkles,
  Copy,
  Download,
  Check,
  Search,
  Layers,
  ArrowRight,
  ShieldAlert,
  Target,
} from "lucide-react";

export function MarketRadarView({ apiKey, onShowToast }) {
  const [targetCompany, setTargetCompany] = useState("Linear.app");
  const [industry, setIndustry] = useState("Developer Tools & Issue Tracking");
  const [competitors, setCompetitors] = useState("Jira, Asana, Monday.com");
  const [analysisFocus, setAnalysisFocus] = useState("Speed, UX & Developer Ergonomics");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);

  const presets = [
    {
      company: "Linear.app",
      industry: "DevTools & Project Management",
      competitors: "Jira, Asana, GitHub Projects",
      focus: "Keyboard-first speed & minimal UI",
    },
    {
      company: "Supabase",
      industry: "BaaS & Cloud Database",
      competitors: "Firebase, AWS Amplify, PlanetScale",
      focus: "Postgres portability & open-source trust",
    },
    {
      company: "Shopify Plus",
      industry: "Enterprise E-Commerce",
      competitors: "BigCommerce, Adobe Commerce, Commerce Layer",
      focus: "Checkout speed & headless APIs",
    },
  ];

  const handleApplyPreset = (p) => {
    setTargetCompany(p.company);
    setIndustry(p.industry);
    setCompetitors(p.competitors);
    setAnalysisFocus(p.focus);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const prompt = `Perform an executive SWOT and Market Intelligence analysis on ${targetCompany} in the ${industry} industry.
Key Competitors: ${competitors}
Strategic Focus: ${analysisFocus}
Provide concrete strengths, critical vulnerabilities, market opportunities, and recommended engineering/product strategy.`;

    try {
      const output = await generateAIContent({
        prompt,
        systemInstruction: "You are an elite enterprise SaaS strategist and technical market analyst.",
        apiKey,
      });

      setResult(output);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      onShowToast("Market Intelligence report compiled successfully!", "success");
    } catch (err) {
      onShowToast("Analysis failed: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast("Copied report to clipboard!", "success");
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${targetCompany.toLowerCase().replace(/[^a-z0-9]/g, "-")}-intelligence-report.md`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast("Markdown report downloaded!", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-r from-violet-950/30 to-indigo-950/20 p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Market & Competitor Intelligence Radar
            </h2>
            <p className="text-xs text-zinc-400">
              Generate executive-level SWOT positioning, feature gap analyses, and strategic roadmaps using Gemini intelligence.
            </p>
          </div>
        </div>

        {/* 1-Click Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
          <span className="font-mono text-[11px] text-zinc-500 mr-1">Instant Demo Presets:</span>
          {presets.map((p) => (
            <button
              key={p.company}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-violet-500/40 hover:text-white hover:bg-violet-600/10 transition-all"
            >
              {p.company}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Form Inputs (Cols 5) */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-5">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Target Company / Product
              </label>
              <input
                type="text"
                required
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Linear.app"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Industry & Market Segment
              </label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Developer Productivity"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Key Competitors
              </label>
              <input
                type="text"
                required
                value={competitors}
                onChange={(e) => setCompetitors(e.target.value)}
                placeholder="e.g. Jira, Asana, Monday"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Primary Analysis Focus
              </label>
              <input
                type="text"
                required
                value={analysisFocus}
                onChange={(e) => setAnalysisFocus(e.target.value)}
                placeholder="e.g. Latency, Pricing, Developer API"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-violet-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/40 bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg hover:from-violet-500 hover:to-indigo-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin text-white" />
                  <span>Synthesizing Market Radar...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Execute Strategic Intelligence</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel (Cols 7) */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-7 min-h-[460px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-violet-400" />
                <span className="font-display text-sm font-bold text-white">Synthesized Intelligence</span>
              </div>

              {result && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all"
                    title="Copy Markdown"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all"
                    title="Download Report"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center space-y-3">
                <div className="mx-auto h-9 w-9 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                <p className="font-mono text-xs text-zinc-400">Scanning competitive landscape and vectorizing gaps...</p>
              </div>
            ) : result ? (
              <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-3 font-sans text-zinc-300 whitespace-pre-line">
                {result}
              </div>
            ) : (
              <div className="py-24 text-center space-y-2">
                <Search className="h-8 w-8 text-zinc-600 mx-auto" />
                <p className="text-sm font-bold text-zinc-400">No report generated yet</p>
                <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                  Select a preset above or enter a company name and click "Execute Strategic Intelligence".
                </p>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Model: Gemini 2.5 Flash</span>
              <span>Tokens: ~940 tokens</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
