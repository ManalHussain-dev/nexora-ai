import { useState } from "react";
import { generateAIContent } from "../services/geminiService";
import confetti from "canvas-confetti";
import {
  Smile,
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
  Send,
  Zap,
} from "lucide-react";

export function SentimentView({ apiKey, onShowToast }) {
  const [feedbackText, setFeedbackText] = useState(
    "The new dashboard is blazing fast and our engineering team loves the keyboard shortcuts! However, we urgently need automated CSV and PDF export for our end-of-month financial audit meetings. If you add that, it's a 10/10."
  );
  const [channel, setChannel] = useState("Product Hunt Review");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);

  const presets = [
    {
      title: "SaaS Power User (Feature Request)",
      channel: "G2 Review",
      text: "The new dashboard is blazing fast and our engineering team loves the keyboard shortcuts! However, we urgently need automated CSV and PDF export for our end-of-month financial audit meetings. If you add that, it's a 10/10.",
    },
    {
      title: "Critical Mobile Checkout Crash",
      channel: "App Store Review",
      text: "I was trying to purchase a $450 subscription and the app completely froze on the Stripe credit card screen. It charged my bank account twice! Need immediate help and refund.",
    },
    {
      title: "Enterprise Migration Praise",
      channel: "Customer Success QBR",
      text: "Our migration from legacy on-prem to your cloud APIs reduced our query latency from 3.4 seconds to 340 milliseconds. The support team answered our questions within 10 minutes. Super impressed.",
    },
  ];

  const handleApplyPreset = (p) => {
    setChannel(p.channel);
    setFeedbackText(p.text);
  };

  const handleClassify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const prompt = `Classify the following customer feedback received from ${channel}:
"${feedbackText}"

Please provide:
1. Overall Sentiment Score (% Positive/Neutral/Negative)
2. Detected Customer Emotion & Urgency Tier
3. Extracted Core Pain Points or Praise
4. Actionable Product / Engineering Next Steps
5. High-Touch Automated Customer Service Response Template ready to send.`;

    try {
      const output = await generateAIContent({
        prompt,
        systemInstruction: "You are an expert NLP Customer Intelligence Lead and Product Operations Specialist.",
        apiKey,
      });

      setResult(output);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      onShowToast("Feedback sentiment classified and triaged!", "success");
    } catch (err) {
      onShowToast("Classification failed: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast("Copied analysis to clipboard!", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-r from-emerald-950/30 to-teal-950/20 p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
            <Smile className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Customer Feedback & Sentiment Classifier
            </h2>
            <p className="text-xs text-zinc-400">
              Ingest real-time customer reviews, classify sentiment polarity, extract engineering bug reports, and auto-draft empathetic responses.
            </p>
          </div>
        </div>

        {/* 1-Click Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
          <span className="font-mono text-[11px] text-zinc-500 mr-1">Triage Samples:</span>
          {presets.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-emerald-500/40 hover:text-white hover:bg-emerald-600/10 transition-all"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Form Inputs (Cols 5) */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-5">
          <form onSubmit={handleClassify} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Channel / Source
              </label>
              <input
                type="text"
                required
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="e.g. Zendesk Ticket / G2 / App Store"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Customer Feedback / Support Note
              </label>
              <textarea
                rows={7}
                required
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Paste customer review or support log..."
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-xs font-bold text-white shadow-lg hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin text-white" />
                  <span>Evaluating Customer Sentiment...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  <span>Classify & Extract Insights</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Window (Cols 7) */}
        <div className="glass-card rounded-3xl p-6 lg:col-span-7 min-h-[460px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <span className="font-display text-sm font-bold text-white">Sentiment Triage & Response</span>

              {result && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white"
                  title="Copy Analysis"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center space-y-3">
                <div className="mx-auto h-9 w-9 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                <p className="font-mono text-xs text-zinc-400">Running NLP sentiment classification & response drafting...</p>
              </div>
            ) : result ? (
              <div className="text-xs leading-relaxed space-y-3 font-sans text-zinc-300 whitespace-pre-line">
                {result}
              </div>
            ) : (
              <div className="py-24 text-center space-y-2">
                <MessageSquare className="h-8 w-8 text-zinc-600 mx-auto" />
                <p className="text-sm font-bold text-zinc-400">Awaiting feedback input</p>
                <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                  Select a triage sample or paste feedback above and click "Classify & Extract Insights".
                </p>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Auto-triage SLA: Sub-second</span>
              <span>Tokens: ~420 tokens</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
