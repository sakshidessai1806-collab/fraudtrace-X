import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, ExternalLink, BookmarkPlus, Clock, AlertTriangle } from 'lucide-react';
import { AlertItem } from '../types';
import { RiskBadge } from './RiskBadge';
import { useInvestigation } from '../context/InvestigationContext';

interface AlertCardProps {
  alert: AlertItem;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const navigate = useNavigate();
  const { acknowledgeAlert, showToast, loadDemoInvestigation } = useInvestigation();

  const handleViewInvestigation = () => {
    loadDemoInvestigation();
    navigate('/investigation');
  };

  const handleAddEvidence = () => {
    showToast(`Preserved alert event [${alert.id}] into Evidence Vault as forensic snapshot.`);
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all font-mono ${
        alert.isAcknowledged
          ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
          : 'bg-slate-950/80 border-slate-700/80 hover:border-cyan-500/40'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <RiskBadge level={alert.severity} size="sm" />
          <h4 className="text-xs font-bold text-slate-100">
            {alert.title}
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>{alert.timestamp}</span>
        </div>
      </div>

      <p className="mt-2.5 text-xs text-slate-300 font-sans leading-relaxed">
        {alert.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="text-[10px] text-slate-500">
          Case: <span className="text-slate-300 font-bold">{alert.caseId}</span> • Ref: {alert.evidenceId}
        </div>

        <div className="flex items-center gap-2">
          {!alert.isAcknowledged ? (
            <button
              onClick={() => acknowledgeAlert(alert.id)}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
            >
              <Check className="w-3 h-3 text-cyan-400" />
              <span>Acknowledge</span>
            </button>
          ) : (
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Acknowledged
            </span>
          )}

          <button
            onClick={handleAddEvidence}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            title="Preserve to evidence vault"
          >
            <BookmarkPlus className="w-3 h-3" />
            <span>Add Evidence</span>
          </button>

          <button
            onClick={handleViewInvestigation}
            className="px-3 py-1 text-xs font-semibold rounded bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1"
          >
            <span>View Case</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
