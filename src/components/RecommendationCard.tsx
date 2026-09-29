import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ExternalLink, ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react';
import { Recommendation } from '../types';
import { useInvestigation } from '../context/InvestigationContext';

interface RecommendationCardProps {
  rec: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ rec }) => {
  const navigate = useNavigate();
  const { updateRecommendationStatus, showToast } = useInvestigation();

  const getPriorityStyle = () => {
    switch (rec.priority) {
      case 'CRITICAL':
        return 'bg-red-500/15 text-red-300 border-red-500/40';
      case 'HIGH':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      case 'MEDIUM':
      default:
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40';
    }
  };

  const getStatusBadge = () => {
    switch (rec.status) {
      case 'ACTIONED':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> ACTIONED
          </span>
        );
      case 'REVIEWED':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> REVIEWED
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <Clock className="w-3 h-3" /> PENDING ACTION
          </span>
        );
    }
  };

  return (
    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getPriorityStyle()}`}>
            {rec.priority} PRIORITY
          </span>
          <h4 className="text-sm font-bold text-slate-100">
            {rec.title}
          </h4>
        </div>
        {getStatusBadge()}
      </div>

      <div className="mt-2.5 text-xs text-slate-300 leading-relaxed font-sans">
        <strong className="text-slate-200 font-mono">Analytical Reason: </strong>
        {rec.reason}
      </div>

      <div className="mt-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 font-sans">
        <strong className="text-cyan-400 font-mono text-[11px] block mb-0.5">Recommended Investigative Action:</strong>
        {rec.actionableStep}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span>Evidence Artifacts:</span>
          {rec.evidenceIds.map((ev) => (
            <button
              key={ev}
              onClick={() => navigate('/evidence')}
              className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 hover:underline border border-slate-700"
            >
              {ev}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {rec.status !== 'REVIEWED' && rec.status !== 'ACTIONED' && (
            <button
              onClick={() => updateRecommendationStatus(rec.id, 'REVIEWED')}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Mark Reviewed
            </button>
          )}

          {rec.status !== 'ACTIONED' && (
            <button
              onClick={() => updateRecommendationStatus(rec.id, 'ACTIONED')}
              className="px-2.5 py-1 text-xs rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
            >
              Mark Actioned
            </button>
          )}

          <button
            onClick={() => navigate('/evidence')}
            className="p-1 rounded text-slate-400 hover:text-slate-200"
            title="Inspect Associated Evidence"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
