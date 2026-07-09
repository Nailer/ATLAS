# ATLAS — Testing Guide

> **For judges and reviewers.** Step-by-step instructions to verify the ATLAS submission. No marketing. Follows the DoraHacks playbook format.

---

## Prerequisites

- Node.js ≥ 20 and npm ≥ 10
- Git
- A browser (Chrome / Firefox / Safari)
- Optional: Rust + `cargo odra` for contract verification

---

## Part 1 — Verify the smart contract on Casper Testnet

**No local setup required.**

1. Open the deploy on Casper testnet explorer:  
   **[testnet.cspr.live/deploy/9b3ecf721f759fd6fa0a90b581ed6ffe9d35ba034670d0845116af978213d7e5](https://testnet.cspr.live/deploy/9b3ecf721f759fd6fa0a90b581ed6ffe9d35ba034670d0845116af978213d7e5)**

2. Confirm:
   - Status: **Success**
   - Network: **casper-test**
   - Entry point: `call` (contract install)
   - Payment amount: 200 CSPR

3. The contract source is at `atlas_registry/flipper/src/flipper.rs`.  
   Compiled WASM is at `atlas_registry/flipper/wasm/Flipper.wasm`.

4. Entry points exposed by the contract:
   - `register_asset()` → increments `total_assets: Var<u32>`, returns new count
   - `get_total_assets()` → returns current total without mutation

---

## Part 2 — Run the frontend locally

```bash
git clone https://github.com/Nailer/ATLAS.git
cd ATLAS/frontend
npm install
npm run dev
# Open: http://localhost:5173
```

---

## Part 3 — Originator flow (Submit an Asset)

1. On the landing page, click **Launch App →**
2. In onboarding: select **Originator**, enter any name, click **Continue → Enter ATLAS**
3. In the sidebar, click **Submit Asset**
4. **Step 1 — Asset Type:** Select **Trade Invoice**
5. **Step 2 — Claim Details:** Enter:
   - Amount: `50000`
   - Counterparty: `Meridian Trading Co.`
   - Due Date: `2026-08-30`
6. **Step 3 — Document:** Paste any text (e.g. `Invoice #1042 for services rendered Q2 2026`) and click **Generate SHA-256 Fingerprint**
   - Observe the deterministic 64-character hash generated client-side
   - This hash (not the document) would be anchored on-chain in production
7. Click **Submit to Agent Swarm →**
8. Watch the six-agent pipeline execute in sequence:
   - Scout Agent: verifies hash ✓
   - Underwriter Agent: scores risk ✓
   - Compliance Agent: KYC/AML check ✓
   - Tokenization Agent: deploys Odra contract ✓
   - Market-Maker Agent: prices and lists ✓
   - Oracle Agent: activates monitoring ✓
9. Result screen shows: asset ID, risk score (87/100), yield (11.4% APY), document hash

---

## Part 4 — Agent Swarm view

1. Navigate to **Agent Swarm** in the sidebar
2. Six agents are listed with their stage, description, and x402 costs
3. Click any agent card to expand its **MCP entry points** (the callable tools each agent exposes)
4. The **x402 Ledger** at the bottom shows the simulated agent-to-agent micropayment history

---

## Part 5 — Investor Marketplace view

1. Navigate to **Marketplace**
2. Four assets are listed: two invoices, one solar lease, one rent roll
3. Click **INV-ATLAS-0417**
4. In the asset detail view, verify:
   - Face value, yield, risk score, term, tranche structure
   - The **Underwriting Trail** section: all six agents show pass/fail results and the evidence used — this is what makes ATLAS verifiable to investors
   - The **On-Chain Reference** section links to the testnet deploy
5. The funding bar and "Invest Now" button are functional

---

## Part 6 — Live on-chain status widget

1. Navigate to **Dashboard**
2. The **Live On-Chain Status** card fetches the deploy details from `api.testnet.cspr.cloud` in real time
3. If the API is reachable, the live deploy data (JSON) is displayed in the **On-Chain Data** page
4. Navigate to **On-Chain Data** in the sidebar for full details: deploy hash, package hash instructions, contract source

---

## Part 7 — Retrieve the contract package hash (advanced)

```bash
cd ATLAS
node contract/get-package-hash.js
# Prints: contract-package-hash-<64-char-hex>
```

This queries the Casper testnet RPC for the execution result of the install deploy and extracts the `ContractPackage` hash from the stored named keys. Paste the result into `ONCHAIN.md` and your DoraHacks BUIDL page.

---

## What is live vs. simulated

| Component | Status |
|---|---|
| Odra/Rust smart contract deployed on casper-test | ✅ Live |
| Deploy hash verifiable on testnet.cspr.live | ✅ Live |
| CSPR.cloud API integration in frontend | ✅ Live |
| Contract source code in repo | ✅ Live |
| Six-agent pipeline UI (Scout → Oracle) | 🟡 Simulated (fully specified outputs, mocked LLM calls) |
| Real x402-metered calls to external providers | 🟡 Simulated (payment amounts shown are correct; settlement is mocked) |
| Autonomous Odra contract generation per asset | 🟡 Designed; live for qualifying round deploy only |

---

## Repository

```
https://github.com/Nailer/ATLAS
```

Topics: `casper-blockchain` `casper-network` `buildathon` `rwa` `defi` `ai-agents` `mcp` `x402` `odra`
