import { useState } from "react";
import { Key, Sparkles, Check, Globe2, Bell, Shield } from "lucide-react";

export function Header({ currentTab, apiKey, setApiKey, onShowToast }) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey || "");

  const tabTitles = {
    overview: "Executive Overview & Model Telemetry",
    "market-radar": "Market & Competitor Intelligence Radar",
    "proposal-studio": "Client Proposal & SOW Architecture Studio",
    sentiment: "Customer Feedback & Sentiment Classifier",
    copilot: "Enterprise AI Co-Pilot Console",
    "api-keys": "API Key Management & Access Control",
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    setApiKey(tempKey);
    setShowKeyModal(false);
    onShowToast("Custom Gemini API Key updated successfully!", "success");
  };

  return (
    <>
      <header className="h-16 shrink-0 border-b border-white/[0.08] bg-[#090912]/80 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-sm sm:text-base font-bold text-white tracking-wide">
            {tabTitles[currentTab] || "Operations Hub"}
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            99.98% SLA
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Custom API Key Button */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-600/15 px-3 py-1.5 text-xs font-mono text-violet-200 hover:bg-violet-600/25 transition-all"
          >
            <Key className="h-3.5 w-3.5 text-violet-400" />
            <span className="hidden sm:inline">
              {apiKey ? "Custom Key: Active" : "API Config"}
            </span>
          </button>

          {/* Region Indicator */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 px-2 py-1 rounded-lg bg-black/40 border border-white/[0.05]">
            <Globe2 className="h-3 w-3 text-cyan-400" />
            <span>us-east-1 (Edge)</span>
          </div>
        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-violet-500/30 bg-[#0d0d1b] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                  <Key className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-bold text-white">Gemini API Key</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveKey} className="mt-4 space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Provide your personal Google Gemini API key to run live real-time model requests, or leave empty to use Nexora's built-in intelligent demo engine.
              </p>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  API Key (starts with AIzaSy...)
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-zinc-300 hover:bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-violet-500 transition-colors"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
