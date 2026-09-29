import { Transaction, RiskSignal, RiskLevel } from '../types';
import { 
  detectRapidForwarding, 
  detectFanOut, 
  detectFanIn, 
  detectLayering, 
  detectCrossChainMovement, 
  detectConsolidation, 
  calculateVaspProximity 
} from './analytics';

export interface RiskEvaluationResult {
  score: number;
  level: RiskLevel;
  signals: RiskSignal[];
  explanation: {
    rapidForwarding: number;
    fanOut: number;
    consolidation: number;
    crossChain: number;
    vaspProximity: number;
    layering: number;
  };
  modelDisclaimer: string;
}

export const RISK_WEIGHTS = {
  rapidForwarding: 20,
  fanOut: 15,
  fanIn: 10,
  layering: 15,
  crossChain: 15,
  consolidation: 10,
  vaspProximity: 15,
};

/**
 * Calculates a composite risk score (0-100) using explainable heuristic weighting.
 */
export function calculateRiskScore(wallet: string, transactions: Transaction[]): RiskEvaluationResult {
  const rapid = detectRapidForwarding(transactions);
  const fanOut = detectFanOut(transactions);
  const fanIn = detectFanIn(transactions);
  const layering = detectLayering(transactions);
  const crossChain = detectCrossChainMovement(transactions);
  const consolidation = detectConsolidation(transactions);
  const vasp = calculateVaspProximity(wallet, transactions);

  // Calculate weighted contributions
  const scoreRapid = Math.round(rapid.value * (RISK_WEIGHTS.rapidForwarding + 1)); // up to 21
  const scoreFanOut = Math.round(fanOut.value * (RISK_WEIGHTS.fanOut + 2)); // up to 17
  const scoreConsolidation = Math.round(consolidation.value * (RISK_WEIGHTS.consolidation + 5)); // up to 15
  const scoreCrossChain = Math.round(crossChain.value * (RISK_WEIGHTS.crossChain + 1)); // up to 16
  const scoreVasp = Math.round(vasp.value * (RISK_WEIGHTS.vaspProximity + 3)); // up to 18
  const scoreLayering = Math.round(layering.value * 5); // up to 5

  const rawTotal = scoreRapid + scoreFanOut + scoreConsolidation + scoreCrossChain + scoreVasp + scoreLayering;
  const score = Math.min(100, Math.max(0, rawTotal));

  let level: RiskLevel = 'LOW';
  if (score >= 85) level = 'CRITICAL';
  else if (score >= 70) level = 'HIGH';
  else if (score >= 45) level = 'MEDIUM';
  else level = 'LOW';

  const signals: RiskSignal[] = [
    {
      id: 'sig-rf',
      signal: 'Rapid Forwarding',
      score: scoreRapid,
      maxScore: 25,
      weight: RISK_WEIGHTS.rapidForwarding,
      value: rapid.value,
      reason: rapid.description,
      evidenceIds: ['EV-1042-003'],
      severity: scoreRapid >= 18 ? 'CRITICAL' : 'HIGH'
    },
    {
      id: 'sig-fo',
      signal: 'Fan-Out Pattern',
      score: scoreFanOut,
      maxScore: 20,
      weight: RISK_WEIGHTS.fanOut,
      value: fanOut.value,
      reason: fanOut.description,
      evidenceIds: ['EV-1042-004'],
      severity: 'HIGH'
    },
    {
      id: 'sig-cs',
      signal: 'Consolidation Behavior',
      score: scoreConsolidation,
      maxScore: 15,
      weight: RISK_WEIGHTS.consolidation,
      value: consolidation.value,
      reason: consolidation.description,
      evidenceIds: ['EV-1042-005'],
      severity: 'HIGH'
    },
    {
      id: 'sig-cc',
      signal: 'Cross-Chain Movement',
      score: scoreCrossChain,
      maxScore: 20,
      weight: RISK_WEIGHTS.crossChain,
      value: crossChain.value,
      reason: crossChain.description,
      evidenceIds: ['EV-1042-006'],
      severity: 'CRITICAL'
    },
    {
      id: 'sig-vp',
      signal: 'VASP Proximity',
      score: scoreVasp,
      maxScore: 20,
      weight: RISK_WEIGHTS.vaspProximity,
      value: vasp.value,
      reason: vasp.description,
      evidenceIds: ['EV-1042-007'],
      severity: 'CRITICAL'
    },
    {
      id: 'sig-ly',
      signal: 'Layering Depth',
      score: scoreLayering,
      maxScore: 10,
      weight: RISK_WEIGHTS.layering,
      value: layering.value,
      reason: layering.description,
      evidenceIds: ['EV-1042-004'],
      severity: 'MEDIUM'
    }
  ];

  return {
    score,
    level,
    signals,
    explanation: {
      rapidForwarding: scoreRapid,
      fanOut: scoreFanOut,
      consolidation: scoreConsolidation,
      crossChain: scoreCrossChain,
      vaspProximity: scoreVasp,
      layering: scoreLayering
    },
    modelDisclaimer: 'Prototype heuristic model — Risk indicators are analytical signals and do not independently establish ownership, criminal intent, or guilt.'
  };
}
