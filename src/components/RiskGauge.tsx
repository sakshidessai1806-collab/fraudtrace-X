import React from 'react';
import { ShieldAlert, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { RiskBadge } from './RiskBadge';
import { RiskSignal, RiskLevel } from '../types';

interface RiskGaugeProps {
  score: number; // 92
  attributionConfidence: number; // 87
  riskLevel: RiskLevel | 'NEUTRAL';
  signals?: RiskSignal[];
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score = 92,
  attributionConfidence = 87,
  riskLevel = 'CRITICAL',
  signals = []
}) => {
  // SVG calculation for circular arc gauge
  const radius = 75;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const defaultExplanation = [
    { label: 'Rapid Forwarding', score: 21, max: 25, reason: '100% forwarded in 2m 14s' },
    { label: 'Fan-Out Pattern', score: 17, max: 20, reason: '2-branch intermediate split' },
    { label: 'Consolidation Behavior', score: 15, max: 15, reason: 'Recombined into 0x33A0...aF8120' },
    { label: 'Cross-Chain Movement', score: 16, max: 20, reason: 'Traversed Bridge-X to TRON' },
    { label: 'VASP Proximity', score: 18, max: 20, reason: 'Direct deposit into VASP-X Cluster' },
    { label: 'Address Clustering', score: 5, max: 10, reason: 'Shared gas funding parent' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-red-500/25 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Forensic Risk Assessment
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
              Heuristic Classifier v2.4
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1 flex items-center gap-2">
            Automated Threat & Vulnerability Index
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <RiskBadge level={riskLevel} size="lg" />
        </div>
      </div>

      {/* Meter & Confidence split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
        {/* Circular SVG Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg height={180} width={180} className="rotate-[-90deg]">
              {/* Track circle */}
              <circle
                stroke="#1e293b"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={90}
                cy={90}
              />
              {/* Value circle */}
              <circle
                stroke="#ef4444"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 1.5s ease-in-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={90}
                cy={90}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black font-mono text-red-400 tracking-tight">
                {score}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                / 100
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 mt-1 rounded bg-red-500/20 text-red-300 font-bold">
                {riskLevel}
              </span>
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs font-medium text-slate-300">Composite Risk Score</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Multi-factor heuristic evaluation</p>
          </div>
        </div>

        {/* Confidence vs Risk Score distinction card */}
        <div className="md:col-span-8 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <span>VASP Attribution Confidence</span>
                  <span className="group relative cursor-pointer" title="Attribution confidence measures statistical correlation with exchange clusters, distinct from behavioral fraud severity.">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-cyan-400 mt-1">
                  {attributionConfidence}%
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  HIGH ATTRIBUTION CONFIDENCE
                </span>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">
                  Linked to VASP-X Cluster VX-104
                </p>
              </div>
            </div>

            {/* Crucial legal / analytical distinction notice */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed font-mono">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">Critical Distinction: </strong>
                Risk Score (92) evaluates suspicious transaction patterns; Attribution Confidence (87%) measures certainty of destination exchange infrastructure. They are calculated independently.
              </span>
            </div>
          </div>

          {/* Quick summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Velocity</span>
              <p className="text-xs font-bold text-red-400 font-mono mt-0.5">2m 14s (Critical)</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Intermediaries</span>
              <p className="text-xs font-bold text-amber-400 font-mono mt-0.5">4 Wallets (3 Hops)</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Cross-Chain</span>
              <p className="text-xs font-bold text-purple-400 font-mono mt-0.5">Bridge-X / TRON</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Off-Ramp</span>
              <p className="text-xs font-bold text-cyan-400 font-mono mt-0.5">VASP-X Cluster</p>
            </div>
          </div>
        </div>
      </div>

      {/* "Why was this wallet flagged?" Explanation Cards */}
      <div className="mt-6 pt-5 border-t border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
            <span>Why was this wallet flagged?</span>
            <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Explainable Risk Breakdown
            </span>
          </h3>
          <span className="text-xs font-mono font-bold text-red-400">
            Total Weighted Contribution: +{score} / 100
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {defaultExplanation.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">
                  {item.label}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30">
                  +{item.score}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(item.score / item.max) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
