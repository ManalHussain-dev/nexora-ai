import { useState } from "react";
import {
  KeyRound,
  Plus,
  Copy,
  Check,
  Trash2,
  Shield,
  Lock,
  Layers,
  AlertCircle,
} from "lucide-react";

export function ApiKeysView({ userRole, onShowToast }) {
  const [keys, setKeys] = useState([
    {
      id: "key_1",
      name: "Production Webhook & CRM Ingestion",
      prefix: "pk_live_948f...",
      fullKey: "pk_live_948f2a1b9c8e7d6f5a4b3c2d1e0f",
      scopes: ["read:analytics", "write:ai_inferences"],
      created: "2026-11-10",
      lastUsed: "4 mins ago",
      status: "ACTIVE",
    },
    {
      id: "key_2",
      name: "Staging CI/CD Automated Test Runner",
      prefix: "pk_test_312a...",
      fullKey: "pk_test_312a8b7c6d5e4f3a2b1c0d9e8f7a",
      scopes: ["write:ai_inferences"],
      created: "2026-11-18",
      lastUsed: "2 hours ago",
      status: "ACTIVE",
    },
    {
      id: "key_3",
      name: "Legacy Analytics Export Worker",
      prefix: "pk_live_449c...",
      fullKey: "pk_live_449c0b1a2d3e4f5a6b7c8d9e0f1a",
      scopes: ["read:analytics"],
      created: "2026-10-04",
      lastUsed: "3 weeks ago",
      status: "REVOKED",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState(["read:analytics", "write:ai_inferences"]);
  const [copiedId, setCopiedId] = useState(null);

  const availableScopes = [
    { id: "read:analytics", label: "Read Analytics & Telemetry" },
    { id: "write:ai_inferences", label: "Execute AI Model Inferences" },
    { id: "admin:billing", label: "Admin: Billing & Usage Limits" },
    { id: "manage:webhooks", label: "Manage Webhook Endpoints" },
  ];

  const handleToggleScope = (scopeId) => {
    setSelectedScopes((prev) =>
      prev.includes(scopeId) ? prev.filter((s) => s !== scopeId) : [...prev, scopeId]
    );
  };

  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const generatedKey = `pk_live_${randomSuffix}${Math.random().toString(36).substring(2, 10)}`;

    const newKeyObj = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      prefix: `${generatedKey.substring(0, 11)}...`,
      fullKey: generatedKey,
      scopes: selectedScopes,
      created: "Today",
      lastUsed: "Never",
      status: "ACTIVE",
    };

    setKeys([newKeyObj, ...keys]);
    setNewKeyName("");
    setShowModal(false);
    onShowToast(`API key "${newKeyName}" generated successfully!`, "success");
  };

  const handleRevoke = (id, name) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: "REVOKED" } : k))
    );
    onShowToast(`Revoked key: ${name}`, "info");
  };

  const handleCopy = (fullKey, id) => {
    navigator.clipboard.writeText(fullKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    onShowToast("API key copied to clipboard!", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-r from-violet-950/30 to-purple-950/20 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                API Key Management & Access Tokens
              </h2>
              <p className="text-xs text-zinc-400">
                Generate scoped tokens for external microservices, CI/CD runners, and automated webhook pipelines.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-violet-500 hover:to-indigo-500 transition-all shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Create New API Key</span>
          </button>
        </div>

        {/* Security Warning Pill */}
        <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-zinc-400 pt-3 border-t border-white/[0.06]">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span>All API keys are encrypted at rest with AES-256 and verified through HMAC SHA-256 signatures.</span>
        </div>
      </div>

      {/* Keys Table Card */}
      <div className="glass-card rounded-3xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08] text-zinc-500 pb-2">
                <th className="py-2.5 font-normal">NAME & DESCRIPTION</th>
                <th className="py-2.5 font-normal">KEY TOKEN</th>
                <th className="py-2.5 font-normal">PERMISSION SCOPES</th>
                <th className="py-2.5 font-normal">LAST USED</th>
                <th className="py-2.5 font-normal">STATUS</th>
                <th className="py-2.5 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {keys.map((k) => (
                <tr key={k.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-sans">
                    <p className="font-bold text-white">{k.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">Created {k.created}</p>
                  </td>

                  <td className="py-3.5">
                    <div className="inline-flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-lg border border-white/[0.06]">
                      <span className="text-zinc-300 font-mono text-[11px]">{k.prefix}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(k.fullKey, k.id)}
                        className="text-zinc-500 hover:text-white"
                        title="Copy Key"
                      >
                        {copiedId === k.id ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {k.scopes.map((scope) => (
                        <span
                          key={scope}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.04] text-zinc-400 border border-white/[0.08]"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 text-zinc-400">{k.lastUsed}</td>

                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        k.status === "ACTIVE"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      {k.status}
                    </span>
                  </td>

                  <td className="py-3.5 text-right">
                    {k.status === "ACTIVE" ? (
                      <button
                        type="button"
                        onClick={() => handleRevoke(k.id, k.name)}
                        className="text-zinc-500 hover:text-rose-400 p-1 transition-colors text-[11px] font-mono"
                      >
                        Revoke
                      </button>
                    ) : (
                      <span className="text-zinc-600 text-[11px] font-mono">Inactive</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Key Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-violet-500/30 bg-[#0d0d1b] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                  <KeyRound className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-bold text-white">Create New API Key</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateKey} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Key Name / Purpose
                </label>
                <input
                  type="text"
                  required
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Production Ingestion Service"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  Granular Permission Scopes
                </label>
                <div className="space-y-2">
                  {availableScopes.map((scope) => {
                    const isChecked = selectedScopes.includes(scope.id);
                    return (
                      <label
                        key={scope.id}
                        onClick={() => handleToggleScope(scope.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? "border-violet-500/40 bg-violet-600/10 text-white"
                            : "border-white/[0.06] bg-black/30 text-zinc-400 hover:border-white/10"
                        }`}
                      >
                        <span className="font-mono">{scope.id}</span>
                        <span className="text-[11px] text-zinc-500 font-sans">{scope.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-zinc-300 hover:bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-violet-500 transition-colors"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
