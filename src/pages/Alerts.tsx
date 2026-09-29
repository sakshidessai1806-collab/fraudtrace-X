import React, { useState } from 'react';
import { BellRing, Sliders, CheckCircle2, ShieldAlert, Zap, Filter, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { AlertCard } from '../components/AlertCard';
import { useInvestigation } from '../context/InvestigationContext';

export const Alerts: React.FC = () => {
  const { alerts, alertRules, toggleAlertRule, updateAlertRuleThreshold, showToast } = useInvestigation();
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredAlerts = alerts.filter(a => 
    filterSeverity === 'ALL' || a.severity === filterSeverity
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
            <BellRing className="w-4 h-4 text-amber-400" />
            Automated Detection Signals
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Real-Time Stream
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          Automated Investigation Alerts & Rule Engine
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Proactive event dispatch triggered by rapid forwarding, high fan-out layering, and VASP proximity.
        </p>
      </div>

      {/* Grid: Alert Rule Engine (Configurable) + Live Alert Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Alert Rule Engine Panel (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Configurable Alert Rules
              </h3>
            </div>
            <span className="text-[10px] text-slate-500">Threshold Engine</span>
          </div>

          <div className="space-y-3.5">
            {alertRules.map((rule) => (
              <div
                key={rule.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">
                    {rule.name}
                  </span>
                  <button
                    onClick={() => toggleAlertRule(rule.id)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {rule.enabled ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        ENABLED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px]">
                        DISABLED
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 mt-1 font-sans">
                  {rule.description}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {rule.thresholdLabel}:
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={rule.currentValue}
                      onChange={(e) => updateAlertRuleThreshold(rule.id, e.target.value)}
                      className="w-20 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[11px] text-cyan-300 font-mono text-center focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-[10px] text-slate-500">{rule.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider">
                Active Alert Queue ({filteredAlerts.length})
              </h3>
            </div>

            {/* Severity Filters */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    filterSeverity === sev
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
