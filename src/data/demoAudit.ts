import { AuditEvent } from '../types';

export const DEMO_AUDIT_TRAIL: AuditEvent[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-09-25 13:41:00 UTC',
    actor: 'NCRP Integration Adapter',
    action: 'Complaint Ingestion',
    details: 'Received electronic referral NCRP-2026-DL-891024; mapped victim suspect wallet.',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-09-25 13:42:15 UTC',
    actor: 'LEA Analyst',
    action: 'Investigation Initiated',
    details: 'Assigned CASE-2026-1042 to I4C Cyber Forensics Desk 4; verified reported parameters.',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-09-25 13:42:48 UTC',
    actor: 'Analytics Engine',
    action: 'Blockchain Indexer Sync',
    details: 'Fetched 18 historical and downstream transactions for wallet 0x7A91...91F2 on Ethereum.',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-004',
    timestamp: '2026-09-25 13:43:10 UTC',
    actor: 'Analytics Engine',
    action: 'Graph Topology Built',
    details: 'Constructed multi-hop topological graph with 11 nodes, 13 directed flow edges.',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-005',
    timestamp: '2026-09-25 13:43:35 UTC',
    actor: 'Analytics Engine',
    action: 'Cross-Chain Hop Detected',
    details: 'Identified Bridge-X contract lock event and TRON mint matching timestamp & volume.',
    status: 'WARNING'
  },
  {
    id: 'AUD-006',
    timestamp: '2026-09-25 13:43:55 UTC',
    actor: 'Analytics Engine',
    action: 'VASP Attribution Computed',
    details: 'Matched destination cluster VX-104 with 87% attribution confidence score to VASP-X.',
    status: 'ALERT'
  },
  {
    id: 'AUD-007',
    timestamp: '2026-09-25 13:44:12 UTC',
    actor: 'System',
    action: 'Fraud DNA Fingerprint Generated',
    details: 'Computed 10-dimension behavioral vector; flagged HIGH VELOCITY and LAYERING signals.',
    status: 'ALERT'
  },
  {
    id: 'AUD-008',
    timestamp: '2026-09-25 13:44:40 UTC',
    actor: 'System',
    action: 'Recommendations Generated',
    details: 'Synthesized 5 actionable next-best investigative steps for preservation and subpoena.',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-009',
    timestamp: '2026-09-25 14:15:20 UTC',
    actor: 'LEA Analyst',
    action: 'Evidence Integrity Check',
    details: 'Validated SHA-256 hashes for EV-1042-001 through EV-1042-008; immutable chain confirmed.',
    status: 'SUCCESS'
  }
];
