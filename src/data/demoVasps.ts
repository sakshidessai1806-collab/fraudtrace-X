import { VASPAttributionData } from '../types';

export const DEMO_VASP_X: VASPAttributionData = {
  vaspId: 'VASP-X',
  vaspName: 'VASP-X Global Exchange Platform',
  clusterTag: 'VX-104',
  attributionConfidence: 87,
  clusterAddressCount: 142,
  signals: [
    {
      name: 'Cluster Proximity',
      score: 94,
      description: 'Destination addresses are 1 hop from verified high-volume sweep infrastructure.'
    },
    {
      name: 'Deposit Pattern Similarity',
      score: 88,
      description: 'Zero balance retention post-deposit; instant scheduled sweep within 12 minutes.'
    },
    {
      name: 'Transaction Timing',
      score: 82,
      description: 'Batch sweep schedule aligns identically with VASP-X UTC hourly consolidation window.'
    },
    {
      name: 'Consolidation Relationship',
      score: 85,
      description: 'Direct fund funneling into master cluster cold storage reserve address.'
    },
    {
      name: 'Historical Interaction',
      score: 76,
      description: 'Address format and contract interaction bytecode matches VASP-X TRC-20 factory.'
    }
  ],
  clusterWallets: [
    {
      address: 'TVX104DepositWallet01Alpha891273918237',
      role: 'Deposit Wallet 01',
      balanceUSD: 0,
      activityTag: 'Swept to Hot Wallet (32,000 USDT)'
    },
    {
      address: 'TVX104DepositWallet02Beta192837491028',
      role: 'Deposit Wallet 02',
      balanceUSD: 0,
      activityTag: 'Swept to Hot Wallet (9,000 USDT)'
    },
    {
      address: 'TVX104DepositWallet03Gamma771928371902',
      role: 'Deposit Wallet 03',
      balanceUSD: 14200,
      activityTag: 'Active Unswept Balance'
    },
    {
      address: 'TVX104HotWalletMasterCluster991827419',
      role: 'Hot Wallet',
      balanceUSD: 18450920,
      activityTag: 'Active Operational Hot Wallet'
    },
    {
      address: 'TVX104TreasuryConsolidator4410293817',
      role: 'Consolidation Wallet',
      balanceUSD: 84200150,
      activityTag: 'Institutional Reserve Vault'
    }
  ]
};

export const OTHER_VASPS = [
  {
    id: 'VASP-Y',
    name: 'VASP-Y Tier-1 Offshore Exchange',
    clusterTag: 'VY-208',
    confidenceScore: 32,
    reason: 'Secondary off-ramp interaction seen in related historical scam cluster.'
  },
  {
    id: 'VASP-Z',
    name: 'VASP-Z P2P OTC Escrow Hub',
    clusterTag: 'VZ-901',
    confidenceScore: 19,
    reason: 'Occasional bridging gateway with intermittent synthetic activity.'
  }
];
