import { Node, Edge } from '@xyflow/react';

export interface GraphNodeData extends Record<string, unknown> {
  label: string;
  role: 'victim' | 'suspect' | 'intermediary' | 'consolidator' | 'bridge' | 'destination' | 'vasp';
  address: string;
  chain: string;
  riskScore: number;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NEUTRAL';
  inboundUSD: number;
  outboundUSD: number;
  patterns: string[];
  firstSeen: string;
  lastSeen: string;
  isActiveStep?: boolean;
}

export const INITIAL_GRAPH_NODES: Node[] = [
  {
    id: 'node-victim',
    type: 'customNode',
    position: { x: 50, y: 180 },
    data: {
      label: 'Victim Wallet',
      role: 'victim',
      address: '0x5B83A491D2e84Fc11893c5d67E993B011429F012',
      chain: 'Ethereum',
      riskScore: 5,
      riskLevel: 'NEUTRAL',
      inboundUSD: 45000,
      outboundUSD: 42500,
      patterns: ['Direct Victim Depository'],
      firstSeen: '2026-08-10',
      lastSeen: '2026-09-25 13:45'
    }
  },
  {
    id: 'node-suspect',
    type: 'customNode',
    position: { x: 280, y: 180 },
    data: {
      label: 'Suspect Wallet (Reported)',
      role: 'suspect',
      address: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
      chain: 'Ethereum',
      riskScore: 92,
      riskLevel: 'CRITICAL',
      inboundUSD: 42500,
      outboundUSD: 42500,
      patterns: ['Rapid Forwarding', 'Primary Suspect Node'],
      firstSeen: '2026-09-25 13:45',
      lastSeen: '2026-09-25 13:47'
    }
  },
  {
    id: 'node-inter-a',
    type: 'customNode',
    position: { x: 520, y: 180 },
    data: {
      label: 'Intermediary A',
      role: 'intermediary',
      address: '0x22A7F9310D8e41aBc719D33b8E52A4F1',
      chain: 'Ethereum',
      riskScore: 84,
      riskLevel: 'HIGH',
      inboundUSD: 42500,
      outboundUSD: 41900,
      patterns: ['Fan-Out Dispersal', 'Layer 1 Forwarder'],
      firstSeen: '2026-09-25 13:47',
      lastSeen: '2026-09-25 13:53'
    }
  },
  {
    id: 'node-inter-b1',
    type: 'customNode',
    position: { x: 760, y: 80 },
    data: {
      label: 'Intermediary B1',
      role: 'intermediary',
      address: '0x91F562E34Caa8891cD82A2E6319FbB44',
      chain: 'Ethereum',
      riskScore: 78,
      riskLevel: 'HIGH',
      inboundUSD: 22000,
      outboundUSD: 21850,
      patterns: ['Layering Branch 1', 'Rapid Pass-through'],
      firstSeen: '2026-09-25 13:52',
      lastSeen: '2026-09-25 13:57'
    }
  },
  {
    id: 'node-inter-b2',
    type: 'customNode',
    position: { x: 760, y: 280 },
    data: {
      label: 'Intermediary B2',
      role: 'intermediary',
      address: '0x44C91901aBd4F82001e912440bA8812c',
      chain: 'Ethereum',
      riskScore: 76,
      riskLevel: 'HIGH',
      inboundUSD: 19900,
      outboundUSD: 19800,
      patterns: ['Layering Branch 2', 'Structured Splitting'],
      firstSeen: '2026-09-25 13:53',
      lastSeen: '2026-09-25 14:02'
    }
  },
  {
    id: 'node-consolidator',
    type: 'customNode',
    position: { x: 1020, y: 180 },
    data: {
      label: 'Consolidation Wallet',
      role: 'consolidator',
      address: '0x33A0F8114C9291bBcA1992019488aF8120',
      chain: 'Ethereum',
      riskScore: 94,
      riskLevel: 'CRITICAL',
      inboundUSD: 41500,
      outboundUSD: 41200,
      patterns: ['Multi-Branch Consolidation', 'Bridge Pre-staging'],
      firstSeen: '2026-09-25 14:02',
      lastSeen: '2026-09-25 14:11'
    }
  },
  {
    id: 'node-bridge',
    type: 'customNode',
    position: { x: 1260, y: 180 },
    data: {
      label: 'Bridge-X Protocol',
      role: 'bridge',
      address: '0x71092a09B829c9182C01984bbAa01934981E2911',
      chain: 'Ethereum → TRON',
      riskScore: 50,
      riskLevel: 'MEDIUM',
      inboundUSD: 41200,
      outboundUSD: 41050,
      patterns: ['Cross-Chain Protocol Lock', 'Smart Contract'],
      firstSeen: '2025-01-10',
      lastSeen: '2026-09-25 14:11'
    }
  },
  {
    id: 'node-tron-dest',
    type: 'customNode',
    position: { x: 1500, y: 180 },
    data: {
      label: 'TRON Destination',
      role: 'destination',
      address: 'TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7',
      chain: 'TRON',
      riskScore: 89,
      riskLevel: 'CRITICAL',
      inboundUSD: 41050,
      outboundUSD: 41000,
      patterns: ['Bridged Fund Receiver', 'VASP Funnel Stage'],
      firstSeen: '2026-09-25 14:19',
      lastSeen: '2026-09-25 14:27'
    }
  },
  {
    id: 'node-vasp-dep-1',
    type: 'customNode',
    position: { x: 1760, y: 90 },
    data: {
      label: 'VASP-X Deposit 01',
      role: 'vasp',
      address: 'TVX104DepositWallet01Alpha891273918237',
      chain: 'TRON',
      riskScore: 72,
      riskLevel: 'HIGH',
      inboundUSD: 32000,
      outboundUSD: 31980,
      patterns: ['VASP Deposit Proxy', 'Automated Sweep Target'],
      firstSeen: '2026-04-12',
      lastSeen: '2026-09-25 14:38'
    }
  },
  {
    id: 'node-vasp-dep-2',
    type: 'customNode',
    position: { x: 1760, y: 270 },
    data: {
      label: 'VASP-X Deposit 02',
      role: 'vasp',
      address: 'TVX104DepositWallet02Beta192837491028',
      chain: 'TRON',
      riskScore: 70,
      riskLevel: 'HIGH',
      inboundUSD: 9000,
      outboundUSD: 8995,
      patterns: ['VASP Deposit Proxy', 'Automated Sweep Target'],
      firstSeen: '2026-05-18',
      lastSeen: '2026-09-25 14:39'
    }
  },
  {
    id: 'node-vasp-master',
    type: 'customNode',
    position: { x: 2020, y: 180 },
    data: {
      label: 'VASP-X Hot Wallet Cluster',
      role: 'vasp',
      address: 'TVX104HotWalletMasterCluster991827419',
      chain: 'TRON',
      riskScore: 40,
      riskLevel: 'MEDIUM',
      inboundUSD: 18450000,
      outboundUSD: 17200000,
      patterns: ['Centralized Exchange Operational Hot Wallet', 'Internal Ledger Credit'],
      firstSeen: '2024-02-01',
      lastSeen: '2026-09-25 14:39'
    }
  }
];

export const INITIAL_GRAPH_EDGES: Edge[] = [
  {
    id: 'e-victim-suspect',
    source: 'node-victim',
    target: 'node-suspect',
    animated: true,
    label: '42,500 USDT (13:45 UTC)',
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    data: { amount: '$42,500', asset: 'USDT', time: '13:45 UTC', txHash: '0x3a4b91f0...' }
  },
  {
    id: 'e-suspect-inter-a',
    source: 'node-suspect',
    target: 'node-inter-a',
    animated: true,
    label: '42,500 USDT (13:47 UTC)',
    style: { stroke: '#ef4444', strokeWidth: 3 },
    data: { amount: '$42,500', asset: 'USDT', time: '13:47 UTC (2m 14s)', txHash: '0x8f2c3194...' }
  },
  {
    id: 'e-inter-a-b1',
    source: 'node-inter-a',
    target: 'node-inter-b1',
    animated: true,
    label: '22,000 USDT (13:52 UTC)',
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    data: { amount: '$22,000', asset: 'USDT', time: '13:52 UTC', txHash: '0x49da7811...' }
  },
  {
    id: 'e-inter-a-b2',
    source: 'node-inter-a',
    target: 'node-inter-b2',
    animated: true,
    label: '19,900 USDT (13:53 UTC)',
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    data: { amount: '$19,900', asset: 'USDT', time: '13:53 UTC', txHash: '0x17b389c0...' }
  },
  {
    id: 'e-b1-consolidator',
    source: 'node-inter-b1',
    target: 'node-consolidator',
    animated: true,
    label: '21,700 USDT (14:04 UTC)',
    style: { stroke: '#ef4444', strokeWidth: 2 },
    data: { amount: '$21,700', asset: 'USDT', time: '14:04 UTC', txHash: '0x2a091873...' }
  },
  {
    id: 'e-b2-consolidator',
    source: 'node-inter-b2',
    target: 'node-consolidator',
    animated: true,
    label: '19,800 USDT (14:02 UTC)',
    style: { stroke: '#ef4444', strokeWidth: 2 },
    data: { amount: '$19,800', asset: 'USDT', time: '14:02 UTC', txHash: '0x99238bc1...' }
  },
  {
    id: 'e-consolidator-bridge',
    source: 'node-consolidator',
    target: 'node-bridge',
    animated: true,
    label: '41,200 USDT (14:11 UTC)',
    style: { stroke: '#a855f7', strokeWidth: 3 },
    data: { amount: '$41,200', asset: 'USDT', time: '14:11 UTC', txHash: '0xbb819203...' }
  },
  {
    id: 'e-bridge-tron',
    source: 'node-bridge',
    target: 'node-tron-dest',
    animated: true,
    label: '41,050 TRC20 (14:19 UTC)',
    style: { stroke: '#06b6d4', strokeWidth: 3 },
    data: { amount: '$41,050', asset: 'USDT-TRC20', time: '14:19 UTC (8.3m transit)', txHash: '8491a0c8...' }
  },
  {
    id: 'e-tron-dep-1',
    source: 'node-tron-dest',
    target: 'node-vasp-dep-1',
    animated: true,
    label: '32,000 TRC20 (14:26 UTC)',
    style: { stroke: '#06b6d4', strokeWidth: 2 },
    data: { amount: '$32,000', asset: 'USDT-TRC20', time: '14:26 UTC', txHash: '19028374...' }
  },
  {
    id: 'e-tron-dep-2',
    source: 'node-tron-dest',
    target: 'node-vasp-dep-2',
    animated: true,
    label: '9,000 TRC20 (14:27 UTC)',
    style: { stroke: '#06b6d4', strokeWidth: 2 },
    data: { amount: '$9,000', asset: 'USDT-TRC20', time: '14:27 UTC', txHash: '38172039...' }
  },
  {
    id: 'e-dep1-master',
    source: 'node-vasp-dep-1',
    target: 'node-vasp-master',
    animated: false,
    label: 'Internal Sweep (31,980)',
    style: { stroke: '#38bdf8', strokeWidth: 2, strokeDasharray: '4 4' },
    data: { amount: '$31,980', asset: 'USDT-TRC20', time: '14:38 UTC', txHash: '91827391...' }
  },
  {
    id: 'e-dep2-master',
    source: 'node-vasp-dep-2',
    target: 'node-vasp-master',
    animated: false,
    label: 'Internal Sweep (8,995)',
    style: { stroke: '#38bdf8', strokeWidth: 2, strokeDasharray: '4 4' },
    data: { amount: '$8,995', asset: 'USDT-TRC20', time: '14:39 UTC', txHash: '0c81923e...' }
  }
];
