import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Database, 
  Shield, 
  UserCheck, 
  Save, 
  RotateCcw, 
  Check, 
  Cpu, 
  HardDrive 
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export const Settings: React.FC = () => {
  const { showToast, loadDemoInvestigation } = useInvestigation();
  const [officerName, setOfficerName] = useState('Senior Cyber Crime Analyst');
  const [division, setDivision] = useState('I4C - CIS Forensic Division');
  const [badgeId, setBadgeId] = useState('I4C-DELHI-4402');
  const [autoReplay, setAutoReplay] = useState(true);
  const [rpcEth, setRpcEth] = useState('https://eth-mainnet.alchemyapi.io/v2/demo-subgraph');
  const [rpcTron, setRpcTron] = useState('https://api.trongrid.io/demo-indexer');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform preferences and analyst profile updated.');
  };

  const handleResetData = () => {
    loadDemoInvestigation();
    showToast('Demo environment state restored to baseline CASE-2026-1042.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono text-xs">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <SettingsIcon className="w-4 h-4 text-cyan-400" />
            System Preferences
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Node v2.6.4
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          Platform Configuration & Security Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage local forensic indexing parameters, analyst credentials, and simulation baselines.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Analyst Profile */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Investigating Officer Identity</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Analyst Title</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Unit / Division</label>
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Badge ID</label>
              <input
                type="text"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Blockchain RPC Endpoints */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Blockchain Indexer RPC Gateway</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Ethereum (EVM) RPC Node Endpoint</label>
              <input
                type="text"
                value={rpcEth}
                onChange={(e) => setRpcEth(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">TRON (TRC-20) Indexer Endpoint</label>
              <input
                type="text"
                value={rpcTron}
                onChange={(e) => setRpcTron(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2 text-xs rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State to CASE-2026-1042</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Platform Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
