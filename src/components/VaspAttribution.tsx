import React from 'react';
import { Building2, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import { VASPAttributionData } from '../types';
import { DEMO_VASP_X } from '../data/demoVasps';
import { VaspClusterView } from './VaspClusterView';

interface VaspAttributionProps {
  vaspData?: VASPAttributionData;
}

export const VaspAttribution: React.FC<VaspAttributionProps> = ({
  vaspData = DEMO_VASP_X
}) => {
  return (
    <div className="space-y-6">
      {/* Primary Attribution Card */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/25 relative overflow-hidden font-mono">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                VASP Attribution Intelligence
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Topological Cluster Mapping
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">
              Virtual Asset Service Provider Attribution
            </h2>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Investigative Lead — Not Proof of Ownership</span>
          </div>
        </div>

        {/* Big Banner with Likely VASP and Confidence */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
          <div className="md:col-span-6 p-5 rounded-xl bg-slate-950/70 border border-cyan-500/30 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">
              Likely Identified Exchange Destination
            </span>
            <div className="text-3xl font-extrabold text-cyan-400 mt-1 tracking-tight">
              {vaspData.vaspName}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Cluster: {vaspData.clusterTag}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {vaspData.clusterAddressCount} Co-Clustered Wallets
              </span>
            </div>
          </div>

          <div className="md:col-span-6 p-5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">
                  Attribution Confidence Score
                </span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                  {vaspData.attributionConfidence}%
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                HIGH CERTAINTY
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${vaspData.attributionConfidence}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Composite confidence across 5 observable transaction pattern metrics.
            </p>
          </div>
        </div>

        {/* "Why VASP-X?" Breakdown Section */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Why {vaspData.vaspId}? (Forensic Signal Breakdown)
            </h3>
            <span className="text-xs text-cyan-400">
              Deterministic Evidence Weights
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {vaspData.signals.map((sig, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">
                    {sig.name}
                  </span>
                  <span className="text-xs font-bold text-cyan-400">
                    {sig.score}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full"
                    style={{ width: `${sig.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {sig.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VASP Cluster Visual Map */}
      <VaspClusterView clusterWallets={vaspData.clusterWallets} />
    </div>
  );
};
