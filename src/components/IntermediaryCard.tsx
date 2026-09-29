import React from 'react';
import { Layers, Copy, Check, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { formatAddress, copyToClipboard } from '../lib/utils';
import { RiskBadge } from './RiskBadge';
import { useInvestigation } from '../context/InvestigationContext';

export const IntermediaryCard: React.FC = () => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const { showToast, setSelectedNode } = useInvestigation();

  const intermediaries = [
    {
      address: '0x22A7F9310D8e41aBc719D33b8E52A4F1',
      hop: 'Hop 1',
      received: '42,500 USDT',
      forwarded: '41,900 USDT',
      delay: '2m 14s',
      pattern: 'Rapid Forwarding & Fan-Out',
      risk: 'HIGH' as const,
      riskScore: 84
    },
    {
      address: '0x91F562E34Caa8891cD82A2E6319FbB44',
      hop: 'Hop 2',
      received: '22,000 USDT',
      forwarded: '21,850 USDT',
      delay: '4m 51s',
      pattern: 'Structured Splitting (Branch 1)',
      risk: 'HIGH' as const,
      riskScore: 78
    },
    {
      address: '0x44C91901aBd4F82001e912440bA8812c',
      hop: 'Hop 2',
      received: '19,900 USDT',
      forwarded: '19,800 USDT',
      delay: '5m 38s',
      pattern: 'Structured Splitting (Branch 2)',
      risk: 'HIGH' as const,
      riskScore: 76
    },
    {
      address: '0x33A0F8114C9291bBcA1992019488aF8120',
      hop: 'Hop 3',
      received: '41,500 USDT',
      forwarded: '41,200 USDT',
      delay: '6m 45s',
      pattern: 'Convergent Consolidation',
      risk: 'CRITICAL' as const,
      riskScore: 94
    }
  ];

  const handleCopy = (addr: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(addr);
    setCopiedId(id);
    showToast(`Copied ${formatAddress(addr)}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInspect = (item: typeof intermediaries[0]) => {
    setSelectedNode({
      label: `Intermediary (${item.hop})`,
      role: 'intermediary',
      address: item.address,
      chain: 'Ethereum',
      riskScore: item.riskScore,
      riskLevel: item.risk,
      inboundUSD: 42000,
      outboundUSD: 41000,
      patterns: [item.pattern],
      firstSeen: '2026-09-25 13:47 UTC',
      lastSeen: '2026-09-25 14:11 UTC'
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-amber-500/25 relative overflow-hidden font-mono">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              Intermediary Laundering Signals
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {intermediaries.length} Layering Wallets Identified
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Layering & Forwarding Chain Detection
          </h2>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">Fan-In</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">Fan-Out</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">Rapid Forwarding</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">Consolidation</span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {intermediaries.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleInspect(item)}
            className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900/60 transition-all cursor-pointer flex flex-wrap items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3 min-w-[220px]">
              <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-bold text-[11px] border border-slate-700">
                {item.hop}
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-200">{formatAddress(item.address)}</span>
                  <button
                    onClick={(e) => handleCopy(item.address, `inter-${idx}`, e)}
                    className="p-0.5 text-slate-400 hover:text-slate-200"
                  >
                    {copiedId === `inter-${idx}` ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Pattern: {item.pattern}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-[10px] text-slate-500 block">Received / Forwarded</span>
                <span className="text-slate-300 font-semibold">
                  {item.received} → <span className="text-emerald-400">{item.forwarded}</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block">Transit Delay</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.delay}
                </span>
              </div>

              <div>
                <RiskBadge level={item.risk} score={item.riskScore} size="sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
