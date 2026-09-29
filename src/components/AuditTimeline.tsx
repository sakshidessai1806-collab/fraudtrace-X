import React from 'react';
import { Clock, ShieldCheck, AlertCircle, CheckCircle2, UserCheck, Cpu, Terminal } from 'lucide-react';
import { AuditEvent } from '../types';

interface AuditTimelineProps {
  events: AuditEvent[];
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ events }) => {
  const getActorIcon = (actor: string) => {
    switch (actor) {
      case 'LEA Analyst':
        return <UserCheck className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Analytics Engine':
        return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
      case 'NCRP Integration Adapter':
        return <Terminal className="w-3.5 h-3.5 text-amber-400" />;
      case 'System':
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ALERT':
        return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'WARNING':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'SUCCESS':
      default:
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              Cryptographic Chain of Custody
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 mt-1">
            Forensic Audit & Action Timeline
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Total Recorded Events: {events.length}
        </span>
      </div>

      <div className="mt-6 relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
        {events.map((evt, idx) => (
          <div key={evt.id || idx} className="relative group">
            {/* Timeline bullet */}
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-slate-900 border border-slate-800">
                    {getActorIcon(evt.actor)}
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    {evt.action}
                  </span>
                  <span className="text-[10px] text-slate-400 px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                    Actor: {evt.actor}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${getStatusColor(evt.status)}`}>
                    {evt.status}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {evt.timestamp.replace(' UTC', '')}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-300 font-sans leading-relaxed">
                {evt.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
