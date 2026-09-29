import React from 'react';
import { Network, Play, RotateCcw, Filter, Layers, ShieldAlert, Sparkles } from 'lucide-react';
import { TransactionGraph } from '../components/TransactionGraph';
import { IntermediaryCard } from '../components/IntermediaryCard';
import { TransactionTable } from '../components/TransactionTable';
import { DEMO_TRANSACTIONS } from '../data/demoTransactions';
import { useInvestigation } from '../context/InvestigationContext';

export const GraphPage: React.FC = () => {
  const { investigation, startReplayFundFlow, isReplayingFlow } = useInvestigation();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Network className="w-4 h-4 text-cyan-400" />
              Graph Visualizer
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Interactive Canvas
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Transaction Graph Reconstruction ({investigation.caseId})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Directed topological flow from victim deposit, through intermediary layering, to cross-chain bridge and VASP off-ramp.
          </p>
        </div>

        <button
          onClick={startReplayFundFlow}
          disabled={isReplayingFlow}
          className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition-all active:scale-95"
        >
          <Play className="w-4 h-4" />
          <span>{isReplayingFlow ? 'Replaying Fund Flow...' : 'Replay Fund Flow'}</span>
        </button>
      </div>

      {/* Main Graph Component */}
      <TransactionGraph />

      {/* Intermediary Layering Breakdown */}
      <IntermediaryCard />

      {/* Reconstructed Transaction Table */}
      <TransactionTable transactions={DEMO_TRANSACTIONS} />
    </div>
  );
};
