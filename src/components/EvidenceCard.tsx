import React, { useState } from 'react';
import { LockKeyhole, Copy, Check, ShieldCheck, FileCode, ChevronDown, ChevronUp } from 'lucide-react';
import { EvidenceItem } from '../types';
import { formatHash, copyToClipboard } from '../lib/utils';
import { useInvestigation } from '../context/InvestigationContext';

interface EvidenceCardProps {
  evidence: EvidenceItem;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ evidence }) => {
  const [copied, setCopied] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const { showToast } = useInvestigation();

  const handleCopyHash = () => {
    copyToClipboard(evidence.sha256Hash);
    setCopied(true);
    showToast(`Copied SHA-256 hash for ${evidence.id}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIntegrityBadge = () => {
    switch (evidence.integrityStatus) {
      case 'IMMUTABLE':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'CORRELATED':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'VERIFIED':
      default:
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/30 transition-all font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <LockKeyhole className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400">
                {evidence.id}
              </span>
              <span className="text-xs font-bold text-slate-200">
                {evidence.type}
              </span>
            </div>
            <div className="text-[10px] text-slate-500">
              Source: {evidence.source}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold flex items-center gap-1 ${getIntegrityBadge()}`}>
            <ShieldCheck className="w-3 h-3" />
            {evidence.integrityStatus}
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-300 font-sans leading-relaxed">
        {evidence.description}
      </p>

      {/* SHA-256 Fingerprint */}
      <div className="mt-3 p-2 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2 text-xs">
        <div className="truncate">
          <span className="text-[10px] text-slate-500 block">SHA-256 Content Hash:</span>
          <span className="text-slate-300 select-all font-semibold">
            {formatHash(evidence.sha256Hash, 14, 10)}
          </span>
        </div>
        <button
          onClick={handleCopyHash}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
          title="Copy full cryptographic hash"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Payload Accordion */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <span className="text-slate-500">
          Collected: {evidence.collectedAt}
        </span>
        <button
          onClick={() => setShowPayload(!showPayload)}
          className="text-cyan-400 hover:underline flex items-center gap-1"
        >
          <FileCode className="w-3 h-3" />
          <span>{showPayload ? 'Hide Structured Payload' : 'Inspect JSON Payload'}</span>
          {showPayload ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {showPayload && (
        <pre className="mt-2 p-2.5 rounded bg-black/60 border border-slate-800 text-[10px] text-cyan-300 overflow-x-auto">
          {JSON.stringify(evidence.rawPayload, null, 2)}
        </pre>
      )}
    </div>
  );
};
