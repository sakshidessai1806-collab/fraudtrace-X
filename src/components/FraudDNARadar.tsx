import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Dna, ShieldAlert, Zap, Layers, Split, Building2, Merge, AlertCircle } from 'lucide-react';
import { FraudDNADimensions } from '../types';

interface FraudDNARadarProps {
  dimensions?: FraudDNADimensions;
  summarySignals?: {
    type: 'HIGH VELOCITY' | 'LAYERING SIGNAL' | 'CROSS-CHAIN SIGNAL' | 'EXIT PROXIMITY' | 'CONSOLIDATION SIGNAL';
    title: string;
    description: string;
  }[];
}

export const FraudDNARadar: React.FC<FraudDNARadarProps> = ({
  dimensions = {
    fanInIntensity: 42,
    fanOutIntensity: 88,
    transactionVelocity: 96,
    walletAge: 14,
    consolidationBehavior: 85,
    crossChainActivity: 92,
    exchangeProximity: 94,
    rapidForwarding: 98,
    addressReuse: 18,
    burstActivity: 86
  },
  summarySignals = [
    {
      type: 'HIGH VELOCITY',
      title: 'HIGH VELOCITY',
      description: 'Funds forwarded within minutes of receipt (2m 14s latency, 3.8σ above baseline).'
    },
    {
      type: 'LAYERING SIGNAL',
      title: 'LAYERING SIGNAL',
      description: 'Funds split across multiple intermediary wallets in coordinated 2-layer fan-out.'
    },
    {
      type: 'CROSS-CHAIN SIGNAL',
      title: 'CROSS-CHAIN SIGNAL',
      description: 'Observed movement through Bridge-X protocol bridging Ethereum to TRON.'
    },
    {
      type: 'EXIT PROXIMITY',
      title: 'EXIT PROXIMITY',
      description: 'Funds eventually approach an identified VASP-X exchange deposit cluster.'
    },
    {
      type: 'CONSOLIDATION SIGNAL',
      title: 'CONSOLIDATION SIGNAL',
      description: 'Multiple wallets consolidate into a common downstream wallet prior to bridge lock.'
    }
  ]
}) => {
  const chartData = [
    { subject: 'Fan-In', value: dimensions.fanInIntensity, fullMark: 100 },
    { subject: 'Fan-Out', value: dimensions.fanOutIntensity, fullMark: 100 },
    { subject: 'Tx Velocity', value: dimensions.transactionVelocity, fullMark: 100 },
    { subject: 'Wallet Age', value: dimensions.walletAge, fullMark: 100 },
    { subject: 'Consolidation', value: dimensions.consolidationBehavior, fullMark: 100 },
    { subject: 'Cross-Chain', value: dimensions.crossChainActivity, fullMark: 100 },
    { subject: 'Exchange Prox.', value: dimensions.exchangeProximity, fullMark: 100 },
    { subject: 'Rapid Fwd', value: dimensions.rapidForwarding, fullMark: 100 },
    { subject: 'Address Reuse', value: dimensions.addressReuse, fullMark: 100 },
    { subject: 'Burst Activity', value: dimensions.burstActivity, fullMark: 100 }
  ];

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'HIGH VELOCITY':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'LAYERING SIGNAL':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'CROSS-CHAIN SIGNAL':
        return <Split className="w-4 h-4 text-purple-400" />;
      case 'EXIT PROXIMITY':
        return <Building2 className="w-4 h-4 text-emerald-400" />;
      case 'CONSOLIDATION SIGNAL':
        return <Merge className="w-4 h-4 text-red-400" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getSignalBadgeColor = (type: string) => {
    switch (type) {
      case 'HIGH VELOCITY':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
      case 'LAYERING SIGNAL':
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300';
      case 'CROSS-CHAIN SIGNAL':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-300';
      case 'EXIT PROXIMITY':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
      case 'CONSOLIDATION SIGNAL':
        return 'border-red-500/30 bg-red-500/10 text-red-300';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-cyan-500/25 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Dna className="w-4 h-4 text-cyan-400" />
              Unique Forensic Fingerprint
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              10-Vector Behavioral Analysis
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Fraud DNA & Behavioral Signature
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-slate-400">
            Target Fingerprint Hash: <span className="text-cyan-400 font-mono">0x7A91...91F2</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Summary Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Radar Chart (5 cols) */}
        <div className="lg:col-span-6 h-80 w-full relative flex items-center justify-center p-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="#334155" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                stroke="#475569"
                tick={{ fill: '#64748b', fontSize: 9 }}
              />
              <Radar
                name="Behavioral Intensity"
                dataKey="value"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.45}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090e1c',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#e2e8f0'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Fraud DNA Summary Cards (7 cols) */}
        <div className="lg:col-span-6 space-y-2.5">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Fraud DNA Summary
            </h3>
            <span className="text-[11px] font-mono text-cyan-400">
              5 High-Confidence Behavioral Signals
            </span>
          </div>

          <div className="space-y-2">
            {summarySignals.map((sig, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                  {getSignalIcon(sig.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getSignalBadgeColor(sig.type)}`}>
                      {sig.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      SIG-0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 font-mono leading-relaxed">
                    {sig.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory & Investigative Disclaimer */}
      <div className="mt-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400 font-mono">
        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Analytical Disclaimer: </strong>
          Risk indicators are analytical signals and do not independently establish ownership, criminal intent, or guilt. Signals must be corroborated through judicial warrants and exchange KYC subpoenas.
        </p>
      </div>
    </div>
  );
};
