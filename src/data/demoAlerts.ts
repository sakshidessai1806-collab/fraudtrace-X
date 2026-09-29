import { AlertItem } from '../types';

export const DEMO_ALERTS: AlertItem[] = [
  {
    id: 'ALT-1042-01',
    caseId: 'CASE-2026-1042',
    title: 'Cross-chain movement detected',
    severity: 'CRITICAL',
    type: 'Cross-chain movement',
    timestamp: '2 minutes ago',
    description: '41,200 USDT bridged from Ethereum (0x33A0...aF8120) via Bridge-X to TRON address TQ8d...4Kp.',
    isAcknowledged: false,
    relatedAddress: 'TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7',
    evidenceId: 'EV-1042-006'
  },
  {
    id: 'ALT-1042-02',
    caseId: 'CASE-2026-1042',
    title: 'Rapid forwarding pattern detected',
    severity: 'HIGH',
    type: 'Rapid forwarding',
    timestamp: '5 minutes ago',
    description: 'Suspect wallet forwarded entire 42,500 USDT within 2m 14s of victim receipt.',
    isAcknowledged: false,
    relatedAddress: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
    evidenceId: 'EV-1042-003'
  },
  {
    id: 'ALT-1042-03',
    caseId: 'CASE-2026-1042',
    title: 'VASP cluster proximity detected',
    severity: 'HIGH',
    type: 'VASP proximity',
    timestamp: '8 minutes ago',
    description: 'TRON destination funds deposited into VASP-X exchange deposit infrastructure (Cluster VX-104).',
    isAcknowledged: false,
    relatedAddress: 'TVX104DepositWallet01Alpha891273918237',
    evidenceId: 'EV-1042-007'
  },
  {
    id: 'ALT-1042-04',
    caseId: 'CASE-2026-1042',
    title: 'Multi-layer consolidation identified',
    severity: 'CRITICAL',
    type: 'Large consolidation',
    timestamp: '15 minutes ago',
    description: 'Two separate intermediary layering branches merged into common consolidator address 0x33A0...aF8120.',
    isAcknowledged: true,
    relatedAddress: '0x33A0F8114C9291bBcA1992019488aF8120',
    evidenceId: 'EV-1042-005'
  },
  {
    id: 'ALT-1039-01',
    caseId: 'CASE-2026-1039',
    title: 'High fan-out burst in Task Scam',
    severity: 'MEDIUM',
    type: 'Fan-out burst',
    timestamp: '32 minutes ago',
    description: 'TRON suspect wallet dispersed smaller payments across 9 distinct unverified counter-parties.',
    isAcknowledged: true,
    relatedAddress: 'TQ8d91024KpO234190BcA918274192039',
    evidenceId: 'EV-1039-002'
  }
];

export interface AlertRule {
  id: string;
  name: string;
  category: string;
  thresholdLabel: string;
  defaultValue: string | number;
  currentValue: string | number;
  unit: string;
  enabled: boolean;
  description: string;
}

export const DEMO_ALERT_RULES: AlertRule[] = [
  {
    id: 'rule-rapid-forward',
    name: 'Rapid Forwarding Detection',
    category: 'Velocity',
    thresholdLabel: 'Forward Delay Threshold',
    defaultValue: 5,
    currentValue: 5,
    unit: 'minutes',
    enabled: true,
    description: 'Flags transactions where >80% of received funds are forwarded within threshold.'
  },
  {
    id: 'rule-high-fanout',
    name: 'High Fan-Out Dispersion',
    category: 'Topology',
    thresholdLabel: 'Max Output Destination Wallets',
    defaultValue: 5,
    currentValue: 5,
    unit: 'wallets',
    enabled: true,
    description: 'Flags suspect addresses that split funds across multiple downstream destinations.'
  },
  {
    id: 'rule-cross-chain',
    name: 'Cross-Chain Movement Detector',
    category: 'Interoperability',
    thresholdLabel: 'Bridge Protocol Interaction',
    defaultValue: 'Any Monitored Bridge',
    currentValue: 'Any Monitored Bridge',
    unit: 'protocol',
    enabled: true,
    description: 'Detects cross-chain locks, mints, and relayer transactions across supported bridges.'
  },
  {
    id: 'rule-vasp-proximity',
    name: 'VASP Proximity & Exit Detector',
    category: 'Attribution',
    thresholdLabel: 'Max Hops to Known Exchange Cluster',
    defaultValue: 2,
    currentValue: 2,
    unit: 'hops',
    enabled: true,
    description: 'Alerts when funds move within 2 hops of an identified centralized exchange deposit cluster.'
  },
  {
    id: 'rule-large-consolidation',
    name: 'Large Downstream Consolidation',
    category: 'Topology',
    thresholdLabel: 'Min Inbound Stream Count',
    defaultValue: 3,
    currentValue: 3,
    unit: 'inbound wallets',
    enabled: true,
    description: 'Identifies convergence where multiple intermediary flows recombine into one address.'
  }
];
