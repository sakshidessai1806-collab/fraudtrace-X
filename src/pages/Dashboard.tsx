import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderSearch,
  ShieldAlert,
  Building2,
  Split,
  BellRing,
  LockKeyhole,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  FilePlus2,
  Activity,
  AlertTriangle
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { KPICard } from '../components/KPICard';
import { RiskBadge } from '../components/RiskBadge';
import { useInvestigation } from '../context/InvestigationContext';
import { formatAddress } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { loadDemoInvestigation, complaints } = useInvestigation();

  const handleOpenDemoCase = () => {
    loadDemoInvestigation();
    navigate('/investigation');
  };

  const riskDistributionData = [
    { name: 'Critical', value: 17, color: '#ef4444' },
    { name: 'High', value: 34, color: '#f59e0b' },
    { name: 'Medium', value: 28, color: '#eab308' },
    { name: 'Low', value: 12, color: '#10b981' }
  ];

  const liveFeed = [
    {
      time: '09:42 UTC',
      category: 'Wallet Flagged',
      detail: 'High velocity forwarding detected (2m 14s latency)',
      caseId: 'CASE-2026-1042',
      severity: 'CRITICAL' as const
    },
    {
      time: '09:37 UTC',
      category: 'Cross-Chain Movement',
      detail: 'Bridge-X transfer: Ethereum → TRON (41,200 USDT)',
      caseId: 'CASE-2026-1042',
      severity: 'CRITICAL' as const
    },
    {
      time: '09:31 UTC',
      category: 'VASP Proximity',
      detail: 'Funds approached Exchange Deposit Cluster VX-104 (VASP-X)',
      caseId: 'CASE-2026-1042',
      severity: 'HIGH' as const
    },
    {
      time: '09:25 UTC',
      category: 'Layering Pattern',
      detail: '3-hop serial forwarding chain identified with structured amounts',
      caseId: 'CASE-2026-1042',
      severity: 'HIGH' as const
    }
  ];

  const recentCases = [
    {
      caseId: 'CASE-2026-1042',
      complaintType: 'Investment Fraud',
      wallet: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
      chain: 'Ethereum',
      riskScore: 92,
      riskLevel: 'CRITICAL' as const,
      likelyVasp: 'VASP-X',
      status: 'Investigating'
    },
    {
      caseId: 'CASE-2026-1039',
      complaintType: 'Task Scam',
      wallet: 'TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7',
      chain: 'TRON',
      riskScore: 87,
      riskLevel: 'CRITICAL' as const,
      likelyVasp: 'VASP-Y',
      status: 'Evidence Review'
    },
    {
      caseId: 'CASE-2026-1034',
      complaintType: 'Phishing',
      wallet: '0x1928bF9023cBa901928374a58192038172039481',
      chain: 'Ethereum',
      riskScore: 74,
      riskLevel: 'HIGH' as const,
      likelyVasp: 'Pending Clust.',
      status: 'Investigating'
    },
    {
      caseId: 'CASE-2026-1028',
      complaintType: 'Ransomware',
      wallet: 'bc1qa98127390a18274092b3c01928374a58192038',
      chain: 'Bitcoin',
      riskScore: 68,
      riskLevel: 'MEDIUM' as const,
      likelyVasp: 'VASP-Z',
      status: 'Ingested'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Header */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/25 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-semibold">
                I4C CIS Intelligence Desk
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                SIH26183
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Crypto Fraud Intelligence Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real-time automated blockchain investigation, Fraud DNA attribution, and VASP exit tracing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/complaints')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <FilePlus2 className="w-4 h-4 text-slate-400" />
              <span>Ingest Complaint</span>
            </button>

            <button
              onClick={handleOpenDemoCase}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Load Primary Demo Case (CASE-2026-1042)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
        <KPICard
          title="Active Cases"
          value="24"
          subtitle="4 Under Active Sweep"
          icon={FolderSearch}
          trend="+3 Today"
          trendType="positive"
          variant="cyan"
          onClick={() => navigate('/investigation')}
        />
        <KPICard
          title="High Risk Wallets"
          value="17"
          subtitle="Score > 85 Flagged"
          icon={ShieldAlert}
          trend="Critical Signals"
          trendType="alert"
          variant="red"
          onClick={() => navigate('/risk')}
        />
        <KPICard
          title="VASP Exits Detected"
          value="8"
          subtitle="Off-Ramp Clusters"
          icon={Building2}
          trend="87% Max Conf"
          trendType="positive"
          variant="cyan"
          onClick={() => navigate('/vasp')}
        />
        <KPICard
          title="Cross-Chain Hops"
          value="31"
          subtitle="Bridges Monitored"
          icon={Split}
          trend="Eth → TRON"
          trendType="neutral"
          variant="purple"
          onClick={() => navigate('/cross-chain')}
        />
        <KPICard
          title="Alerts Today"
          value="12"
          subtitle="3 Pending Review"
          icon={BellRing}
          trend="Active Queue"
          trendType="alert"
          variant="amber"
          onClick={() => navigate('/alerts')}
        />
        <KPICard
          title="Evidence Items"
          value="146"
          subtitle="SHA-256 Vaulted"
          icon={LockKeyhole}
          trend="Immutable Hash"
          trendType="positive"
          variant="default"
          onClick={() => navigate('/evidence')}
        />
      </div>

      {/* Split Section: Live Feed + Risk Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Investigation Feed (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Live Investigation Feed
              </h3>
            </div>
            <span className="text-[10px] text-slate-500">
              Auto-refreshing Stream
            </span>
          </div>

          <div className="space-y-3">
            {liveFeed.map((item, idx) => (
              <div
                key={idx}
                onClick={handleOpenDemoCase}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all cursor-pointer flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 font-bold shrink-0">
                    {item.time}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-cyan-400">
                        ({item.caseId})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <RiskBadge level={item.severity} size="sm" />
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 hover:text-cyan-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution Chart (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 font-mono flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Risk Profile Distribution
            </h3>
            <span className="text-[10px] text-slate-400">91 Monitored Entities</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#070b16" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090e1c',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-slate-300 text-xs font-mono">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Critical Severity Ratio:</span>
            <strong className="text-red-400">18.7%</strong>
          </div>
        </div>
      </div>

      {/* Recent Investigations Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Recent Priority Investigations
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Active Docket
            </span>
          </div>

          <button
            onClick={() => navigate('/investigation')}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View Complete Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[10px] text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Complaint</th>
                <th className="py-3 px-4">Target Wallet</th>
                <th className="py-3 px-4">Chain</th>
                <th className="py-3 px-4">Risk</th>
                <th className="py-3 px-4">Likely VASP</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentCases.map((c) => (
                <tr
                  key={c.caseId}
                  onClick={handleOpenDemoCase}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">
                    {c.caseId}
                  </td>
                  <td className="py-3 px-4 text-slate-200">
                    {c.complaintType}
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-semibold">
                    {formatAddress(c.wallet, 6, 4)}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] border border-slate-700">
                      {c.chain}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <RiskBadge level={c.riskLevel} score={c.riskScore} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">
                    {c.likelyVasp}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDemoCase();
                      }}
                      className="px-2.5 py-1 text-xs rounded bg-cyan-600/80 hover:bg-cyan-500 text-white font-semibold transition-colors"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
