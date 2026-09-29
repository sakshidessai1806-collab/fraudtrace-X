import React, { useState } from 'react';
import { Copy, Check, Filter, Search, ArrowUpRight, ArrowDownLeft, ShieldAlert } from 'lucide-react';
import { Transaction } from '../types';
import { formatAddress, formatHash, formatUSD, copyToClipboard } from '../lib/utils';
import { RiskBadge } from './RiskBadge';
import { useInvestigation } from '../context/InvestigationContext';

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patternFilter, setPatternFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showToast } = useInvestigation();

  const handleCopy = (text: string, id: string) => {
    copyToClipboard(text);
    setCopiedId(id);
    showToast(`Copied ${formatAddress(text)} to clipboard`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesPattern = patternFilter === 'ALL' || tx.pattern.toLowerCase().includes(patternFilter.toLowerCase());
    const matchesSearch = 
      tx.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.fromAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.toAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.asset.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPattern && matchesSearch;
  });

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
      {/* Search & Filter Header */}
      <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Reconstructed On-Chain Ledger
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            {filteredTransactions.length} Verified Entries
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
          <div className="relative w-full max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hash or address..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={patternFilter}
            onChange={(e) => setPatternFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-300 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Patterns</option>
            <option value="Rapid Forward">Rapid Forward</option>
            <option value="Fan-Out">Fan-Out</option>
            <option value="Consolidation">Consolidation</option>
            <option value="Cross-Chain">Bridge</option>
            <option value="VASP Deposit">VASP Deposit</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-[10px] text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3">Timestamp (UTC)</th>
              <th className="py-3 px-3">Tx Hash</th>
              <th className="py-3 px-3">From</th>
              <th className="py-3 px-3">To</th>
              <th className="py-3 px-3">Asset</th>
              <th className="py-3 px-3">Amount</th>
              <th className="py-3 px-3">USD Estimate</th>
              <th className="py-3 px-3">Chain</th>
              <th className="py-3 px-3">Pattern</th>
              <th className="py-3 px-3">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredTransactions.map((tx, idx) => (
              <tr
                key={tx.id || idx}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap text-[11px]">
                  {tx.timestamp.replace(' UTC', '')}
                </td>
                <td className="py-2.5 px-3 font-semibold text-cyan-400 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span>{formatHash(tx.txHash, 6, 4)}</span>
                    <button
                      onClick={() => handleCopy(tx.txHash, `hash-${tx.id}`)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-slate-200 transition-opacity"
                      title="Copy Hash"
                    >
                      {copiedId === `hash-${tx.id}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span>{formatAddress(tx.fromAddress, 5, 4)}</span>
                    <button
                      onClick={() => handleCopy(tx.fromAddress, `from-${tx.id}`)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-slate-200 transition-opacity"
                    >
                      {copiedId === `from-${tx.id}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span>{formatAddress(tx.toAddress, 5, 4)}</span>
                    <button
                      onClick={() => handleCopy(tx.toAddress, `to-${tx.id}`)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-slate-200 transition-opacity"
                    >
                      {copiedId === `to-${tx.id}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-slate-300 font-bold">
                  {tx.asset}
                </td>
                <td className="py-2.5 px-3 text-slate-100 font-bold whitespace-nowrap">
                  {tx.amount.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold whitespace-nowrap">
                  {formatUSD(tx.amountUSD)}
                </td>
                <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] border border-slate-700">
                    {tx.chain}
                  </span>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {tx.pattern}
                  </span>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <RiskBadge level={tx.riskLevel} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
