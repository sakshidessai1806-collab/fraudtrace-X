import { Investigation, Recommendation } from '../types';

export function generateRecommendations(investigation: Partial<Investigation>): Recommendation[] {
  const recommendations: Recommendation[] = [
    {
      id: 'REC-01',
      title: 'Review Consolidation Wallet (0x33A0...aF8120)',
      priority: 'CRITICAL',
      reason: 'Receives funds from 3 distinct intermediary layering branches within 15 minutes of initial offense.',
      evidenceIds: ['EV-1042-005', 'EV-1042-006'],
      status: 'PENDING',
      actionableStep: 'Trace gas provider funding transaction for 0x33A0 to uncover central operator syndicate wallet.'
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
  ];

  return recommendations;
}
