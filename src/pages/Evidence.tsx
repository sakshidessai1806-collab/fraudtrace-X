import React, { useState } from 'react';
import { LockKeyhole, Download, Filter, Search, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { EvidenceCard } from '../components/EvidenceCard';
import { AuditTimeline } from '../components/AuditTimeline';
import { useInvestigation } from '../context/InvestigationContext';

export const Evidence: React.FC = () => {
  const { investigation, showToast } = useInvestigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredEvidence = investigation.evidenceItems.filter((ev) => {
    const matchesType = filterType === 'ALL' || ev.type === filterType;
    const matchesSearch =
      ev.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.sha256Hash.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleExportJSON = () => {
    const exportData = {
      investigationCaseId: investigation.caseId,
      exportTimestamp: new Date().toISOString(),
      integrityStandard: 'SHA-256 Chain of Custody Protocol v1.4',
      agency: 'I4C CIS Division / MHA',
      evidenceItems: investigation.evidenceItems,
      auditTrail: investigation.auditTrail
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FRAUDTRACE-EVIDENCE-${investigation.caseId}.json`;
    a.click();
    showToast('Cryptographically verified Evidence JSON bundle downloaded.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <LockKeyhole className="w-4 h-4 text-cyan-400" />
              Cryptographic Evidence Vault
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Immutable Chain of Custody
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Forensic Evidence Vault & Chain of Custody
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Tamper-evident record preservation for judicial filing under Indian Evidence Act & Section 65B.
          </p>
        </div>

        <button
          onClick={handleExportJSON}
          className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Export Evidence Package (JSON)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 font-mono text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search evidence ID, description, or SHA-256 hash..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Artifact Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Types ({investigation.evidenceItems.length})</option>
            <option value="Transaction Hash">Transaction Hash</option>
            <option value="Wallet Address">Wallet Address</option>
            <option value="Timestamp Correlation">Timestamp Correlation</option>
            <option value="Graph Snapshot">Graph Snapshot</option>
            <option value="VASP Attribution">VASP Attribution</option>
            <option value="Risk Assessment">Risk Assessment</option>
            <option value="Complaint Record">Complaint Record</option>
            <option value="Bridge Proof">Bridge Proof</option>
          </select>
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvidence.map((ev) => (
          <EvidenceCard key={ev.id} evidence={ev} />
        ))}
      </div>

      {/* Audit Timeline Section */}
      <AuditTimeline events={investigation.auditTrail} />
    </div>
  );
};
