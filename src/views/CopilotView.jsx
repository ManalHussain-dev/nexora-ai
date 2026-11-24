import { useState, useRef, useEffect } from "react";
import { generateAIContent } from "../services/geminiService";
import {
  Bot,
  Send,
  User,
  Sparkles,
  Copy,
  Check,
  Trash2,
  Terminal,
  Code2,
  Database,
  ShieldAlert,
} from "lucide-react";

export function CopilotView({ apiKey, onShowToast }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Welcome to the Nexora Enterprise Co-Pilot. I am initialized with full architecture, database modeling, and API engineering capabilities. How can I assist your operations today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const promptStarters = [
    {
      label: "Optimize PostgreSQL Index",
      icon: Database,
      prompt: "Explain how to index a high-throughput time-series events table in PostgreSQL for queries filtering by user_id and timestamp range.",
    },
    {
      label: "Design REST API Endpoints",
      icon: Code2,
      prompt: "Design standardized RESTful endpoints and payload contracts for a multi-tenant subscription billing service with webhooks.",
    },
    {
      label: "Security Audit: JWT vs Sessions",
      icon: ShieldAlert,
      prompt: "Provide a comparative security analysis between stateless JWT tokens in HTTP-only cookies versus Redis-backed server sessions.",
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { role: "user", text: query, time: "Just now" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await generateAIContent({
        prompt: query,
        systemInstruction: "You are an elite Staff Software Architect and Full-Stack Engineering Lead at a premier digital product studio.",
        apiKey,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: response, time: "Just now" },
      ]);
    } catch (err) {
      onShowToast("Error generating response: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
    onShowToast("Copied to clipboard!", "success");
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        text: "Conversation reset. What technical challenge would you like to tackle next?",
        time: "Just now",
      },
    ]);
    onShowToast("Conversation cleared", "info");
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Top Bar with Starters & Clear */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-500">Quick Prompts:</span>
          {promptStarters.map((starter) => {
            const Icon = starter.icon;
            return (
              <button
                key={starter.label}
                type="button"
                onClick={() => handleSend(starter.prompt)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.03] text-zinc-300 hover:border-violet-500/40 hover:text-white hover:bg-violet-600/10 transition-all"
              >
                <Icon className="h-3 w-3 text-violet-400" />
                <span>{starter.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
          title="Clear Conversation"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={idx}
              className={`flex gap-3.5 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`relative group max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser
                    ? "bg-violet-600/25 border border-violet-500/35 text-white shadow-lg"
                    : "glass-card text-zinc-200"
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.text}</div>

                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-white/[0.04]">
                  <span>{msg.time}</span>

                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(msg.text, idx)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-white text-zinc-400"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-white">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Bot className="h-4 w-4 animate-pulse" />
            </div>
            <div className="glass-card rounded-2xl p-4 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-ping" />
              <span>Nexora Co-Pilot is synthesizing engineering recommendations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (architecture, schema design, API specs, debugging)..."
            className="w-full rounded-2xl border border-white/10 bg-[#0c0c1a] px-4 py-3.5 pr-14 text-xs text-white placeholder-zinc-500 font-mono focus:border-violet-500 focus:outline-none shadow-xl"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2.5 flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition-colors disabled:opacity-30 disabled:hover:bg-violet-600"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
        <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-zinc-600 px-2">
          <span>Enterprise Guardrails Active</span>
          <span>Shift + Enter for new line</span>
        </div>
      </div>
    </div>
  );
}
