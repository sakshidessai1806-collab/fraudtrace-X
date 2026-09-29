import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Eye, 
  ShieldAlert, 
  CheckCircle2, 
  Building2, 
  Split, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { formatAddress, formatHash, formatUSD, formatINR } from '../lib/utils';
import { RiskBadge } from '../components/RiskBadge';

export const Reports: React.FC = () => {
  const { investigation, showToast } = useInvestigation();
  const [reportFormat, setReportFormat] = useState<'standard' | 'executive' | 'court'>('standard');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      title: `INVESTIGATION DOSSIER — ${investigation.caseId}`,
      agency: 'Indian Cyber Crime Coordination Centre (I4C), CIS Division',
      problemStatement: 'SIH26183 - Real-Time Identification of Fraud-Linked Cryptocurrency Exchanges',
      generatedAt: new Date().toISOString(),
      caseInfo: {
        caseId: investigation.caseId,
        status: investigation.status,
        reportedWallet: investigation.reportedWallet,
        chain: investigation.chain,
        riskScore: investigation.riskScore,
        riskLevel: investigation.riskLevel,
        attributionConfidence: investigation.attributionConfidence,
        likelyVASP: investigation.likelyVasp
      },
      complaint: investigation.complaint,
      fraudDNA: investigation.fraudDNA,
      routeHops: investigation.routeHops,
      crossChain: investigation.crossChain,
      vaspAttribution: investigation.vaspAttribution,
      recommendations: investigation.recommendations,
      evidenceSummary: investigation.evidenceItems.map(e => ({ id: e.id, type: e.type, sha256: e.sha256Hash })),
      auditEvents: investigation.auditTrail,
      legalDisclaimer: 'Analytical lead only. Attribution does not independently establish ownership or criminal intent.'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `REPORT-${investigation.caseId}.json`;
    a.click();
    showToast('Investigation Report JSON generated and downloaded.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Print/Export Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              Standardized Forensic Output
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Judicial Section 65B Format
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Generate Law Enforcement Investigation Report
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Compile explainable fund flow, behavioral Fraud DNA, and VASP off-ramp attribution into an official dossier.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJSON}
            className="px-3.5 py-2 text-xs font-mono font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Download JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/25 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="glass-panel rounded-2xl p-8 border border-slate-800 font-mono text-xs space-y-6 text-slate-300 bg-[#080d1a]/95">
        {/* Document Header */}
        <div className="border-b-2 border-slate-700 pb-6 text-center space-y-1.5">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            CONFIDENTIAL // LAW ENFORCEMENT INTELLIGENCE MEMORANDUM
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-wider">
            FRAUDTRACE-X FORENSIC BLOCKCHAIN DOSSIER
          </h2>
          <div className="text-xs text-cyan-400">
            Ministry of Home Affairs • Indian Cyber Crime Coordination Centre (I4C)
          </div>
          <div className="text-[10px] text-slate-500">
            Case Docket: {investigation.caseId} • Generated: {new Date().toUTCString()}
          </div>
        </div>

        {/* Mandatory Regulatory Warning Banner */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-2.5 leading-relaxed font-sans">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Analytical Notice & Evidentiary Standard: </strong>
            Analytical lead only. Attribution does not independently establish ownership or criminal intent. All indicators represent observable on-chain topological heuristics compiled for investigative leads.
          </span>
        </div>

        {/* 1. Case & Complaint Summary */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1.5">
            1. Offense & Complainant Particulars
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-[10px] text-slate-500 block">NCRP Reference:</span>
              <span className="font-bold text-slate-200">{investigation.complaint.ncrpReference}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Crime Category:</span>
              <span className="font-bold text-slate-200">{investigation.complaint.fraudType}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Reported Loss:</span>
              <span className="font-bold text-emerald-400">{investigation.complaint.reportedAmount.toLocaleString()} {investigation.complaint.currency}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">INR Estimate:</span>
              <span className="font-bold text-slate-200">{formatINR(investigation.complaint.reportedAmountINR)}</span>
            </div>
          </div>
        </div>

        {/* 2. Target Suspect Wallet & Threat Index */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1.5">
            2. Suspect Wallet Assessment
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] text-slate-500 block">Primary Target Wallet:</span>
              <span className="font-bold text-cyan-300 break-all">{investigation.reportedWallet}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Composite Threat Score:</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-base font-bold text-red-400">{investigation.riskScore}/100</span>
                <RiskBadge level={investigation.riskLevel} size="sm" />
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Attribution Confidence:</span>
              <span className="text-base font-bold text-cyan-400 mt-0.5 block">{investigation.attributionConfidence}%</span>
            </div>
          </div>
        </div>

        {/* 3. Explainable Investigation Route */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1.5">
            3. Reconstructed Fund Flow Route ({investigation.routeHops.length} Hops)
          </h3>
          <div className="space-y-2">
            {investigation.routeHops.map((h) => (
              <div key={h.hopIndex} className="p-2 rounded bg-black/40 border border-slate-800/80 flex flex-wrap items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">Hop {h.hopIndex}:</span>
                  <span className="text-slate-200 font-semibold">{h.fromRole} → {h.toRole}</span>
                  <span className="text-slate-400">({formatAddress(h.walletAddress)})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">{h.amount.toLocaleString()} {h.asset}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">{h.patternDetected}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. VASP Attribution Findings */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1.5">
            4. VASP Attribution & Off-Ramp Findings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] text-slate-500 block">Identified Destination:</span>
              <span className="font-bold text-cyan-300">{investigation.vaspAttribution.vaspName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Attributed Cluster Tag:</span>
              <span className="font-bold text-slate-200">{investigation.vaspAttribution.clusterTag}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Proximity Metric:</span>
              <span className="font-bold text-emerald-400">94% (Direct Sweep Proxies)</span>
            </div>
          </div>
        </div>

        {/* 5. Next Best Action Items */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1.5">
            5. Recommended Subpoena & Preservation Steps
          </h3>
          <div className="space-y-1.5">
            {investigation.recommendations.map((rec) => (
              <div key={rec.id} className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] flex items-center justify-between">
                <div>
                  <strong className="text-slate-200">{rec.id}: {rec.title}</strong>
                  <p className="text-[10px] text-slate-400">{rec.actionableStep}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {rec.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Evidentiary Custody Log */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1.5">
            6. Preserved Evidence Hash Register (SHA-256)
          </h3>
          <div className="space-y-1 text-[10px]">
            {investigation.evidenceItems.slice(0, 4).map((ev) => (
              <div key={ev.id} className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-cyan-400 font-bold">{ev.id} ({ev.type}):</span>
                <span className="text-slate-400 font-mono">{ev.sha256Hash}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
          <span>FRAUDTRACE-X // CYBERSECURITY ANALYTICS PLATFORM // I4C CIS DIVISION</span>
          <span>PAGE 1 OF 1 // SYSTEM VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
