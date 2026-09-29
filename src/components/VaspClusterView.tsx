import React from 'react';
import { Network, Building2, Copy, Check, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatAddress, formatUSD, copyToClipboard } from '../lib/utils';
import { useInvestigation } from '../context/InvestigationContext';

interface ClusterWallet {
  address: string;
  role: 'Deposit Wallet 01' | 'Deposit Wallet 02' | 'Deposit Wallet 03' | 'Hot Wallet' | 'Consolidation Wallet' | 'Treasury';
  balanceUSD: number;
  activityTag: string;
}

interface VaspClusterViewProps {
  clusterWallets: ClusterWallet[];
}

export const VaspClusterView: React.FC<VaspClusterViewProps> = ({ clusterWallets }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const { setSelectedNode, showToast } = useInvestigation();

  const handleCopy = (address: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(address);
    setCopiedId(id);
    showToast(`Copied ${formatAddress(address)}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectWallet = (wallet: ClusterWallet) => {
    setSelectedNode({
      label: wallet.role,
      role: 'vasp',
      address: wallet.address,
      chain: 'TRON',
      riskScore: 70,
      riskLevel: 'HIGH',
      inboundUSD: wallet.balanceUSD,
      outboundUSD: wallet.balanceUSD * 0.95,
      patterns: [wallet.activityTag, 'VASP-X Cluster Infrastructure'],
      firstSeen: '2026-04-12',
      lastSeen: '2026-09-25 14:39 UTC'
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <Network className="w-4 h-4 text-emerald-400" />
              On-Chain Cluster Topology
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 mt-1">
            VASP-X Cluster (VX-104) Subgraph
          </h3>
        </div>
        <div className="text-xs text-slate-400 italic">
          &quot;Cluster inferred from observable transaction relationships.&quot;
        </div>
      </div>

      {/* Visual Cluster Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Central Master Node (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-950/80 border border-cyan-500/40 text-center relative overflow-hidden shadow-xl shadow-cyan-500/10">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3 shadow-inner">
            <Building2 className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            CENTRAL REPOSITORY NODE
          </span>
          <h4 className="text-base font-bold text-slate-100 mt-2">
            VASP-X Master Hot Wallet
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Cluster Tag: VX-104-MASTER
          </p>
          <div className="mt-3 p-2 bg-slate-900/80 rounded-lg text-xs font-bold text-emerald-400 border border-slate-800">
            Total Reserve Balance: $18,450,920
          </div>
        </div>

        {/* Connected Child Nodes (8 cols) */}
        <div className="lg:col-span-8 space-y-2.5">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
            Associated Ingestion Proxies & Sweep Nodes
          </span>

          <div className="space-y-2">
            {clusterWallets.map((wallet, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectWallet(wallet)}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all cursor-pointer flex flex-wrap items-center justify-between gap-3 text-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {wallet.role}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        ({formatAddress(wallet.address)})
                      </span>
                      <button
                        onClick={(e) => handleCopy(wallet.address, `cl-${idx}`, e)}
                        className="p-0.5 text-slate-500 hover:text-slate-200"
                        title="Copy address"
                      >
                        {copiedId === `cl-${idx}` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {wallet.activityTag}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-300 font-bold">
                    {wallet.balanceUSD > 0 ? formatUSD(wallet.balanceUSD) : '0 USD (Swept)'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
