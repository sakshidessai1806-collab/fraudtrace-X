import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  UserCheck, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  AlertCircle, 
  Check, 
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { DisclaimerModal } from './DisclaimerModal';
import { useInvestigation } from '../context/InvestigationContext';
import { BlockchainNetwork } from '../types';

export const Topbar: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChainMenu, setShowChainMenu] = useState(false);
  const navigate = useNavigate();

  const { 
    selectedChain, 
    setSelectedChain, 
    loadDemoInvestigation, 
    alerts, 
    showToast 
  } = useInvestigation();

  const chains: BlockchainNetwork[] = ['Ethereum', 'TRON', 'Bitcoin', 'Polygon', 'BSC'];

  const handleSelectChain = (chain: BlockchainNetwork) => {
    setSelectedChain(chain);
    setShowChainMenu(false);
    if (chain !== 'Ethereum' && chain !== 'TRON') {
      showToast(`${chain} Indexer adapter ready — demo dataset not loaded.`);
    } else {
      showToast(`Active network filtered to ${chain}.`);
    }
  };

  const unacknowledgedAlerts = alerts.filter(a => !a.isAcknowledged);

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-[#080d1c]/90 border-b border-slate-800/80 backdrop-blur-xl px-4 flex items-center justify-between gap-4">
        {/* Left: Global Search & Quick Demo Loader */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <SearchBar />

          <button
            onClick={() => {
              loadDemoInvestigation();
              navigate('/investigation');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/20 transition-all shrink-0 active:scale-95"
            title="Load Primary Hackathon Demo Case CASE-2026-1042"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Load Demo Case</span>
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Multi-Chain Selector */}
          <div className="relative">
            <button
              onClick={() => setShowChainMenu(!showChainMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 text-xs font-mono text-slate-200 transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{selectedChain}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showChainMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0b1020] border border-cyan-500/30 rounded-xl shadow-2xl p-1 z-50">
                <div className="text-[10px] uppercase font-mono px-2 py-1 text-slate-400">
                  Select Blockchain
                </div>
                {chains.map((chain) => (
                  <button
                    key={chain}
                    onClick={() => handleSelectChain(chain)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg hover:bg-slate-800 text-slate-200 transition-colors font-mono"
                  >
                    <span>{chain}</span>
                    {selectedChain === chain && <Check className="w-3 h-3 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DEMO ENVIRONMENT Badge */}
          <button
            onClick={() => setShowDisclaimer(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 text-amber-300 text-[11px] font-mono font-bold tracking-wider transition-all animate-pulse-subtle"
            title="Click to view Demo Environment Disclaimer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>DEMO DATA</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </button>

          {/* Notifications Flyout */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Intelligence Alerts"
              aria-label="Intelligence Alerts"
            >
              <Bell className="w-4 h-4" />
              {unacknowledgedAlerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#080d1c]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#090e1c] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>Recent Live Alerts</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-300 text-[10px] font-mono">
                      {unacknowledgedAlerts.length}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/alerts');
                    }}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                  {alerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/investigation');
                      }}
                      className="p-2.5 hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-200 truncate pr-2">
                          {alert.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {alert.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                LEA Analyst
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                I4C CIS Division
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Disclaimer Modal */}
      <DisclaimerModal isOpen={showDisclaimer} onClose={() => setShowDisclaimer(false)} />
    </>
  );
};
