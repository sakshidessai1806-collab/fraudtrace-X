import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus2, 
  Sparkles, 
  Send, 
  RotateCcw, 
  Check, 
  FileText, 
  ShieldAlert, 
  Upload, 
  Bot, 
  Terminal, 
  ArrowRight 
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { FraudType, BlockchainNetwork } from '../types';
import { MOCK_NCRP_SIMULATED_COMPLAINT } from '../data/demoComplaints';

export const Complaints: React.FC = () => {
  const navigate = useNavigate();
  const { ingestComplaint, complaints, showToast, loadDemoInvestigation } = useInvestigation();

  const [ncrpReference, setNcrpReference] = useState('NCRP-2026-DL-891024');
  const [fraudType, setFraudType] = useState<FraudType>('Investment Fraud');
  const [reportDate, setReportDate] = useState('2026-09-25 13:40');
  const [reportedWallet, setReportedWallet] = useState('0x7A91B4C82E9D31F2A8C7E9A12D5B91F2');
  const [blockchain, setBlockchain] = useState<BlockchainNetwork>('Ethereum');
  const [reportedAmount, setReportedAmount] = useState('42500');
  const [currency, setCurrency] = useState('USDT');
  const [complaintDesc, setComplaintDesc] = useState(
    'Victim was lured into depositing 42,500 USDT into fraudulent AI trading arbitrage portal via Telegram channel. Wallet provided as official liquidity pool address.'
  );

  const handleSimulateNcrp = () => {
    setNcrpReference(MOCK_NCRP_SIMULATED_COMPLAINT.ncrpReference);
    setFraudType(MOCK_NCRP_SIMULATED_COMPLAINT.fraudType);
    setReportDate(MOCK_NCRP_SIMULATED_COMPLAINT.victimReportDate);
    setReportedWallet(MOCK_NCRP_SIMULATED_COMPLAINT.reportedWallet);
    setBlockchain(MOCK_NCRP_SIMULATED_COMPLAINT.blockchain);
    setReportedAmount(String(MOCK_NCRP_SIMULATED_COMPLAINT.reportedAmount));
    setCurrency(MOCK_NCRP_SIMULATED_COMPLAINT.currency);
    setComplaintDesc(MOCK_NCRP_SIMULATED_COMPLAINT.complaintDescription);
    showToast('NCRP complaint received via simulated gateway.');
  };

  const handleReset = () => {
    setNcrpReference('');
    setFraudType('Investment Fraud');
    setReportDate(new Date().toISOString().slice(0, 16).replace('T', ' '));
    setReportedWallet('');
    setBlockchain('Ethereum');
    setReportedAmount('');
    setCurrency('USDT');
    setComplaintDesc('');
    showToast('Intake form reset.');
  };

  const handleAnalyzeWallet = (e: React.FormEvent) => {
    e.preventDefault();

    ingestComplaint({
      ncrpReference,
      fraudType,
      victimReportDate: reportDate,
      reportedWallet: reportedWallet || '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
      blockchain,
      reportedAmount: Number(reportedAmount) || 42500,
      currency,
      complaintDescription: complaintDesc
    });

    navigate('/investigation');
  };

  const handleSaveOnly = () => {
    ingestComplaint({
      ncrpReference,
      fraudType,
      victimReportDate: reportDate,
      reportedWallet: reportedWallet || '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
      blockchain,
      reportedAmount: Number(reportedAmount) || 42500,
      currency,
      complaintDescription: complaintDesc
    });
    showToast('Complaint saved to internal docket.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <FilePlus2 className="w-4 h-4 text-cyan-400" />
              Electronic Intake Gateway
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              NCRP Adapter Ready
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Victim Cryptocurrency Complaint Intake
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingest suspect cryptocurrency wallet addresses reported via citizen cyber grievance portals.
          </p>
        </div>

        {/* Mock NCRP Trigger Button */}
        <button
          type="button"
          onClick={handleSimulateNcrp}
          className="px-3.5 py-2 text-xs font-mono font-semibold rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 flex items-center gap-2 transition-all shadow-sm active:scale-95"
          title="Populate synthetic complaint directly from NCRP adapter"
        >
          <Terminal className="w-4 h-4 text-amber-400" />
          <span>Simulate NCRP Complaint</span>
        </button>
      </div>

      {/* Main Intake Form */}
      <form onSubmit={handleAnalyzeWallet} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 font-mono">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NCRP Reference */}
          <div>
            <label className="text-xs text-slate-300 block mb-1.5 font-semibold">
              NCRP Reference Number
            </label>
            <input
              type="text"
              required
              value={ncrpReference}
              onChange={(e) => setNcrpReference(e.target.value)}
              placeholder="e.g. NCRP-2026-DL-891024"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Fraud Type Dropdown */}
          <div>
            <label className="text-xs text-slate-300 block mb-1.5 font-semibold">
              Cyber Fraud Classification
            </label>
            <select
              value={fraudType}
              onChange={(e) => setFraudType(e.target.value as FraudType)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Investment Fraud">Investment Fraud</option>
              <option value="Task Fraud">Task Fraud</option>
              <option value="Phishing">Phishing</option>
              <option value="Ransomware">Ransomware</option>
              <option value="Sextortion">Sextortion</option>
              <option value="Darknet Transaction">Darknet Transaction</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Victim Report Date */}
          <div>
            <label className="text-xs text-slate-300 block mb-1.5 font-semibold">
              Victim Reported Incident Date / Time
            </label>
            <input
              type="text"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              placeholder="YYYY-MM-DD HH:MM UTC"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Blockchain Network */}
          <div>
            <label className="text-xs text-slate-300 block mb-1.5 font-semibold">
              Blockchain Ledger
            </label>
            <select
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value as BlockchainNetwork)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Ethereum">Ethereum (ERC-20)</option>
              <option value="TRON">TRON (TRC-20)</option>
              <option value="Bitcoin">Bitcoin (UTXO)</option>
              <option value="Polygon">Polygon (POS)</option>
              <option value="BSC">BNB Smart Chain (BEP-20)</option>
            </select>
          </div>

          {/* Reported Suspect Wallet */}
          <div className="md:col-span-2">
            <label className="text-xs text-slate-300 block mb-1.5 font-semibold flex items-center justify-between">
              <span>Reported Suspect Wallet Address</span>
              <span className="text-[10px] text-cyan-400">Primary Analytics Anchor</span>
            </label>
            <input
              type="text"
              required
              value={reportedWallet}
              onChange={(e) => setReportedWallet(e.target.value)}
              placeholder="Enter suspect 0x or Tron T... or Bitcoin address"
              className="w-full px-3 py-2 bg-slate-900 border border-cyan-500/40 rounded-lg text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Reported Amount */}
          <div>
            <label className="text-xs text-slate-300 block mb-1.5 font-semibold">
              Reported Loss Amount
            </label>
            <input
              type="number"
              value={reportedAmount}
              onChange={(e) => setReportedAmount(e.target.value)}
              placeholder="42500"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="text-xs text-slate-300 block mb-1.5 font-semibold">
              Asset Currency Denomination
            </label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="USDT"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-xs text-slate-300 block mb-1.5 font-semibold">
              Complaint Narrative & MO Description
            </label>
            <textarea
              rows={3}
              value={complaintDesc}
              onChange={(e) => setComplaintDesc(e.target.value)}
              placeholder="Brief details of how victim was induced, communication channels used, etc."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          {/* Attachment Box */}
          <div className="md:col-span-2 p-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 text-center">
            <Upload className="w-5 h-5 text-slate-500 mx-auto mb-1" />
            <span className="text-xs text-slate-300 block">
              Attach Victim Chat Screenshots or Tx Receipt PDF
            </span>
            <span className="text-[10px] text-slate-500">
              Attached mock file: <span className="text-cyan-400">victim_telegram_receipt_0925.pdf (1.2 MB)</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveOnly}
              className="px-4 py-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-semibold"
            >
              Save Complaint
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Analyze Wallet & Launch Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
