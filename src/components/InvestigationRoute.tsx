import React from 'react';
import { 
  ArrowDown, 
  Copy, 
  ExternalLink, 
  Check, 
  ShieldAlert, 
  GitCommit, 
  Layers, 
  Split, 
  Building2, 
  Sparkles,
  SearchCheck,
  Clock
} from 'lucide-react';
import { InvestigationRouteHop } from '../types';
import { formatAddress, formatHash, formatUSD, copyToClipboard } from '../lib/utils';
import { useInvestigation } from '../context/InvestigationContext';

interface InvestigationRouteProps {
  hops: InvestigationRouteHop[];
  onSelectHop?: (hop: InvestigationRouteHop) => void;
}

export const InvestigationRoute: React.FC<InvestigationRouteProps> = ({
  hops,
  onSelectHop
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const { setSelectedNode, showToast, isReplayingFlow, replayStep } = useInvestigation();

  const handleCopy = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(text);
    setCopiedId(id);
    showToast(`Copied ${formatAddress(text)} to clipboard`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleHopClick = (hop: InvestigationRouteHop) => {
    if (onSelectHop) {
      onSelectHop(hop);
    }
    // Set selected node for drawer
    setSelectedNode({
      label: `${hop.fromRole} → ${hop.toRole}`,
      role: hop.hopIndex === 0 ? 'suspect' : hop.hopIndex === 4 ? 'bridge' : hop.hopIndex >= 6 ? 'vasp' : 'intermediary',
      address: hop.walletAddress,
      chain: hop.chain,
      riskScore: hop.confidence >= 90 ? 92 : 75,
      riskLevel: hop.confidence >= 90 ? 'CRITICAL' : 'HIGH',
      inboundUSD: hop.amount,
      outboundUSD: hop.amount * 0.98,
      patterns: [hop.patternDetected],
      firstSeen: hop.timestamp,
      lastSeen: hop.timestamp
    });
  };

  const getRoleIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShieldAlert className="w-4 h-4 text-orange-400" />;
      case 1:
      case 2:
      case 3:
        return <Layers className="w-4 h-4 text-amber-400" />;
      case 4:
        return <Split className="w-4 h-4 text-purple-400" />;
      case 5:
        return <GitCommit className="w-4 h-4 text-cyan-400" />;
      case 6:
      case 7:
        return <Building2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-cyan-500/25 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <SearchCheck className="w-4 h-4 text-cyan-400" />
              Unique Differentiator
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Heuristic Path Optimization
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Explainable Investigation Route
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithmic distillation of the most actionable money trail from Victim to Exchange Exit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
            {hops.length} Sequential Investigation Hops
          </span>
        </div>
      </div>

      {/* Sequential Route Flow */}
      <div className="mt-6 space-y-4">
        {hops.map((hop, idx) => {
          const isHighlighted = isReplayingFlow && replayStep === idx;
          const isPassed = isReplayingFlow && replayStep > idx;

          return (
            <React.Fragment key={hop.hopIndex}>
              {/* Hop Card */}
              <div
                onClick={() => handleHopClick(hop)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isHighlighted
                    ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/20 scale-[1.01]'
                    : isPassed
                    ? 'bg-slate-950/80 border-cyan-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60'
                }`}
              >
                {/* Hop Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                      {getRoleIcon(hop.hopIndex)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                          HOP 0{hop.hopIndex}
                        </span>
                        <span className="text-xs font-bold text-slate-100">
                          {hop.fromRole} → {hop.toRole}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {hop.chain}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                      {hop.confidence}% Confidence
                    </span>
                  </div>
                </div>

                {/* Hop Body Details */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                  {/* Address */}
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Target Wallet</span>
                      <span className="text-slate-200 font-semibold">
                        {formatAddress(hop.walletAddress)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(hop.walletAddress, `addr-${idx}`, e)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy full address"
                    >
                      {copiedId === `addr-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Volume & Asset */}
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Observed Amount</span>
                    <span className="text-emerald-400 font-bold">
                      {hop.amount.toLocaleString()} {hop.asset}
                    </span>
                  </div>

                  {/* Timestamp */}
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Block Timestamp</span>
                    <span className="text-slate-300 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {hop.timestamp.replace(' UTC', '')}
                    </span>
                  </div>

                  {/* Tx Hash */}
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Transaction Hash</span>
                      <span className="text-slate-300 font-semibold">
                        {formatHash(hop.txHash)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(hop.txHash, `tx-${idx}`, e)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy full transaction hash"
                    >
                      {copiedId === `tx-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Pattern & Explainable Reason */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                      Pattern: {hop.patternDetected}
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs italic flex items-center gap-1.5">
                    <span className="font-semibold text-slate-300 not-italic text-[11px] font-mono">
                      Relevance:
                    </span>
                    <span>{hop.reasonForRelevance}</span>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                    <span>Evidence Ref: {hop.evidenceId}</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </div>
                </div>
              </div>

              {/* Connecting arrow between hops */}
              {idx < hops.length - 1 && (
                <div className="flex justify-center -my-1 py-1">
                  <div className="p-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400/80 shadow-sm animate-pulse">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
