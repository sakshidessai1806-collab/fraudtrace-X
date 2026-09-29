# FRAUDTRACE-X

> **"Trace the Money. Explain the Route. Find the Exit."**

**Smart India Hackathon 2026 Prototype**  
**Problem Statement ID:** SIH26183  
**Official Title:** *"Real-Time Identification of Fraud-Linked Cryptocurrency Exchanges from Victim-Reported Suspect Wallet Addresses through Automated Blockchain Analytics"*  
**Organization:** Ministry of Home Affairs (MHA)  
**Department:** Indian Cyber Crime Coordination Centre (I4C), CIS Division  
**Category:** Software  
**Theme:** Blockchain & Cybersecurity  

---

## 1. Executive Summary

**FRAUDTRACE-X** is a specialized, law-enforcement-grade cryptocurrency fraud investigation and intelligence platform. When a cyber crime investigator receives a suspect cryptocurrency wallet address from a victim report (e.g. NCRP portal), the platform automates the multi-hop forensic process:

1. **Ingests** victim complaints with cryptographic transaction hashing.
2. **Reconstructs** full multi-hop transaction topologies across heterogeneous blockchains.
3. **Identifies** intermediary layering wallets and structuring tactics (Fan-In, Fan-Out, Rapid Forwarding).
4. **Detects** cross-chain bridge movements (e.g. Ethereum → TRON via Bridge-X).
5. **Attributes** likely Virtual Asset Service Provider (VASP) off-ramp destinations with confidence metrics.
6. **Synthesizes** an explainable **Fraud DNA** behavioral fingerprint.
7. **Calculates** an explainable **Investigation Route** connecting the victim to the exchange exit.
8. **Prescribes** prioritized next-best investigative actions for judicial preservation.

---

## 2. Differentiating Core Innovations

### Unique Feature 1: The Behavioral Fraud DNA
Every analyzed wallet is assigned a 10-dimensional behavioral fingerprint visualized through an interactive spider/radar chart:
* **Transaction Velocity** (rapid pass-through latency)
* **Fan-In Intensity** (inbound stream aggregation)
* **Fan-Out Intensity** (layering dispersion)
* **Wallet Age & Longevity** (disposable vs. aged nodes)
* **Consolidation Behavior** (pre-bridge recombining)
* **Cross-Chain Activity** (bridge protocol utilization)
* **Exchange Proximity** (hops to known exchange sweep clusters)
* **Rapid Forwarding** (percentage moved within < 5 minutes)
* **Address Reuse** (fresh vs. reused addresses)
* **Burst Activity** (transaction volume spikes)

Accompanied by a transparent **Fraud DNA Summary**:
* `HIGH VELOCITY`: Funds forwarded within minutes of receipt (2m 14s delay).
* `LAYERING SIGNAL`: Funds split across multiple intermediary wallets in coordinated branches.
* `CROSS-CHAIN SIGNAL`: Observed movement through Bridge-X cross-chain lock/mint protocol.
* `EXIT PROXIMITY`: Funds enter identified VASP-X exchange deposit infrastructure.
* `CONSOLIDATION SIGNAL`: Multi-branch intermediary flows recombine into a common downstream wallet.

### Unique Feature 2: Explainable Investigation Route
Rather than presenting investigators with overwhelming, tangled transaction graphs, FRAUDTRACE-X distills the most actionable, evidentiary money trail:
$$\text{Victim Wallet} \longrightarrow \text{Suspect Wallet} \longrightarrow \text{Intermediary A} \longrightarrow \text{Consolidation Wallet} \longrightarrow \text{Bridge-X} \longrightarrow \text{TRON Destination} \longrightarrow \text{VASP-X Deposit Proxies} \longrightarrow \text{Master Hot Wallet Exit}$$

For every single hop, the investigator inspects:
* Target address (with full copy triggers)
* Blockchain network (Ethereum, TRON)
* Block timestamp and transaction hash
* Asset and amount transferred
* Detected behavioral pattern
* Attribution confidence percentage
* Evidentiary reason for relevance

---

## 3. Technology Stack

* **Framework:** React 19 + TypeScript + Vite
* **Styling & Aesthetics:** Tailwind CSS v4 + Vanilla CSS Design Tokens (Dark Cyber/LEA aesthetic, glassmorphism, responsive desktop-first layout)
* **Graph Visualization:** `@xyflow/react` (React Flow) with custom nodes, role filtering, and fund flow replay animation
* **Charting:** Recharts (10-dimensional RadarChart, Risk Distribution Donut)
* **Icons:** Lucide React
* **Routing:** React Router v7 (`/dashboard`, `/complaints`, `/investigation`, `/graph`, `/cross-chain`, `/vasp`, `/risk`, `/alerts`, `/evidence`, `/reports`, `/integrations`, `/settings`)
* **State Management:** React Context API with persistent demo cases, alert acknowledgment, and simulation triggers

---

## 4. Architecture & Reusable Analytics Engine

FRAUDTRACE-X does not rely on static dummy scores. It implements deterministic heuristic algorithms:

```
src/
├── lib/
│   ├── analytics.ts             # detectFanIn, detectFanOut, detectRapidForwarding,
│   │                            # detectConsolidation, detectLayering, detectCrossChainMovement,
│   │                            # calculateVaspProximity, generateFraudDNA, calculateAttributionConfidence
│   ├── riskEngine.ts            # calculateRiskScore (normalized 0-100 heuristic scoring)
│   ├── recommendationEngine.ts  # generateRecommendations (prioritized action items)
│   ├── graphEngine.ts           # Topological layout, custom node data & animated edges
│   └── utils.ts                 # Currency (USD/INR), address truncators, clipboard helpers
├── data/
│   ├── demoInvestigation.ts     # Master case CASE-2026-1042 (42,500 USDT)
│   ├── demoTransactions.ts      # 13+ interconnected multi-hop transactions
│   ├── demoVasps.ts             # VASP-X, VASP-Y, VASP-Z cluster definitions
│   ├── demoComplaints.ts        # NCRP mock complaints & simulation generator
│   ├── demoEvidence.ts          # Cryptographic SHA-256 hashed evidence artifacts
│   ├── demoAlerts.ts            # Automated alert stream & rule engine configurations
│   └── demoAudit.ts             # Chain of custody forensic audit log
```

### Heuristic Scoring Formula:
$$\text{Risk Score} = w_{\text{rf}} \cdot S_{\text{rf}} + w_{\text{fo}} \cdot S_{\text{fo}} + w_{\text{fi}} \cdot S_{\text{fi}} + w_{\text{ly}} \cdot S_{\text{ly}} + w_{\text{cc}} \cdot S_{\text{cc}} + w_{\text{cs}} \cdot S_{\text{cs}} + w_{\text{vp}} \cdot S_{\text{vp}}$$
* Rapid Forwarding ($w = 20$)
* Fan-Out Layering ($w = 15$)
* Fan-In Merging ($w = 10$)
* Layering Depth ($w = 15$)
* Cross-Chain Bridge ($w = 15$)
* Consolidation ($w = 10$)
* VASP Proximity ($w = 15$)

---

## 5. How to Run Locally

### Prerequisites:
* Node.js v18+ (tested on Node.js v24)
* npm v9+

### Commands:
```bash
# 1. Clone repository & navigate to directory
cd fraudtrace-x

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173/
```

### Build for Production:
```bash
npm run build
npm run preview
```

---

## 6. Official SIH 3–5 Minute Evaluation Demonstration Flow

Follow this exact workflow for hackathon jury evaluation:

1. **Dashboard (`/dashboard`)**:
   * Observe KPI counters (24 Active Cases, 17 High-Risk Wallets, 8 VASP Exits).
   * Review Live Investigation Feed and Risk Distribution Donut Chart.
   * Click **"Load Primary Demo Case (CASE-2026-1042)"** or click the Topbar **"Load Demo Case"** button.

2. **Investigation Hero Screen (`/investigation`)**:
   * Inspect **Risk 92 / 100 (CRITICAL)** circular meter and **87% Attribution Confidence**.
   * Note the explanation cards: *Rapid Forwarding (+21), Fan-out (+17), Consolidation (+15), Cross-chain (+16), VASP Proximity (+18)*.
   * Review the **Explainable Investigation Route** showing the 8 sequential hops from victim to exchange sweep.
   * Inspect the **Fraud DNA Radar Chart** and the 5 behavioral summaries.
   * Review the **Next Best Investigation Steps** and click "Mark Reviewed" or "Mark Actioned".

3. **Transaction Graph (`/graph` or "Fund Flow" Tab)**:
   * View the topological graph with role-colored nodes (Victim: neutral, Suspect: orange, Intermediary: yellow, Consolidator: red, Bridge: purple, VASP: cyan/emerald).
   * Click on any node to slide open the **Node Forensic Details Drawer**.
   * Click **"Replay Fund Flow"** to watch the animated fund transit across all 8 hops.

4. **Cross-Chain Intelligence (`/cross-chain`)**:
   * Inspect the Ethereum → Bridge-X → TRON progression with 8.3m transit duration, validator multi-sig proof, and observed INR value (₹35.2 Lakh).

5. **VASP Attribution Intelligence (`/vasp`)**:
   * Review "Why VASP-X?" with 5 signal score bars (Cluster Proximity 94%, Deposit Pattern Similarity 88%, etc.).
   * Click on deposit proxies in the **VASP-X Cluster Subgraph (VX-104)**.

6. **Automated Alerts & Rule Engine (`/alerts`)**:
   * Test the interactive Alert Rules panel (toggle rules, modify threshold values).
   * Click "Acknowledge" or "Add Evidence" on active alerts.

7. **Evidence Vault (`/evidence`)**:
   * Inspect the SHA-256 hashed evidentiary records with integrity badges (`VERIFIED`, `IMMUTABLE`).
   * Click **"Export Evidence Package (JSON)"** to download the signed forensic payload.

8. **Standardized Report Generator (`/reports`)**:
   * View the judicial-ready dossier formatted under Indian Evidence Act Section 65B.
   * Click **"Download JSON"** or **"Print / Save PDF"**.

9. **LEA Integration Layer (`/integrations`)**:
   * Click **"Simulate NCRP Complaint Ingestion"** to demonstrate automated ingestion.
   * Click **"Simulate SAHYOG Intelligence Request"** to see inter-agency request dispatching.

---

## 7. Legal, Evidentiary & Analytical Disclaimers

* **Synthetic Data:** All cryptocurrency addresses, transaction hashes, block receipts, and VASP cluster names displayed in this prototype are synthetic datasets created strictly for hackathon evaluation and demonstration.
* **Analytical Signals:** Risk scores and Fraud DNA indicators are algorithmic heuristics and do not independently establish ownership, criminal intent, or guilt.
* **VASP Attribution:** Exchange attributions represent investigative leads derived from topological cluster associations; they are not judicial proof of account holder identity.
* **Defensive Scope:** This prototype is strictly an analytics and investigative intelligence platform. It does not execute wallet transfers, access private keys, or bypass cryptographic protections.
* **Prototype Adapters:** NCRP and SAHYOG integration modules are prototype data-contract adapters demonstrating interoperability.

---

## 8. Limitations & Future Scope

### Current Prototype Scope:
* Uses synthetic blockchain data modeled on real-world crypto scam topographies (investment fraud, task scams).
* Evaluates Ethereum (ERC-20) and TRON (TRC-20) multi-hop movements.

### Future Roadmap:
* **Live Node Indexers:** Integration with full-node JSON-RPC providers (Erigon, Reth, TronGrid).
* **ML Clustering:** Unsupervised DBSCAN / Graph Neural Network (GNN) address clustering for entity resolution.
* **Automated Section 91 CrPC Notice Generation:** Dynamic generation of legal notices pre-filled with exchange contact points.
* **Cross-Ledger UTXO Tracking:** Advanced BIP-69 coinjoin and peel chain de-anonymization for Bitcoin and privacy rails.

---

## 9. License

Developed for the Smart India Hackathon (SIH 2026) under Problem Statement SIH26183.  
Licensed for evaluation by the Ministry of Home Affairs and Indian Cyber Crime Coordination Centre (I4C).
