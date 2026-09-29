import React from 'react';
import { Building2, ShieldAlert, AlertTriangle, Network, ExternalLink } from 'lucide-react';
import { VaspAttribution } from '../components/VaspAttribution';
import { useInvestigation } from '../context/InvestigationContext';

export const Vasp: React.FC = () => {
  const { investigation } = useInvestigation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-400" />
            Exchange Destination Forensics
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Case: {investigation.caseId}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          VASP Attribution & Cluster Intelligence
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Identification of centralized cryptocurrency exchange infrastructure, deposit proxy funnels, and hot wallet sweeps.
        </p>
      </div>

      {/* Main VASP Attribution & Cluster Subgraphs */}
      <VaspAttribution vaspData={investigation.vaspAttribution} />
    </div>
  );
};
