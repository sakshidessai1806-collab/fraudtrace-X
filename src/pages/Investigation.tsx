import React, { useState } from 'react';
import { 
  FolderSearch, 
  Copy, 
  Check, 
  ShieldAlert, 
  Dna, 
  Building2, 
  Split, 
  LockKeyhole, 
  Sparkles, 
  Network, 
  ListChecks, 
  Download, 
  Layers, 
  Clock, 
  ArrowRight,
  BookmarkCheck
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { formatAddress, copyToClipboard, formatUSD } from '../lib/utils';
import { RiskBadge } from '../components/RiskBadge';
import { RiskGauge } from '../components/RiskGauge';
import { FraudDNARadar } from '../components/FraudDNARadar';
import { InvestigationRoute } from '../components/InvestigationRoute';
import { TransactionGraph } from '../components/TransactionGraph';
import { TransactionTable } from '../components/TransactionTable';
import { IntermediaryCard } from '../components/IntermediaryCard';
import { VaspAttribution } from '../components/VaspAttribution';
import { CrossChainTimeline } from '../components/CrossChainTimeline';
import { EvidenceCard } from '../components/EvidenceCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { AuditTimeline } from '../components/AuditTimeline';
import { DEMO_TRANSACTIONS } from '../data/demoTransactions';

export const Investigation: React.FC = () => {
  const { investigation, showToast } = useInvestigation();
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Fund Flow' | 'Fraud DNA' | 'VASP Attribution' | 'Cross-Chain' | 'Evidence' | 'Recommendations'
  >('Overview');
  const [copied, setCopied] = useState(false);

  const handleCopyWallet = () => {
    copyToClipboard(investigation.reportedWallet);
    setCopied(true);
    showToast(`Copied suspect wallet ${formatAddress(investigation.reportedWallet)}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: ('Overview' | 'Fund Flow' | 'Fraud DNA' | 'VASP Attribution' | 'Cross-Chain' | 'Evidence' | 'Recommendations')[] = [
    'Overview',
    'Fund Flow',
    'Fraud DNA',
    'VASP Attribution',
    'Cross-Chain',
    'Evidence',
    'Recommendations'
  ];

  return (
    <div className="space-y-6">
      {/* HERO HEADER */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden font-mono">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold uppercase tracking-wider">
                {investigation.caseId}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-bold uppercase tracking-wider animate-pulse-subtle">
                {investigation.status}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {investigation.complaint.fraudType}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="text-xs text-slate-400">Suspect Wallet:</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-slate-800 rounded-lg text-sm text-cyan-300 font-bold select-all">
                <span>{investigation.reportedWallet}</span>
                <button
                  onClick={handleCopyWallet}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-100 transition-colors"
                  title="Copy full address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Network: {investigation.chain}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Risk Severity</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-black text-red-400">
                  {investigation.riskScore}/100
                </span>
                <RiskBadge level={investigation.riskLevel} size="sm" />
              </div>
            </div>

            <div className="pl-4 border-l border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Attribution</span>
              <div className="text-2xl font-black text-cyan-400 mt-0.5">
                {investigation.attributionConfidence}%
              </div>
              <span className="text-[10px] text-slate-400">Likely: {investigation.likelyVasp}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT RENDERING */}

      {/* Tab 1: OVERVIEW (HERO) */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* Section 11: Risk Gauge & Why Flagged */}
          <RiskGauge
            score={investigation.riskScore}
            attributionConfidence={investigation.attributionConfidence}
            riskLevel={investigation.riskLevel}
            signals={investigation.riskSignals}
          />

          {/* Section 3: Explainable Investigation Route */}
          <InvestigationRoute hops={investigation.routeHops} />

          {/* Section 2: Fraud DNA Radar & Summary */}
          <FraudDNARadar
            dimensions={investigation.fraudDNA}
            summarySignals={investigation.dnaSummary}
          />

          {/* Section 22: Next Best Investigation Steps */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Next Best Investigation Steps
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Prioritized Action Queue
              </span>
            </div>

            <div className="space-y-3">
              {investigation.recommendations.map((rec) => (
                <RecommendationCard key={rec.id} rec={rec} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: FUND FLOW */}
      {activeTab === 'Fund Flow' && (
        <div className="space-y-6">
          <TransactionGraph />
          <IntermediaryCard />
          <TransactionTable transactions={DEMO_TRANSACTIONS} />
        </div>
      )}

      {/* Tab 3: FRAUD DNA */}
      {activeTab === 'Fraud DNA' && (
        <div className="space-y-6">
          <FraudDNARadar
            dimensions={investigation.fraudDNA}
            summarySignals={investigation.dnaSummary}
          />

          {/* Detailed 10 Dimensions Metric Matrix */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 font-mono">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
              Behavioral Dimension Vector Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              {Object.entries(investigation.fraudDNA).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <div className="text-lg font-bold text-cyan-400 mt-1 font-mono">
                    {val} / 100
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: VASP ATTRIBUTION */}
      {activeTab === 'VASP Attribution' && (
        <div className="space-y-6">
          <VaspAttribution vaspData={investigation.vaspAttribution} />
        </div>
      )}

      {/* Tab 5: CROSS-CHAIN */}
      {activeTab === 'Cross-Chain' && (
        <div className="space-y-6">
          <CrossChainTimeline crossChain={investigation.crossChain} />
        </div>
      )}

      {/* Tab 6: EVIDENCE */}
      {activeTab === 'Evidence' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                Case Evidence Vault ({investigation.evidenceItems.length} Artifacts)
              </h3>
              <p className="text-xs text-slate-400">
                Cryptographically hashed blockchain and complaint records.
              </p>
            </div>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(investigation.evidenceItems, null, 2)], {
                  type: 'application/json'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `EVIDENCE-VAULT-${investigation.caseId}.json`;
                a.click();
                showToast('Evidence vault exported as verified JSON package.');
              }}
              className="px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-md shadow-cyan-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Evidence JSON</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investigation.evidenceItems.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} />
            ))}
          </div>

          <AuditTimeline events={investigation.auditTrail} />
        </div>
      )}

      {/* Tab 7: RECOMMENDATIONS */}
      {activeTab === 'Recommendations' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-100 font-mono">
              Actionable Investigative Prescriptions
            </h3>
            <p className="text-xs text-slate-400">
              Preservation and legal evidence correlation tasks. Does not trigger automatic asset freezes.
            </p>
          </div>

          <div className="space-y-3">
            {investigation.recommendations.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
