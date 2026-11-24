import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Toast } from "./components/Toast";
import { OverviewView } from "./views/OverviewView";
import { MarketRadarView } from "./views/MarketRadarView";
import { ProposalStudioView } from "./views/ProposalStudioView";
import { SentimentView } from "./views/SentimentView";
import { CopilotView } from "./views/CopilotView";
import { ApiKeysView } from "./views/ApiKeysView";
import { Menu, X } from "lucide-react";

export function App() {
  const [currentTab, setTab] = useState("overview");
  const [userRole, setUserRole] = useState("Admin");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("nexora_gemini_key") || "");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleUpdateApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem("nexora_gemini_key", key);
    } else {
      localStorage.removeItem("nexora_gemini_key");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case "overview":
        return <OverviewView setTab={setTab} onShowToast={showToast} />;
      case "market-radar":
        return <MarketRadarView apiKey={apiKey} onShowToast={showToast} />;
      case "proposal-studio":
        return <ProposalStudioView apiKey={apiKey} onShowToast={showToast} />;
      case "sentiment":
        return <SentimentView apiKey={apiKey} onShowToast={showToast} />;
      case "copilot":
        return <CopilotView apiKey={apiKey} onShowToast={showToast} />;
      case "api-keys":
        return <ApiKeysView userRole={userRole} onShowToast={showToast} />;
      default:
        return <OverviewView setTab={setTab} onShowToast={showToast} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#080811] text-[#f1f3f9] bg-grid-pattern relative">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar - Desktop & Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          currentTab={currentTab}
          setTab={(t) => {
            setTab(t);
            setMobileMenuOpen(false);
          }}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <div className="lg:hidden h-14 border-b border-white/[0.08] bg-[#090912] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg border border-white/10 text-zinc-300 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-display font-bold text-sm text-white">NEXORA AI</span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
            {userRole}
          </span>
        </div>

        {/* Desktop Header */}
        <Header
          currentTab={currentTab}
          apiKey={apiKey}
          setApiKey={handleUpdateApiKey}
          onShowToast={showToast}
        />

        {/* View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Notification Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
}

export default App;
