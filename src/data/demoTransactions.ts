import { Transaction } from '../types';

export const DEMO_TRANSACTIONS: Transaction[] = [
  // 1. Victim to Suspect
  {
    id: 'tx-001',
    txHash: '0x3a4b91f0c2e9871ab93d11b854619f7cc8902be71a681c94d0e722883491ba01',
    timestamp: '2026-09-25 13:45:10 UTC',
    fromAddress: '0x5B83A491D2e84Fc11893c5d67E993B011429F012', // Victim
    toAddress: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2', // Suspect Reported
    chain: 'Ethereum',
    asset: 'USDT',
    amount: 42500,
    amountUSD: 42500,
    amountINR: 3570000,
    pattern: 'Direct Transfer',
    riskLevel: 'MEDIUM',
    evidenceId: 'EV-1042-001',
    hopNumber: 0
  },
  // 2. Suspect Rapid Forward to Intermediary A
  {
    id: 'tx-002',
    txHash: '0x8f2c3194a0d9e83120bc71a92e44837190bcaef91a78330198cd4501a91e42b8',
    timestamp: '2026-09-25 13:47:24 UTC',
    fromAddress: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2', // Suspect
    toAddress: '0x22A7F9310D8e41aBc719D33b8E52A4F1', // Intermediary A
    chain: 'Ethereum',
    asset: 'USDT',
    amount: 42500,
    amountUSD: 42500,
    amountINR: 3570000,
    pattern: 'Rapid Forward',
    riskLevel: 'CRITICAL',
    delayFromPreviousSec: 134, // 2m 14s
    evidenceId: 'EV-1042-002',
    hopNumber: 1
  },
  // 3. Suspect / Intermediary A Fan-Out to Intermediary B1 & B2
  {
    id: 'tx-003',
    txHash: '0x49da781190bc2350a41d99e52701bcf39a018723910cbe8827391afdc3801ea9',
    timestamp: '2026-09-25 13:52:15 UTC',
    fromAddress: '0x22A7F9310D8e41aBc719D33b8E52A4F1', // Intermediary A
    toAddress: '0x91F562E34Caa8891cD82A2E6319FbB44', // Intermediary B1
    chain: 'Ethereum',
    asset: 'USDT',
    amount: 22000,
    amountUSD: 22000,
    amountINR: 1848000,
    pattern: 'Fan-Out',
    riskLevel: 'HIGH',
    delayFromPreviousSec: 291, // 4m 51s
    evidenceId: 'EV-1042-003',
    hopNumber: 2
  },
  {
    id: 'tx-004',
    txHash: '0x17b389c09d8172ea203b5190a7812903bbac091176529381af39281a0293eb02',
    timestamp: '2026-09-25 13:53:02 UTC',
    fromAddress: '0x22A7F9310D8e41aBc719D33b8E52A4F1', // Intermediary A
    toAddress: '0x44C91901aBd4F82001e912440bA8812c', // Intermediary B2
    chain: 'Ethereum',
    asset: 'USDT',
    amount: 19900,
    amountUSD: 19900,
    amountINR: 1671600,
    pattern: 'Fan-Out',
    riskLevel: 'HIGH',
    delayFromPreviousSec: 338,
    evidenceId: 'EV-1042-004',
    hopNumber: 2
  },
  // 4. Intermediary B1 to Layering Node C
  {
    id: 'tx-005',
    txHash: '0x718a9934f0d2c9182377b19a008c2a9314902cbef198a0029b3849c01829da03',
    timestamp: '2026-09-25 13:57:40 UTC',
    fromAddress: '0x91F562E34Caa8891cD82A2E6319FbB44', // Intermediary B1
    toAddress: '0x88D340Ac8eB24a91902Ebb4811aBc771', // Layering Node C
    chain: 'Ethereum',
    asset: 'USDT',
    amount: 21850,
    amountUSD: 21850,
    amountINR: 1835400,
    pattern: 'Rapid Forward',
    riskLevel: 'HIGH',
    delayFromPreviousSec: 325,
    evidenceId: 'EV-1042-005',
    hopNumber: 3
  },
  // 5. Intermediary B2 to Consolidation Wallet
  {
    id: 'tx-006',
    txHash: '0x99238bc1a0293817f0923847a918293cba98127390a18274092b3c01928374a5',
    timestamp: '2026-09-25 14:02:18 UTC',
    fromAddress: '0x44C91901aBd4F82001e912440bA8812c', // Intermediary B2
    toAddress: '0x33A0F8114C9291bBcA1992019488aF8120', // Consolidation Wallet
    chain: 'Ethereum',
    asset: 'USDT',
    amount: 19800,
    amountUSD: 19800,
    amountINR: 1663200,
    pattern: 'Consolidation',
    riskLevel: 'CRITICAL',
    delayFromPreviousSec: 556,
    evidenceId: 'EV-1042-006',
    hopNumber: 3
  },
  // 6. Layering Node C also merges into Consolidation Wallet
  {
    id: 'tx-007',
    txHash: '0x2a0918731be9023847192803bba918273910823471029381a9203948172930a6',
    timestamp: '2026-09-25 14:04:45 UTC',
    fromAddress: '0x88D340Ac8eB24a91902Ebb4811aBc771', // Layering Node C
    toAddress: '0x33A0F8114C9291bBcA1992019488aF8120', // Consolidation Wallet
    chain: 'Ethereum',
    asset: 'USDT',
    amount: 21700,
    amountUSD: 21700,
    amountINR: 1822800,
    pattern: 'Consolidation',
    riskLevel: 'CRITICAL',
    delayFromPreviousSec: 425,
    evidenceId: 'EV-1042-007',
    hopNumber: 4
  },
  // 7. Consolidation Wallet deposits into Cross-Chain Bridge contract
  {
    id: 'tx-008',
    txHash: '0xbb81920381720394817203948172039481720394817203948172039481720394',
    timestamp: '2026-09-25 14:11:30 UTC',
    fromAddress: '0x33A0F8114C9291bBcA1992019488aF8120', // Consolidation
    toAddress: '0x71092a09B829c9182C01984bbAa01934981E2911', // Bridge-X Contract
    chain: 'Ethereum',
    asset: 'USDT',
    amount: 41200,
    amountUSD: 41200,
    amountINR: 3460800,
    pattern: 'Cross-Chain Bridge',
    riskLevel: 'CRITICAL',
    evidenceId: 'EV-1042-008',
    hopNumber: 5
  },
  // 8. Bridge Releases on TRON Destination Wallet
  {
    id: 'tx-009',
    txHash: '8491a0c81923e01928374a91827390a18274092b3c01928374a5819203817203',
    timestamp: '2026-09-25 14:19:50 UTC',
    fromAddress: 'TBridgeXReleaseContractAddress891273918237', // Bridge Relayer TRON
    toAddress: 'TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7', // TRON Destination Wallet
    chain: 'TRON',
    asset: 'USDT-TRC20',
    amount: 41050,
    amountUSD: 41050,
    amountINR: 3448200,
    pattern: 'Direct Transfer',
    riskLevel: 'HIGH',
    evidenceId: 'EV-1042-009',
    hopNumber: 6
  },
  // 9. TRON Destination forwards to VASP-X Deposit Wallet 01
  {
    id: 'tx-010',
    txHash: '19028374a5819203817203948172039481720394817203948172039481720394',
    timestamp: '2026-09-25 14:26:12 UTC',
    fromAddress: 'TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7', // TRON Destination
    toAddress: 'TVX104DepositWallet01Alpha891273918237', // VASP-X Deposit 01
    chain: 'TRON',
    asset: 'USDT-TRC20',
    amount: 32000,
    amountUSD: 32000,
    amountINR: 2688000,
    pattern: 'VASP Deposit',
    riskLevel: 'CRITICAL',
    evidenceId: 'EV-1042-010',
    hopNumber: 7
  },
  // 10. TRON Destination forwards remaining to VASP-X Deposit Wallet 02
  {
    id: 'tx-011',
    txHash: '3817203948172039481720394817203948172039481720394817203948172039',
    timestamp: '2026-09-25 14:27:05 UTC',
    fromAddress: 'TQ8dM9sP3u4VnK2j5RtL8Wx9Za1Bc4KpL7', // TRON Destination
    toAddress: 'TVX104DepositWallet02Beta192837491028', // VASP-X Deposit 02
    chain: 'TRON',
    asset: 'USDT-TRC20',
    amount: 9000,
    amountUSD: 9000,
    amountINR: 756000,
    pattern: 'VASP Deposit',
    riskLevel: 'CRITICAL',
    evidenceId: 'EV-1042-011',
    hopNumber: 7
  },
  // 11. Internal Sweep from Deposit 01 to VASP-X Hot Wallet
  {
    id: 'tx-012',
    txHash: '918273910823471029381a9203948172930a6718a9934f0d2c9182377b19a008',
    timestamp: '2026-09-25 14:38:40 UTC',
    fromAddress: 'TVX104DepositWallet01Alpha891273918237',
    toAddress: 'TVX104HotWalletMasterCluster991827419',
    chain: 'TRON',
    asset: 'USDT-TRC20',
    amount: 31980,
    amountUSD: 31980,
    amountINR: 2686320,
    pattern: 'Internal Sweep',
    riskLevel: 'INFO',
    hopNumber: 8
  },
  // 12. Internal Sweep from Deposit 02 to VASP-X Hot Wallet
  {
    id: 'tx-013',
    txHash: '0c81923e01928374a91827390a18274092b3c01928374a58192038172038491a',
    timestamp: '2026-09-25 14:39:15 UTC',
    fromAddress: 'TVX104DepositWallet02Beta192837491028',
    toAddress: 'TVX104HotWalletMasterCluster991827419',
    chain: 'TRON',
    asset: 'USDT-TRC20',
    amount: 8995,
    amountUSD: 8995,
    amountINR: 755580,
    pattern: 'Internal Sweep',
    riskLevel: 'INFO',
    hopNumber: 8
  }
];
