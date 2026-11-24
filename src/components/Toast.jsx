import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />,
    info: <Info className="h-4 w-4 text-cyan-400 shrink-0" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-violet-500/30 bg-[#0e0e1a]/95 px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl max-w-sm"
      >
        {icons[type] || icons.success}
        <span className="text-xs text-zinc-200 font-medium leading-relaxed">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 rounded-lg p-1 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
