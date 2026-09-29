import React from 'react';
import { X, Copy, Check, ShieldAlert, ArrowUpRight, ArrowDownLeft, Clock, BookmarkPlus, ExternalLink } from 'lucide-react';
import { GraphNodeData } from '../lib/graphEngine';
import { formatAddress, formatUSD, copyToClipboard } from '../lib/utils';
import { RiskBadge } from './RiskBadge';
import { useInvestigation } from '../context/InvestigationContext';

interface NodeDetailsDrawerProps {
  node: GraphNodeData | null;
  onClose: () => void;
}

export const NodeDetailsDrawer: React.FC<NodeDetailsDrawerProps> = ({ node, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const { showToast } = useInvestigation();

  if (!node) return null;

  const handleCopy = () => {
    copyToClipboard(node.address);
    setCopied(true);
    showToast(`Copied ${formatAddress(node.address)} to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreserveEvidence = () => {
    showToast(`Wallet snapshot for ${formatAddress(node.address)} preserved into Evidence Vault.`);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-[#0a0f1e]/95 border-l border-cyan-500/30 shadow-2xl backdrop-blur-2xl flex flex-col justify-between animate-fade-in">
      {/* Top Header */}
      <div>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                NODE FORENSIC DETAILS
              </h3>
              <p className="text-[11px] text-slate-400">
                Topological Graph Entity Inspector
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)] font-mono">
          {/* Node Role & Risk */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Entity Designation
              </span>
              <span className="text-sm font-bold text-slate-100 capitalize">
                {node.label}
              </span>
            </div>
            <RiskBadge level={node.riskLevel} score={node.riskScore} />
          </div>

          {/* Address Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                Cryptocurrency Address
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {node.chain}
              </span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800 text-xs text-slate-200 break-all select-all font-mono">
              {node.address}
            </div>
            <button
              onClick={handleCopy}
              className="mt-2 w-full py-1.5 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Address Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Address</span>
                </>
              )}
            </button>
          </div>

          {/* Flow Volumes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 mb-1">
                <ArrowDownLeft className="w-3 h-3" />
                <span>INBOUND VOLUME</span>
              </div>
              <div className="text-base font-bold text-slate-100">
                {formatUSD(node.inboundUSD)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1 text-[10px] text-red-400 mb-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>OUTBOUND VOLUME</span>
              </div>
              <div className="text-base font-bold text-slate-100">
                {formatUSD(node.outboundUSD)}
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> First Seen:
              </span>
              <span className="text-slate-200">{node.firstSeen}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Last Seen:
              </span>
              <span className="text-slate-200">{node.lastSeen}</span>
            </div>
          </div>

          {/* Detected Patterns */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-2">
              Behavioral Pattern Triggers
            </span>
            <div className="flex flex-wrap gap-1.5">
              {node.patterns.map((pat, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30"
                >
                  {pat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2">
        <button
          onClick={handlePreserveEvidence}
          className="flex-1 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20 transition-all font-mono"
        >
          <BookmarkPlus className="w-3.5 h-3.5" />
          <span>Preserve to Vault</span>
        </button>
        <button
          onClick={onClose}
          className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
