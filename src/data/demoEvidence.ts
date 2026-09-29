import { EvidenceItem } from '../types';

export const DEMO_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EV-1042-001',
    caseId: 'CASE-2026-1042',
    type: 'Complaint Record',
    description: 'Victim initial cyber complaint lodged on NCRP portal citing fraudulent Telegram investment scheme.',
    source: 'NCRP Integration Adapter — DEMO',
    collectedAt: '2026-09-25 13:50:00 UTC',
    sha256Hash: 'a98f12c90e38d71629fa817290bc918237190283cba1902847192803bba91827',
    integrityStatus: 'VERIFIED',
    rawPayload: {
      ncrpRef: 'NCRP-2026-DL-891024',
      victimId: 'VIC-90214',
      reportedLossINR: 3570000,
      reportedWallet: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
      reportedChain: 'Ethereum',
      crimeCategory: 'Investment Fraud'
    }
  },
  {
    id: 'EV-1042-002',
    caseId: 'CASE-2026-1042',
    type: 'Transaction Hash',
    description: 'On-chain deposit of 42,500 USDT from victim address into suspect collection wallet.',
    source: 'Blockchain Indexer — DEMO',
    collectedAt: '2026-09-25 13:51:20 UTC',
    sha256Hash: '0x3a4b91f0c2e9871ab93d11b854619f7cc8902be71a681c94d0e722883491ba01',
    integrityStatus: 'IMMUTABLE',
    rawPayload: {
      blockNumber: 20819203,
      confirmations: 1420,
      tokenSymbol: 'USDT',
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      gasUsedUSD: 4.82
    }
  },
  {
    id: 'EV-1042-003',
    caseId: 'CASE-2026-1042',
    type: 'Wallet Address',
    description: 'Rapid forwarding execution: Suspect forwarded 100% of funds within 134 seconds (2m 14s).',
    source: 'Analytics Engine',
    collectedAt: '2026-09-25 13:52:00 UTC',
    sha256Hash: '8f2c3194a0d9e83120bc71a92e44837190bcaef91a78330198cd4501a91e42b8',
    integrityStatus: 'VERIFIED',
    rawPayload: {
      targetWallet: '0x22A7F9310D8e41aBc719D33b8E52A4F1',
      forwardDelaySeconds: 134,
      velocityZScore: 3.82,
      riskContribution: '+21'
    }
  },
  {
    id: 'EV-1042-004',
    caseId: 'CASE-2026-1042',
    type: 'Graph Snapshot',
    description: 'Layering pattern detection snapshot: 1-to-2 fan-out split across Intermediaries B1 & B2.',
    source: 'Analytics Engine',
    collectedAt: '2026-09-25 14:00:15 UTC',
    sha256Hash: 'c7b919a00293817f0923847a918293cba98127390a18274092b3c01928374a58',
    integrityStatus: 'VERIFIED',
    rawPayload: {
      subgraphNodeCount: 5,
      subgraphEdgeCount: 4,
      layerDepth: 2,
      entropyMetric: 0.89
    }
  },
  {
    id: 'EV-1042-005',
    caseId: 'CASE-2026-1042',
    type: 'Timestamp Correlation',
    description: 'Consolidation merge: Split tranches (21,700 USDT + 19,800 USDT) recombined at 0x33A0...aF8120.',
    source: 'Analytics Engine',
    collectedAt: '2026-09-25 14:06:00 UTC',
    sha256Hash: '71092a09B829c9182C01984bbAa01934981E29112a0918731be9023847192803',
    integrityStatus: 'CORRELATED',
    rawPayload: {
      consolidatorAddress: '0x33A0F8114C9291bBcA1992019488aF8120',
      totalRecombinedUSD: 41500,
      retentionMinutes: 6.75
    }
  },
  {
    id: 'EV-1042-006',
    caseId: 'CASE-2026-1042',
    type: 'Bridge Proof',
    description: 'Cross-chain lock/mint proof: Ethereum deposit contract locked funds; TRON relayer minted equivalent USDT-TRC20.',
    source: 'Blockchain Indexer — DEMO',
    collectedAt: '2026-09-25 14:21:00 UTC',
    sha256Hash: 'bb81920381720394817203948172039481720394817203948172039481720394',
    integrityStatus: 'IMMUTABLE',
    rawPayload: {
      bridgeName: 'Bridge-X Protocol',
      sourceChain: 'Ethereum',
      destChain: 'TRON',
      sourceTx: '0xbb81920381720394...',
      destTx: '8491a0c81923e019...',
      timeElapsedSeconds: 500
    }
  },
  {
    id: 'EV-1042-007',
    caseId: 'CASE-2026-1042',
    type: 'VASP Attribution',
    description: 'Attribution confidence calculated at 87% linking TRON deposits to VASP-X exchange cluster VX-104.',
    source: 'VASP Intelligence',
    collectedAt: '2026-09-25 14:30:00 UTC',
    sha256Hash: '19028374a5819203817203948172039481720394817203948172039481720394',
    integrityStatus: 'CORRELATED',
    rawPayload: {
      targetVASP: 'VASP-X',
      confidenceScore: 87,
      proximiyScore: 94,
      clusterSize: 142,
      legalDisclaimer: 'Investigative lead only - not proof of ownership'
    }
  },
  {
    id: 'EV-1042-008',
    caseId: 'CASE-2026-1042',
    type: 'Risk Assessment',
    description: 'Comprehensive risk composite score 92/100 (CRITICAL) with explainable multi-signal breakdown.',
    source: 'Analytics Engine',
    collectedAt: '2026-09-25 14:32:00 UTC',
    sha256Hash: '91f0c2e9871ab93d11b854619f7cc8902be71a681c94d0e722883491ba01092a',
    integrityStatus: 'VERIFIED',
    rawPayload: {
      compositeScore: 92,
      riskLevel: 'CRITICAL',
      ruleMatches: 6,
      modelType: 'Heuristic Multi-Factor Classifier v2.4'
    }
  }
];
