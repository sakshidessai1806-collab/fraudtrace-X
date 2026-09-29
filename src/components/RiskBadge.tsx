import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel | 'NEUTRAL';
  score?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ 
  level, 
  score, 
  className = '',
  size = 'md' 
}) => {
  const getStyles = () => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500/15 text-red-300 border-red-500/40 shadow-sm shadow-red-500/20';
      case 'HIGH':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20';
      case 'MEDIUM':
        return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40';
      case 'LOW':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      case 'INFO':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40';
      case 'NEUTRAL':
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getSize = () => {
    switch (size) {
      case 'sm':
        return 'text-[10px] px-1.5 py-0.5';
      case 'lg':
        return 'text-xs px-3 py-1 font-bold';
      case 'md':
      default:
        return 'text-[11px] px-2 py-0.5 font-semibold';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded font-mono border uppercase tracking-wider ${getStyles()} ${getSize()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{level}</span>
      {score !== undefined && <span className="opacity-80">({score})</span>}
    </span>
  );
};
