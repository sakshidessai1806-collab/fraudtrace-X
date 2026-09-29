import React from 'react';
import { Split, ArrowRight, ShieldAlert, Layers, ExternalLink } from 'lucide-react';
import { CrossChainTimeline } from '../components/CrossChainTimeline';
import { useInvestigation } from '../context/InvestigationContext';

export const CrossChain: React.FC = () => {
  const { investigation } = useInvestigation();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
            <Split className="w-4 h-4 text-purple-400" />
            Interoperability Protocol Analysis
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Case: {investigation.caseId}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          Cross-Chain Movement Intelligence
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Detection of cross-network asset locks, bridge relayer minting, and chain hopping obfuscation.
        </p>
      </div>

      {/* Visual Sequence Ribbon */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="font-bold text-slate-100">Ethereum Network</span>
        </div>
        <ArrowRight className="w-4 h-4 text-purple-400" />
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span className="font-bold text-purple-300">Bridge-X Protocol</span>
        </div>
        <ArrowRight className="w-4 h-4 text-purple-400" />
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="font-bold text-slate-100">TRON Network</span>
        </div>
        <ArrowRight className="w-4 h-4 text-purple-400" />
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="font-bold text-emerald-300">VASP-X Cluster VX-104</span>
        </div>
      </div>

      {/* Cross Chain Timeline Component */}
      <CrossChainTimeline crossChain={investigation.crossChain} />
    </div>
  );
};
