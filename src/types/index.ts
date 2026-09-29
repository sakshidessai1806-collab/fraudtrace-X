export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type BlockchainNetwork = 'Ethereum' | 'TRON' | 'Bitcoin' | 'Polygon' | 'BSC';

export type FraudType = 
  | 'Investment Fraud'
  | 'Task Fraud'
  | 'Phishing'
  | 'Ransomware'
  | 'Sextortion'
  | 'Darknet Transaction'
  | 'Other';

export interface Wallet {
  address: string;
  shortAddress: string;
  chain: BlockchainNetwork;
  role: 'victim' | 'suspect' | 'intermediary' | 'consolidator' | 'bridge' | 'destination' | 'vasp_deposit' | 'vasp_cluster';
  firstSeen: string;
  lastSeen: string;
  inboundTxCount: number;
  outboundTxCount: number;
  totalVolumeUSD: number;
  riskContribution: number;
  detectedPatterns: string[];
  entityTag?: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  txHash: string;
  timestamp: string;
  fromAddress: string;
  toAddress: string;
  chain: BlockchainNetwork;
  asset: string;
  amount: number;
  amountUSD: number;
  amountINR: number;
  pattern: 'Direct Transfer' | 'Rapid Forward' | 'Fan-Out' | 'Fan-In' | 'Cross-Chain Bridge' | 'Consolidation' | 'VASP Deposit' | 'Internal Sweep';
  riskLevel: RiskLevel;
  delayFromPreviousSec?: number;
  hopNumber?: number;
  evidenceId?: string;
}

export interface RiskSignal {
  id: string;
  signal: string;
  score: number;
  maxScore: number;
  weight: number;
  value: number; // 0 to 1
  reason: string;
  evidenceIds: string[];
  severity: RiskLevel;
}

export interface FraudDNADimensions {
  fanInIntensity: number; // 0 - 100
  fanOutIntensity: number;
  transactionVelocity: number;
  walletAge: number;
  consolidationBehavior: number;
  crossChainActivity: number;
  exchangeProximity: number;
  rapidForwarding: number;
  addressReuse: number;
  burstActivity: number;
}

export interface InvestigationRouteHop {
  hopIndex: number;
  fromRole: string;
  toRole: string;
  walletAddress: string;
  shortAddress: string;
  chain: BlockchainNetwork;
  timestamp: string;
  txHash: string;
  amount: number;
  asset: string;
  patternDetected: string;
  confidence: number;
  reasonForRelevance: string;
  evidenceId: string;
}

export interface CrossChainHop {
  id: string;
  sourceChain: BlockchainNetwork;
  destinationChain: BlockchainNetwork;
  bridgeName: string;
  bridgeContract: string;
  bridgeTxHash: string;
  destinationTxHash: string;
  timestamp: string;
  sourceAmount: string;
  destinationAmount: string;
  observedValueINR: string;
  confidence: number;
  status: 'COMPLETED' | 'CONFIRMED' | 'PENDING';
  delayMinutes: number;
}

export interface VASPAttributionData {
  vaspId: string;
  vaspName: string;
  clusterTag: string;
  attributionConfidence: number; // e.g. 87
  clusterAddressCount: number;
  signals: {
    name: string;
    score: number; // 0 - 100
    description: string;
  }[];
  clusterWallets: {
    address: string;
    role: 'Deposit Wallet 01' | 'Deposit Wallet 02' | 'Deposit Wallet 03' | 'Hot Wallet' | 'Consolidation Wallet' | 'Treasury';
    balanceUSD: number;
    activityTag: string;
  }[];
}

export interface EvidenceItem {
  id: string; // e.g. EV-1042-001
  caseId: string;
  type: 'Transaction Hash' | 'Wallet Address' | 'Timestamp Correlation' | 'Graph Snapshot' | 'VASP Attribution' | 'Risk Assessment' | 'Complaint Record' | 'Bridge Proof';
  description: string;
  source: 'Blockchain Indexer — DEMO' | 'NCRP Integration Adapter — DEMO' | 'Analytics Engine' | 'VASP Intelligence';
  collectedAt: string;
  sha256Hash: string;
  integrityStatus: 'VERIFIED' | 'IMMUTABLE' | 'CORRELATED';
  rawPayload: Record<string, any>;
}

export interface Recommendation {
  id: string;
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  reason: string;
  evidenceIds: string[];
  status: 'PENDING' | 'REVIEWED' | 'ACTIONED';
  actionableStep: string;
  investigatorNotes?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: 'LEA Analyst' | 'System' | 'Analytics Engine' | 'NCRP Integration Adapter';
  action: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'ALERT';
}

export interface AlertItem {
  id: string;
  caseId: string;
  title: string;
  severity: RiskLevel;
  type: 'Cross-chain movement' | 'Rapid forwarding' | 'VASP proximity' | 'Large consolidation' | 'Fan-out burst';
  timestamp: string;
  description: string;
  isAcknowledged: boolean;
  relatedAddress: string;
  evidenceId: string;
}

export interface Complaint {
  id: string;
  ncrpReference: string;
  fraudType: FraudType;
  victimReportDate: string;
  reportedWallet: string;
  blockchain: BlockchainNetwork;
  reportedAmount: number;
  currency: string;
  reportedAmountINR: number;
  complaintDescription: string;
  victimContactState: string;
  acknowledgementNumber: string;
  status: 'INGESTED' | 'UNDER_ANALYSIS' | 'INVESTIGATION_ACTIVE' | 'RESOLVED';
  createdAt: string;
}

export interface Investigation {
  caseId: string;
  complaint: Complaint;
  status: 'ACTIVE INVESTIGATION' | 'EVIDENCE_REVIEW' | 'CHARGE_SHEET_PREP' | 'CLOSED';
  createdAt: string;
  reportedWallet: string;
  chain: BlockchainNetwork;
  riskScore: number; // 92
  riskLevel: RiskLevel;
  attributionConfidence: number; // 87
  likelyVasp: string;
  totalVolumeTrackedUSD: number;
  intermediaryCount: number;
  crossChainHopCount: number;
  fraudDNA: FraudDNADimensions;
  dnaSummary: {
    title: string;
    description: string;
    type: 'HIGH VELOCITY' | 'LAYERING SIGNAL' | 'CROSS-CHAIN SIGNAL' | 'EXIT PROXIMITY' | 'CONSOLIDATION SIGNAL';
  }[];
  riskSignals: RiskSignal[];
  routeHops: InvestigationRouteHop[];
  crossChain: CrossChainHop;
  vaspAttribution: VASPAttributionData;
  evidenceItems: EvidenceItem[];
  recommendations: Recommendation[];
  auditTrail: AuditEvent[];
}
