import React, { useState } from 'react';
import { 
  Boxes, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Send, 
  RefreshCw, 
  Database, 
  ShieldCheck, 
  FileCode, 
  ExternalLink 
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { MOCK_NCRP_SIMULATED_COMPLAINT } from '../data/demoComplaints';

export const Integrations: React.FC = () => {
  const { ingestComplaint, showToast, investigation } = useInvestigation();
  const [sahyogResponse, setSahyogResponse] = useState<any>(null);
  const [isSimulatingSahyog, setIsSimulatingSahyog] = useState(false);

  const integrationAdapters = [
    {
      name: 'NCRP Integration Adapter',
      role: 'National Cyber Crime Reporting Portal Electronic Ingestion',
      status: 'Connected / DEMO ADAPTER',
      statusType: 'demo',
      icon: Terminal,
      endpoint: '/api/v1/adapters/ncrp/webhook'
    },
    {
      name: 'SAHYOG Integration Adapter',
      role: 'Inter-Agency Cyber Intelligence Sharing & Request Routing',
      status: 'Connected / DEMO ADAPTER',
      statusType: 'demo',
      icon: Boxes,
      endpoint: '/api/v1/adapters/sahyog/query'
    },
    {
      name: 'Blockchain Indexer — DEMO',
      role: 'Multi-Chain Node RPC & Transaction Mempool Listener',
      status: 'Online / Sync Block #20,819,203',
      statusType: 'online',
      icon: Database,
      endpoint: 'wss://indexer.fraudtrace.internal/subgraph'
    },
    {
      name: 'VASP Intelligence Database',
      role: 'Exchange Deposit Cluster Topology & Address Dictionary',
      status: 'Online / 142 Verified Clusters',
      statusType: 'online',
      icon: Server,
      endpoint: '/api/v1/vasp/clusters'
    },
    {
      name: 'Cryptographic Evidence Store',
      role: 'SHA-256 Tamper-Evident Artifact Vault',
      status: 'Online / Verified Immutable',
      statusType: 'online',
      icon: ShieldCheck,
      endpoint: '/api/v1/vault/evidence'
    },
    {
      name: 'LEA REST API Gateway',
      role: 'Secure Token-Authenticated Integration Endpoints',
      status: 'Online / TLS 1.3 Active',
      statusType: 'online',
      icon: FileCode,
      endpoint: 'https://api.fraudtrace.gov.in/v2'
    }
  ];

  const apiEndpoints = [
    { method: 'POST', path: '/api/complaints', desc: 'Ingest raw cyber grievance ticket from NCRP electronic stream.' },
    { method: 'POST', path: '/api/analyze', desc: 'Trigger automated multi-hop graph generation and Fraud DNA extraction.' },
    { method: 'GET', path: '/api/investigations/:id', desc: 'Fetch full case dossier, heuristic signals, and route hops.' },
    { method: 'GET', path: '/api/alerts', desc: 'Poll active high-velocity and VASP proximity event dispatch queue.' },
    { method: 'GET', path: '/api/reports/:id', desc: 'Generate printable judicial PDF / Section 65B forensic JSON.' }
  ];

  const handleSimulateNcrp = () => {
    ingestComplaint({
      ncrpReference: MOCK_NCRP_SIMULATED_COMPLAINT.ncrpReference,
      fraudType: MOCK_NCRP_SIMULATED_COMPLAINT.fraudType,
      victimReportDate: MOCK_NCRP_SIMULATED_COMPLAINT.victimReportDate,
      reportedWallet: MOCK_NCRP_SIMULATED_COMPLAINT.reportedWallet,
      blockchain: MOCK_NCRP_SIMULATED_COMPLAINT.blockchain,
      reportedAmount: MOCK_NCRP_SIMULATED_COMPLAINT.reportedAmount,
      currency: MOCK_NCRP_SIMULATED_COMPLAINT.currency,
      complaintDescription: MOCK_NCRP_SIMULATED_COMPLAINT.complaintDescription
    });
    showToast('NCRP complaint received via simulated electronic intake adapter.');
  };

  const handleSimulateSahyog = () => {
    setIsSimulatingSahyog(true);
    showToast('Dispatching SAHYOG inter-agency query request...');
    setTimeout(() => {
      setIsSimulatingSahyog(false);
      setSahyogResponse({
        requestId: `SAHYOG-REQ-${Math.floor(10000 + Math.random() * 90000)}-2026`,
        agency: 'I4C CIS Division',
        cooperatingAgency: 'State Cyber Cell (CID)',
        investigationId: investigation.caseId,
        relevantWallet: investigation.reportedWallet,
        targetVASP: investigation.likelyVasp,
        requestedEvidence: ['EV-1042-002', 'EV-1042-006', 'EV-1042-007'],
        status: 'DISPATCHED_TO_LEAD_DESK',
        timestamp: new Date().toUTCString(),
        sha256PayloadSeal: '8f2c3194a0d9e83120bc71a92e44837190bcaef91a78330198cd4501a91e42b8'
      });
      showToast('SAHYOG response received: Case correlated with state cyber desks.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <Boxes className="w-4 h-4 text-cyan-400" />
            Inter-Agency Integration Layer
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Prototype Integration Adapters
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          Law Enforcement Agency (LEA) Integrations
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Standardized API adapters connecting national cyber portals (NCRP), intelligence feeds (SAHYOG), and blockchain indexers.
        </p>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400 font-mono">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Prototype Integration Notice: </strong>
          Government integrations shown are prototype adapters configured to demonstrate data contract compatibility. No live production credentials or official government servers are accessed.
        </p>
      </div>

      {/* 6 Integration Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
        {integrationAdapters.map((ad, idx) => {
          const Icon = ad.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      ad.statusType === 'demo'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {ad.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-100">
                  {ad.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-sans mt-1">
                  {ad.role}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 truncate">
                Endpoint: <span className="text-slate-400">{ad.endpoint}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mock Simulation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        {/* NCRP Simulator Card */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                NCRP Ingestion Simulator
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              DEMO ADAPTER
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Simulates automatic receipt of a citizen cyber fraud ticket dispatched through the National Cyber Crime Reporting Portal.
          </p>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div>Sample Ref: <span className="text-slate-200">NCRP-2026-GJ-902188</span></div>
            <div>Offense: <span className="text-slate-200">Investment Fraud (38,000 USDT)</span></div>
            <div>Target: <span className="text-cyan-400">0x49da781190bc2350...</span></div>
          </div>
          <button
            onClick={handleSimulateNcrp}
            className="w-full py-2 px-4 rounded-lg bg-amber-600/80 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate NCRP Complaint Ingestion</span>
          </button>
        </div>

        {/* SAHYOG Simulator Card */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                SAHYOG Intelligence Request Simulator
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              DEMO ADAPTER
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Dispatches an inter-state coordinate inquiry regarding exchange KYC freeze notices for identified suspect wallets.
          </p>

          <button
            onClick={handleSimulateSahyog}
            disabled={isSimulatingSahyog}
            className="w-full py-2 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingSahyog ? 'animate-spin' : ''}`} />
            <span>Simulate SAHYOG Intelligence Request</span>
          </button>

          {sahyogResponse && (
            <div className="p-3 rounded-lg bg-black/60 border border-cyan-500/30 text-[11px] text-cyan-300 space-y-1 overflow-x-auto">
              <div>Request ID: <span className="text-white font-bold">{sahyogResponse.requestId}</span></div>
              <div>Status: <span className="text-emerald-400 font-bold">{sahyogResponse.status}</span></div>
              <div>Target VASP: <span className="text-white">{sahyogResponse.targetVASP}</span></div>
              <div>Dispatched At: <span className="text-slate-400">{sahyogResponse.timestamp}</span></div>
            </div>
          )}
        </div>
      </div>

      {/* REST API Endpoints Specification Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 font-mono text-xs">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Integration API Specification (REST / JSON)</span>
        </h3>

        <div className="space-y-2">
          {apiEndpoints.map((ep, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    ep.method === 'POST'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {ep.method}
                </span>
                <span className="text-slate-200 font-bold">{ep.path}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-sans">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
