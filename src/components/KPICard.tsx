import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral' | 'alert';
  variant?: 'cyan' | 'red' | 'amber' | 'purple' | 'default';
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'neutral',
  variant = 'default',
  onClick
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'cyan':
        return 'border-cyan-500/30 hover:border-cyan-500/60 shadow-cyan-500/5 text-cyan-400 bg-cyan-950/20';
      case 'red':
        return 'border-red-500/30 hover:border-red-500/60 shadow-red-500/5 text-red-400 bg-red-950/20';
      case 'amber':
        return 'border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5 text-amber-400 bg-amber-950/20';
      case 'purple':
        return 'border-purple-500/30 hover:border-purple-500/60 shadow-purple-500/5 text-purple-400 bg-purple-950/20';
      default:
        return 'border-slate-800 hover:border-slate-700 text-slate-300 bg-slate-900/40';
    }
  };

  const getTrendColor = () => {
    switch (trendType) {
      case 'alert':
      case 'negative':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'positive':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default:
        return 'text-slate-400 bg-slate-800/40 border-slate-700/50';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-xl p-4 transition-all duration-200 border relative overflow-hidden group ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } ${getVariantStyles()}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">
            {title}
          </p>
          <h3 className="text-2xl font-extrabold text-slate-100 mt-1 font-mono tracking-tight group-hover:text-white transition-colors">
            {value}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-inherit">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${getTrendColor()}`}>
            {trend}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            Real-time Metric
          </span>
        </div>
      )}
    </div>
  );
};
