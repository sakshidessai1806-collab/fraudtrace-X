import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InvestigationProvider, useInvestigation } from './context/InvestigationContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './pages/Dashboard';
import { Complaints } from './pages/Complaints';
import { Investigation } from './pages/Investigation';
import { GraphPage } from './pages/Graph';
import { CrossChain } from './pages/CrossChain';
import { Vasp } from './pages/Vasp';
import { Risk } from './pages/Risk';
import { Alerts } from './pages/Alerts';
import { Evidence } from './pages/Evidence';
import { Reports } from './pages/Reports';
import { Integrations } from './pages/Integrations';
import { Settings } from './pages/Settings';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toastMessage } = useInvestigation();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-subtle pointer-events-none">
      <div className="px-4 py-2.5 rounded-xl bg-[#090e1c]/95 border border-cyan-500/50 shadow-2xl backdrop-blur-xl flex items-center gap-2.5 text-xs font-mono text-cyan-300">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-semibold">{toastMessage}</span>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex cyber-grid">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pl-20 transition-all duration-300">
        <Topbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/investigation" element={<Investigation />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/cross-chain" element={<CrossChain />} />
            <Route path="/vasp" element={<Vasp />} />
            <Route path="/risk" element={<Risk />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/evidence" element={<Evidence />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
            {/* Catch-all redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <InvestigationProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </InvestigationProvider>
  );
}
