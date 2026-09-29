import { Investigation } from '../types';
import { DEMO_COMPLAINTS } from './demoComplaints';
import { DEMO_EVIDENCE } from './demoEvidence';
import { DEMO_AUDIT_TRAIL } from './demoAudit';
import { DEMO_VASP_X } from './demoVasps';

export const DEMO_INVESTIGATION_CASE_1042: Investigation = {
  caseId: 'CASE-2026-1042',
  complaint: DEMO_COMPLAINTS[0],
  status: 'ACTIVE INVESTIGATION',
  createdAt: '2026-09-25 13:45:00 UTC',
  reportedWallet: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
  chain: 'Ethereum',
  riskScore: 92,
  riskLevel: 'CRITICAL',
  attributionConfidence: 87,
  likelyVasp: 'VASP-X',
  totalVolumeTrackedUSD: 42500,
  intermediaryCount: 4,
  crossChainHopCount: 1,

  fraudDNA: {
    fanInIntensity: 42,
    fanOutIntensity: 88,
    transactionVelocity: 96,
    walletAge: 14, // very fresh wallet
    consolidationBehavior: 85,
    crossChainActivity: 92,
    exchangeProximity: 94,
    rapidForwarding: 98,
    addressReuse: 18,
    burstActivity: 86
  },

  dnaSummary: [
    {
      type: 'HIGH VELOCITY',
      title: 'HIGH VELOCITY',
      description: 'Funds forwarded within minutes of receipt (2m 14s latency, 3.8σ above baseline).'
    },
    {
      type: 'LAYERING SIGNAL',
      title: 'LAYERING SIGNAL',
      description: 'Funds split across multiple intermediary wallets in coordinated 2-layer fan-out.'
    },
    {
      type: 'CROSS-CHAIN SIGNAL',
      title: 'CROSS-CHAIN SIGNAL',
      description: 'Observed movement through Bridge-X protocol bridging Ethereum to TRON.'
    },
    {
      type: 'EXIT PROXIMITY',
      title: 'EXIT PROXIMITY',
      description: 'Funds eventually approach an identified VASP-X exchange deposit cluster.'
    },
    {
      type: 'CONSOLIDATION SIGNAL',
      title: 'CONSOLIDATION SIGNAL',
      description: 'Multiple wallets consolidate into a common downstream wallet prior to bridge lock.'
    }
  ],

  riskSignals: [
    {
      id: 'sig-01',
      signal: 'Rapid Forwarding',
      score: 21,
      maxScore: 25,
      weight: 20,
      value: 0.96,
      reason: '100% of received funds moved in under 135 seconds to intermediary.',
      evidenceIds: ['EV-1042-003'],
      severity: 'CRITICAL'
    },
    {
      id: 'sig-02',
      signal: 'Fan-Out Pattern',
      score: 17,
      maxScore: 20,
      weight: 15,
      value: 0.88,
      reason: 'Dispersal into 2 child addresses to evade single-transaction velocity threshold.',
      evidenceIds: ['EV-1042-004'],
      severity: 'HIGH'
    },
    {
      id: 'sig-03',
      signal: 'Consolidation Behavior',
      score: 15,
      maxScore: 15,
      weight: 10,
      value: 0.85,
      reason: 'Recombination of dispersed balances into common wallet 0x33A0...aF8120.',
      evidenceIds: ['EV-1042-005'],
      severity: 'HIGH'
    },
    {
      id: 'sig-04',
      signal: 'Cross-Chain Movement',
      score: 16,
      maxScore: 20,
      weight: 15,
      value: 0.92,
      reason: 'Cross-network hop detected from Ethereum to TRON via Bridge-X.',
      evidenceIds: ['EV-1042-006'],
      severity: 'CRITICAL'
    },
    {
      id: 'sig-05',
      signal: 'VASP Proximity',
      score: 18,
      maxScore: 20,
      weight: 15,
      value: 0.94,
      reason: 'Destination address direct interaction with VASP-X deposit infrastructure.',
      evidenceIds: ['EV-1042-007'],
      severity: 'CRITICAL'
    },
    {
      id: 'sig-06',
      signal: 'Address Clustering',
      score: 5,
      maxScore: 10,
      weight: 5,
      value: 0.60,
      reason: 'Gas funding parent shared across suspect and Intermediary A.',
      evidenceIds: ['EV-1042-002'],
      severity: 'MEDIUM'
    }
  ],

  routeHops: [
    {
      hopIndex: 0,
      fromRole: 'Victim Wallet',
      toRole: 'Suspect Reported Wallet',
      walletAddress: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
      shortAddress: '0x7A91...91F2',
      chain: 'Ethereum',
      timestamp: '2026-09-25 13:45:10 UTC',
      txHash: '0x3a4b91f0c2e9871ab93d11b854619f7cc8902be71a681c94d0e722883491ba01',
      amount: 42500,
      asset: 'USDT',
      patternDetected: 'Direct Victim Deposit',
      confidence: 99,
      reasonForRelevance: 'Primary reported wallet listed in victim NCRP complaint.',
      evidenceId: 'EV-1042-001'
    },
    {
      hopIndex: 1,
      fromRole: 'Suspect Wallet',
      toRole: 'Intermediary A',
      walletAddress: '0x22A7F9310D8e41aBc719D33b8E52A4F1',
      shortAddress: '0x22A7...A4F1',
      chain: 'Ethereum',
      timestamp: '2026-09-25 13:47:24 UTC',
      txHash: '0x8f2c3194a0d9e83120bc71a92e44837190bcaef91a78330198cd4501a91e42b8',
      amount: 42500,
      asset: 'USDT',
      patternDetected: 'Rapid Forwarding (2m 14s delay)',
      confidence: 95,
      reasonForRelevance: 'First layering hop. Complete balance forwarded immediately.',
      evidenceId: 'EV-1042-002'
    },
    {
      hopIndex: 2,
      fromRole: 'Intermediary A',
      toRole: 'Layering Intermediaries (B1 & B2)',
      walletAddress: '0x91F562E34Caa8891cD82A2E6319FbB44',
      shortAddress: '0x91F5...bB44',
      chain: 'Ethereum',
      timestamp: '2026-09-25 13:52:15 UTC',
      txHash: '0x49da781190bc2350a41d99e52701bcf39a018723910cbe8827391afdc3801ea9',
      amount: 22000,
      asset: 'USDT',
      patternDetected: 'Fan-Out Splitting',
      confidence: 91,
      reasonForRelevance: 'Amount structured into sub-threshold tranches.',
      evidenceId: 'EV-1042-003'
    },
    {
      hopIndex: 3,
      fromRole: 'Intermediary B Wallets',
      toRole: 'Consolidation Wallet',
      walletAddress: '0x33A0F8114C9291bBcA1992019488aF8120',
      shortAddress: '0x33A0...aF8120',
      chain: 'Ethereum',
      timestamp: '2026-09-25 14:04:45 UTC',
      txHash: '0x2a0918731be9023847192803bba918273910823471029381a9203948172930a6',
      amount: 41500,
      asset: 'USDT',
      patternDetected: 'Consolidation Merge',
      confidence: 94,
      reasonForRelevance: 'Recombined multi-branch funds into single preparatory wallet.',
      evidenceId: 'EV-1042-005'
    },
    {
      hopIndex: 4,
      fromRole: 'Consolidation Wallet',
      toRole: 'Cross-Chain Bridge Contract',
      walletAddress: '0x71092a09B829c9182C01984bbAa01934981E2911',
      shortAddress: '0x7109...E2911',
      chain: 'Ethereum',
      timestamp: '2026-09-25 14:11:30 UTC',
      txHash: '0xbb81920381720394817203948172039481720394817203948172039481720394',
      amount: 41200,
      asset: 'USDT',
      patternDetected: 'Bridge Lock Event',
      confidence: 96,
      reasonForRelevance: 'Exit from Ethereum network initiated via Bridge-X.',
      evidenceId: 'EV-1042-006'
    },
    {
      hopIndex: 5,
      fromRole: 'Bridge Relayer TRON',
      toRole: 'Destination Chain Wallet',
      walletAddress: 'TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7',
      shortAddress: 'TQ8d...4KpL7',
      chain: 'TRON',
      timestamp: '2026-09-25 14:19:50 UTC',
      txHash: '8491a0c81923e01928374a91827390a18274092b3c01928374a5819203817203',
      amount: 41050,
      asset: 'USDT-TRC20',
      patternDetected: 'Cross-Chain Mint/Release',
      confidence: 89,
      reasonForRelevance: 'Receiver of bridged funds on TRON blockchain.',
      evidenceId: 'EV-1042-009'
    },
    {
      hopIndex: 6,
      fromRole: 'Destination Chain Wallet',
      toRole: 'VASP Cluster Deposit 01 & 02',
      walletAddress: 'TVX104DepositWallet01Alpha891273918237',
      shortAddress: 'TVX104...8237',
      chain: 'TRON',
      timestamp: '2026-09-25 14:26:12 UTC',
      txHash: '19028374a5819203817203948172039481720394817203948172039481720394',
      amount: 41000,
      asset: 'USDT-TRC20',
      patternDetected: 'VASP Deposit Funnel',
      confidence: 87,
      reasonForRelevance: 'Identified as known deposit sweep proxy for VASP-X exchange.',
      evidenceId: 'EV-1042-007'
    },
    {
      hopIndex: 7,
      fromRole: 'VASP Deposit Wallets',
      toRole: 'Likely Exchange Exit (Master Sweep)',
      walletAddress: 'TVX104HotWalletMasterCluster991827419',
      shortAddress: 'TVX104...7419',
      chain: 'TRON',
      timestamp: '2026-09-25 14:38:40 UTC',
      txHash: '918273910823471029381a9203948172930a6718a9934f0d2c9182377b19a008',
      amount: 40975,
      asset: 'USDT-TRC20',
      patternDetected: 'Hot Wallet Internal Sweep',
      confidence: 87,
      reasonForRelevance: 'Terminal off-ramp infrastructure. Internal ledger credit stage.',
      evidenceId: 'EV-1042-010'
    }
  ],

  crossChain: {
    id: 'CCH-1042',
    sourceChain: 'Ethereum',
    destinationChain: 'TRON',
    bridgeName: 'Bridge-X Protocol',
    bridgeContract: '0x71092a09B829c9182C01984bbAa01934981E2911',
    bridgeTxHash: '0xbb81920381720394817203948172039481720394817203948172039481720394',
    destinationTxHash: '8491a0c81923e01928374a91827390a18274092b3c01928374a5819203817203',
    timestamp: '2026-09-25 14:11:30 - 14:19:50 UTC',
    sourceAmount: '41,200 USDT (ERC-20)',
    destinationAmount: '41,050 USDT (TRC-20)',
    observedValueINR: '₹35.2 Lakh',
    confidence: 84,
    status: 'COMPLETED',
    delayMinutes: 8.3
  },

  vaspAttribution: DEMO_VASP_X,

  evidenceItems: DEMO_EVIDENCE,

  recommendations: [
    {
      id: 'REC-01',
      title: 'Review Consolidation Wallet (0x33A0...aF8120)',
      priority: 'CRITICAL',
      reason: 'Receives aggregated funds from 3 distinct intermediary branches within 15 minutes of initial offense.',
      evidenceIds: ['EV-1042-005', 'EV-1042-006'],
      status: 'PENDING',
      actionableStep: 'Trace gas provider funding tx for 0x33A0 to uncover central operator syndicate wallet.'
    },
    {
      id: 'REC-02',
      title: 'Preserve Transaction Evidence & Hash Chain',
      priority: 'HIGH',
      reason: 'Record transaction hashes, block receipts, and time-stamped state proofs for judicial filing.',
      evidenceIds: ['EV-1042-002', 'EV-1042-003', 'EV-1042-008'],
      status: 'ACTIONED',
      actionableStep: 'Export cryptographically signed evidence bundle JSON from Evidence Vault.'
    },
    {
      id: 'REC-03',
      title: 'Review Cross-Chain Hop (Ethereum → TRON)',
      priority: 'HIGH',
      reason: 'Funds moved across Bridge-X protocol to obfuscate EVM tracing and leverage lower-fee high-velocity TRON rail.',
      evidenceIds: ['EV-1042-006', 'EV-1042-009'],
      status: 'REVIEWED',
      actionableStep: 'Correlate Bridge-X relayer logs with IP/timestamp of deposit transaction caller.'
    },
    {
      id: 'REC-04',
      title: 'Examine VASP-X Cluster (VX-104)',
      priority: 'CRITICAL',
      reason: 'Destination addresses TVX104...8237 and TVX104...1028 are identified deposit sweep addresses for VASP-X.',
      evidenceIds: ['EV-1042-007', 'EV-1042-010'],
      status: 'PENDING',
      actionableStep: 'Prepare Section 91 CrPC / MLAT inquiry request for KYC and withdrawal logs associated with deposit addresses.'
    },
    {
      id: 'REC-05',
      title: 'Correlate Complaint Evidence & Timings',
      priority: 'MEDIUM',
      reason: 'Compare reported amount (42,500 USDT) and victim transfer timestamp (13:45 UTC) against on-chain block confirmations.',
      evidenceIds: ['EV-1042-001', 'EV-1042-002'],
      status: 'REVIEWED',
      actionableStep: 'Verify bank-to-crypto P2P entry rail if victim acquired USDT immediately before sending.'
    }
  ],

  auditTrail: DEMO_AUDIT_TRAIL
};
