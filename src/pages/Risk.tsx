import React from 'react';
import { ShieldAlert, Dna, Info, AlertTriangle, Cpu, Layers } from 'lucide-react';
import { RiskGauge } from '../components/RiskGauge';
import { FraudDNARadar } from '../components/FraudDNARadar';
import { useInvestigation } from '../context/InvestigationContext';
import { RISK_WEIGHTS } from '../lib/riskEngine';

export const Risk: React.FC = () => {
  const { investigation } = useInvestigation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Threat Quantification Model
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
            Case: {investigation.caseId}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          Risk Engine & Behavioral Fraud DNA
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Explainable heuristic scoring and multi-dimensional behavioral signature mapping for suspicious wallets.
        </p>
      </div>

      {/* Model Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-start gap-3 font-mono text-xs">
        <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-cyan-300 font-bold block mb-0.5">
            PROTOTYPE RISK ENGINE ARCHITECTURE
          </span>
          <p className="text-slate-400 leading-relaxed font-sans">
            Signals are weighted heuristics for demonstration. The scoring function evaluates deterministic blockchain observables (velocity, fan-out, bridge transit, and cluster proximity). Weights are transparently calibrated for cyber-crime investigation workflows.
          </p>
        </div>
      </div>

      {/* Risk Gauge with Breakdown */}
      <RiskGauge
        score={investigation.riskScore}
        attributionConfidence={investigation.attributionConfidence}
        riskLevel={investigation.riskLevel}
        signals={investigation.riskSignals}
      />

      {/* Fraud DNA Radar */}
      <FraudDNARadar
        dimensions={investigation.fraudDNA}
        summarySignals={investigation.dnaSummary}
      />

      {/* Heuristic Weight Configuration Transparency Panel */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 font-mono">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Heuristic Weight Configuration Matrix (Normalized to 100)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {Object.entries(RISK_WEIGHTS).map(([key, weight]) => (
            <div key={key} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <div className="text-xl font-bold text-slate-200 mt-1">
                {weight} <span className="text-xs text-slate-500 font-normal">pts</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(weight / 25) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
