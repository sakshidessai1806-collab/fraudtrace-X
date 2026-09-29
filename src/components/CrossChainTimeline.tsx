import React from 'react';
import { Split, ArrowRight, ShieldAlert, CheckCircle2, Clock, Info, ExternalLink } from 'lucide-react';
import { CrossChainHop } from '../types';
import { formatAddress, formatHash } from '../lib/utils';

interface CrossChainTimelineProps {
  crossChain?: CrossChainHop;
}

export const CrossChainTimeline: React.FC<CrossChainTimelineProps> = ({
  crossChain = {
    id: 'CCH-1042',
    sourceChain: 'Ethereum',
    destinationChain: 'TRON',
    bridgeName: 'Bridge-X Protocol',
    bridgeContract: '0x71092a09B829c9182C01984bbAa01934981E2911',
    bridgeTxHash: '0xbb81920381720394817203948172039481720394817203948172039481720394',
    destinationTxHash: '8491a0c81923e01928374a91827390a18274092b3c01928374a5819203817203',
    timestamp: '2026-09-25 14:11:30 - 14:19:50 UTC',
    sourceAmount: '41,200 USDT (ERC-20)',
    destinationAmount: '41,050 USDT (TRC-20)',
    observedValueINR: '₹35.2 Lakh',
    confidence: 84,
    status: 'COMPLETED',
    delayMinutes: 8.3
  }
}) => {
  return (
    <div className="space-y-6 font-mono">
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 glass-panel">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Source Chain</span>
          <div className="text-xl font-bold text-slate-100 mt-1 flex items-center gap-2">
            <span>{crossChain.sourceChain}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">ERC-20</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-sans">Lock in Smart Contract</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/30 glass-panel">
          <span className="text-[10px] text-purple-400 uppercase tracking-wider block">Bridge Detected</span>
          <div className="text-xl font-bold text-purple-300 mt-1">
            {crossChain.bridgeName}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Contract: {formatAddress(crossChain.bridgeContract)}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 glass-panel">
          <span className="text-[10px] text-cyan-400 uppercase tracking-wider block">Destination Chain</span>
          <div className="text-xl font-bold text-cyan-300 mt-1 flex items-center gap-2">
            <span>{crossChain.destinationChain}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400">TRC-20</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-sans">Mint/Release to TQ8d...4Kp</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 glass-panel">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider block">Observed Value</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300">84% Conf</span>
          </div>
          <div className="text-xl font-bold text-emerald-300 mt-1">
            {crossChain.observedValueINR}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Equivalent to $41,200 USD</p>
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-6 flex items-center gap-2">
          <span>Bridge Relayer Execution Flow</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-normal">
            Transit Duration: ~8m 18s
          </span>
        </h3>

        <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
          {/* Step 1: Lock on Ethereum */}
          <div className="relative group">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-[#080d1a]" />
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-purple-400">
                  Step 1: Liquidity Lock Event (Ethereum)
                </span>
                <span className="text-[10px] text-slate-400">14:11:30 UTC</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                41,200 USDT deposited from Consolidation Wallet into Bridge-X smart contract.
              </p>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                <span>Source Tx: {formatHash(crossChain.bridgeTxHash)}</span>
                <span className="text-emerald-400">● 12 Confirmations</span>
              </div>
            </div>
          </div>

          {/* Step 2: Off-chain Validator Attestation */}
          <div className="relative group">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[#080d1a]" />
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-cyan-400">
                  Step 2: Bridge Relayer Multi-Sig Attestation
                </span>
                <span className="text-[10px] text-slate-400">14:15:40 UTC</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                3 of 5 authorized bridge validators signed state proof verifying Ethereum lock.
              </p>
            </div>
          </div>

          {/* Step 3: Mint on TRON */}
          <div className="relative group">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#080d1a]" />
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-400">
                  Step 3: Relayer Release / Mint (TRON Network)
                </span>
                <span className="text-[10px] text-slate-400">14:19:50 UTC</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                41,050 USDT-TRC20 transferred to receiver address TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7.
              </p>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                <span>Dest Tx: {formatHash(crossChain.destinationTxHash)}</span>
                <span className="text-emerald-400">● Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical disclaimer note */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Investigative Complexity Note: </strong>
          Cross-chain movement increases investigative complexity. Using a bridge protocol alone is not independent evidence of illicit intent, as bridges are legitimate decentralized interoperability tools. However, rapid forwarding post-bridge is a frequent layering technique.
        </p>
      </div>
    </div>
  );
};
