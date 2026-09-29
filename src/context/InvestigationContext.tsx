import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Investigation, Complaint, Recommendation, AlertItem, BlockchainNetwork } from '../types';
import { DEMO_INVESTIGATION_CASE_1042 } from '../data/demoInvestigation';
import { DEMO_COMPLAINTS } from '../data/demoComplaints';
import { DEMO_ALERTS, DEMO_ALERT_RULES, AlertRule } from '../data/demoAlerts';
import { DEMO_TRANSACTIONS } from '../data/demoTransactions';
import { GraphNodeData } from '../lib/graphEngine';

interface InvestigationContextType {
  investigation: Investigation;
  complaints: Complaint[];
  alerts: AlertItem[];
  alertRules: AlertRule[];
  selectedChain: BlockchainNetwork;
  selectedNode: GraphNodeData | null;
  toastMessage: string | null;
  isReplayingFlow: boolean;
  replayStep: number;
  setSelectedChain: (chain: BlockchainNetwork) => void;
  setSelectedNode: (node: GraphNodeData | null) => void;
  showToast: (msg: string) => void;
  ingestComplaint: (complaint: Partial<Complaint>) => void;
  loadDemoInvestigation: () => void;
  updateRecommendationStatus: (id: string, status: 'PENDING' | 'REVIEWED' | 'ACTIONED') => void;
  acknowledgeAlert: (id: string) => void;
  toggleAlertRule: (ruleId: string) => void;
  updateAlertRuleThreshold: (ruleId: string, val: string | number) => void;
  startReplayFundFlow: () => void;
  stopReplayFundFlow: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [investigation, setInvestigation] = useState<Investigation>(DEMO_INVESTIGATION_CASE_1042);
  const [complaints, setComplaints] = useState<Complaint[]>(DEMO_COMPLAINTS);
  const [alerts, setAlerts] = useState<AlertItem[]>(DEMO_ALERTS);
  const [alertRules, setAlertRules] = useState<AlertRule[]>(DEMO_ALERT_RULES);
  const [selectedChain, setSelectedChain] = useState<BlockchainNetwork>('Ethereum');
  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isReplayingFlow, setIsReplayingFlow] = useState<boolean>(false);
  const [replayStep, setReplayStep] = useState<number>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const loadDemoInvestigation = () => {
    setInvestigation(DEMO_INVESTIGATION_CASE_1042);
    setSelectedChain('Ethereum');
    showToast('Loaded Demo Investigation CASE-2026-1042 (42,500 USDT - Ethereum)');
  };

  const ingestComplaint = (newComp: Partial<Complaint>) => {
    const fullComplaint: Complaint = {
      id: `CASE-2026-${Math.floor(1050 + Math.random() * 50)}`,
      ncrpReference: newComp.ncrpReference || `NCRP-2026-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      fraudType: newComp.fraudType || 'Investment Fraud',
      victimReportDate: newComp.victimReportDate || new Date().toISOString(),
      reportedWallet: newComp.reportedWallet || '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
      blockchain: newComp.blockchain || 'Ethereum',
      reportedAmount: newComp.reportedAmount || 42500,
      currency: newComp.currency || 'USDT',
      reportedAmountINR: (newComp.reportedAmount || 42500) * 84,
      victimContactState: newComp.victimContactState || 'Delhi NCR',
      acknowledgementNumber: `ACK-I4C-${Math.floor(10000 + Math.random() * 90000)}-2026`,
      complaintDescription: newComp.complaintDescription || 'Complaint ingested via investigative portal.',
      status: 'INVESTIGATION_ACTIVE',
      createdAt: new Date().toISOString()
    };

    setComplaints(prev => [fullComplaint, ...prev]);

    // Update active investigation to point to this new complaint
    setInvestigation(prev => ({
      ...prev,
      caseId: fullComplaint.id,
      complaint: fullComplaint,
      reportedWallet: fullComplaint.reportedWallet,
      chain: fullComplaint.blockchain,
      totalVolumeTrackedUSD: fullComplaint.reportedAmount
    }));

    showToast('Complaint ingested successfully.');
    setTimeout(() => {
      showToast('Blockchain analysis initiated & graph synchronized.');
    }, 1200);
  };

  const updateRecommendationStatus = (id: string, status: 'PENDING' | 'REVIEWED' | 'ACTIONED') => {
    setInvestigation(prev => ({
      ...prev,
      recommendations: prev.recommendations.map(r => r.id === id ? { ...r, status } : r)
    }));
    showToast(`Recommendation ${id} marked as ${status}`);
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isAcknowledged: true } : a));
    showToast(`Alert ${id} acknowledged`);
  };

  const toggleAlertRule = (ruleId: string) => {
    setAlertRules(prev => prev.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r));
    showToast(`Rule updated.`);
  };

  const updateAlertRuleThreshold = (ruleId: string, val: string | number) => {
    setAlertRules(prev => prev.map(r => r.id === ruleId ? { ...r, currentValue: val } : r));
    showToast(`Threshold updated to ${val}`);
  };

  const startReplayFundFlow = () => {
    setIsReplayingFlow(true);
    setReplayStep(0);
    showToast('Initiating Fund Flow Replay animation across 8 transaction hops...');

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setReplayStep(step);
      if (step >= 8) {
        clearInterval(interval);
        setTimeout(() => {
          setIsReplayingFlow(false);
          showToast('Fund Flow Replay completed. Terminal VASP exit reached.');
        }, 1500);
      }
    }, 1800);
  };

  const stopReplayFundFlow = () => {
    setIsReplayingFlow(false);
    setReplayStep(0);
  };

  return (
    <InvestigationContext.Provider
      value={{
        investigation,
        complaints,
        alerts,
        alertRules,
        selectedChain,
        selectedNode,
        toastMessage,
        isReplayingFlow,
        replayStep,
        setSelectedChain,
        setSelectedNode,
        showToast,
        ingestComplaint,
        loadDemoInvestigation,
        updateRecommendationStatus,
        acknowledgeAlert,
        toggleAlertRule,
        updateAlertRuleThreshold,
        startReplayFundFlow,
        stopReplayFundFlow
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
};

export const useInvestigation = () => {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
};
