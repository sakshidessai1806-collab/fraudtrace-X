import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus2,
  FolderSearch,
  Network,
  Split,
  Building2,
  ShieldAlert,
  BellRing,
  LockKeyhole,
  FileText,
  Boxes,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Complaint Intake', to: '/complaints', icon: FilePlus2 },
    { name: 'Investigations', to: '/investigation', icon: FolderSearch, badge: 'ACTIVE' },
    { name: 'Transaction Graph', to: '/graph', icon: Network },
    { name: 'Cross-Chain', to: '/cross-chain', icon: Split },
    { name: 'VASP Intelligence', to: '/vasp', icon: Building2 },
    { name: 'Risk & Fraud DNA', to: '/risk', icon: ShieldAlert },
    { name: 'Alerts', to: '/alerts', icon: BellRing, badgeCount: 3 },
    { name: 'Evidence Vault', to: '/evidence', icon: LockKeyhole },
    { name: 'Investigation Reports', to: '/reports', icon: FileText },
    { name: 'LEA Integrations', to: '/integrations', icon: Boxes },
    { name: 'Settings', to: '/settings', icon: Settings }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-[#070b16]/95 border-r border-slate-800/80 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/70">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-indigo-600/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            {!collapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-wider text-slate-100 font-mono">
                    FRAUD<span className="text-cyan-400">TRACE</span>-X
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium tracking-tight">
                  Blockchain Fraud Intelligence
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Agency Tag */}
        {!collapsed && (
          <div className="mx-3 mt-3 px-3 py-2 rounded-md bg-slate-900/60 border border-slate-800/60 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider truncate">
              MHA / I4C CIS Division
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="mt-3 px-2 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`
                }
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0 text-cyan-400/80" />
                {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                {!collapsed && item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
                {!collapsed && item.badgeCount && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                    {item.badgeCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer */}
      <div className="p-3 border-t border-slate-800/70 bg-[#060a14]/60">
        {!collapsed ? (
          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1 flex items-center justify-between">
              <span>System Status</span>
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="truncate text-[10px]">Blockchain Indexer — DEMO</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="truncate text-[10px]">Analytics Engine Online</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="truncate text-[10px]">VASP Intelligence Online</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400" title="All Systems Online" />
          </div>
        )}
      </div>
    </aside>
  );
};
