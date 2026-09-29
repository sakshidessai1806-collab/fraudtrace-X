import { Complaint } from '../types';

export const DEMO_COMPLAINTS: Complaint[] = [
  {
    id: 'CASE-2026-1042',
    ncrpReference: 'NCRP-2026-DL-891024',
    fraudType: 'Investment Fraud',
    victimReportDate: '2026-09-25 13:40 UTC',
    reportedWallet: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
    blockchain: 'Ethereum',
    reportedAmount: 42500,
    currency: 'USDT',
    reportedAmountINR: 3570000,
    victimContactState: 'Delhi NCR',
    acknowledgementNumber: 'ACK-I4C-98214-2026',
    complaintDescription: 'Victim was induced into depositing 42,500 USDT into fraudulent AI trading arbitrage portal via Telegram group. Wallet was provided as official liquidity pool address.',
    status: 'INVESTIGATION_ACTIVE',
    createdAt: '2026-09-25 13:45:00 UTC'
  },
  {
    id: 'CASE-2026-1039',
    ncrpReference: 'NCRP-2026-MH-710923',
    fraudType: 'Task Fraud',
    victimReportDate: '2026-09-24 18:20 UTC',
    reportedWallet: 'TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7',
    blockchain: 'TRON',
    reportedAmount: 18200,
    currency: 'USDT-TRC20',
    reportedAmountINR: 1528800,
    victimContactState: 'Maharashtra',
    acknowledgementNumber: 'ACK-I4C-71092-2026',
    complaintDescription: 'Victim assigned daily video rating tasks and requested to top up balance for higher commission tier. Withdrawal access blocked upon reaching high sum.',
    status: 'UNDER_ANALYSIS',
    createdAt: '2026-09-24 18:30:00 UTC'
  },
  {
    id: 'CASE-2026-1034',
    ncrpReference: 'NCRP-2026-KA-441098',
    fraudType: 'Phishing',
    victimReportDate: '2026-09-23 11:15 UTC',
    reportedWallet: '0x1928bF9023cBa901928374a58192038172039481',
    blockchain: 'Ethereum',
    reportedAmount: 29400,
    currency: 'USDC',
    reportedAmountINR: 2469600,
    victimContactState: 'Karnataka',
    acknowledgementNumber: 'ACK-I4C-44109-2026',
    complaintDescription: 'Victim wallet drained through malicious permit2 smart contract approval signed on counterfeit DeFi token claim website.',
    status: 'INVESTIGATION_ACTIVE',
    createdAt: '2026-09-23 11:30:00 UTC'
  },
  {
    id: 'CASE-2026-1028',
    ncrpReference: 'NCRP-2026-TN-330192',
    fraudType: 'Ransomware',
    victimReportDate: '2026-09-21 09:00 UTC',
    reportedWallet: 'bc1qa98127390a18274092b3c01928374a58192038',
    blockchain: 'Bitcoin',
    reportedAmount: 1.85,
    currency: 'BTC',
    reportedAmountINR: 10452500,
    victimContactState: 'Tamil Nadu',
    acknowledgementNumber: 'ACK-I4C-33019-2026',
    complaintDescription: 'Hospital diagnostic laboratory systems encrypted by BlackBasta strain; decryptor ransom paid to victim-provided Bitcoin address.',
    status: 'INGESTED',
    createdAt: '2026-09-21 09:30:00 UTC'
  }
];

export const MOCK_NCRP_SIMULATED_COMPLAINT: Complaint = {
  id: 'CASE-2026-1048',
  ncrpReference: 'NCRP-2026-GJ-902188',
  fraudType: 'Investment Fraud',
  victimReportDate: '2026-09-26 15:30 UTC',
  reportedWallet: '0x49da781190bc2350a41d99e52701bcf39a018723',
  blockchain: 'Ethereum',
  reportedAmount: 38000,
  currency: 'USDT',
  reportedAmountINR: 3192000,
  victimContactState: 'Gujarat',
  acknowledgementNumber: 'ACK-I4C-90218-2026',
  complaintDescription: 'SIMULATED NCRP FEED: Victim lured via deceptive WhatsApp group trading recommendation. Prompts rapid transfer to purported broker escrow wallet.',
  status: 'INGESTED',
  createdAt: '2026-09-26 15:35:00 UTC'
};
