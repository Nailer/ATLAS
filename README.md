# ATLAS
### Autonomous RWA Underwriting Mesh — built on Casper

**ATLAS turns a real-world debt into investable capital in minutes — sourced, underwritten, tokenized, and settled entirely by autonomous AI agents that pay each other to do it, on Casper.**

*Casper Agentic Buildathon 2026 — Qualification Round Submission*

---

Sending deploy...

✅ Deploy sent!
Deploy hash: 4270cc4e7ddfe0dce88719f17698bb6c8fa0328865ffad286970b1f869ed9c9d

Check its status here:
https://testnet.cspr.live/deploy/4270cc4e7ddfe0dce88719f17698bb6c8fa0328865ffad286970b1f869ed9c9d

---

## Table of Contents

1. [The Problem](#the-problem)
2. [The Solution](#the-solution)
3. [How ATLAS Works — Full Architecture Walkthrough](#how-atlas-works--full-architecture-walkthrough)
4. [Use Cases](#use-cases)
5. [Key Features](#key-features)
6. [Tech Stack](#tech-stack)
7. [Smart Contract Layer](#smart-contract-layer)
8. [Project Structure](#project-structure)
9. [Getting Started](#getting-started)
10. [Implementation Status](#implementation-status)
11. [Roadmap](#roadmap)
12. [Track Alignment](#track-alignment)
13. [License & Acknowledgments](#license--acknowledgments)

---

## The Problem

Real-world asset tokenization is one of the largest theses in crypto today, and it is structurally bottlenecked by one thing: **underwriting still requires a human.**

- A small business with a legitimate, low-risk unpaid invoice waits days or weeks for a factoring company to manually review documents and approve funding — and the underwriting cost is often not worth it for smaller invoice sizes, which locks the smallest, most vulnerable originators out entirely.
- An investor being asked to fund a stranger's invoice has almost no cheap way to verify the claim is real. Most "RWA" tokens today are backed by a PDF and a promise — there's no standard way to prove a document is authentic and unaltered without exposing the private financial data inside it.
- Existing tokenization platforms are databases with a blockchain bolted on. A human still originates, prices, and lists every asset by hand. None of them treat the underwriting pipeline itself as something a coordinated swarm of AI agents can run autonomously.

## The Solution

ATLAS replaces the human underwriting pipeline with six purpose-built AI agents, each with exactly one job, communicating over **MCP**, paying each other over **x402** for every unit of work they request, and writing their own smart contracts through **Odra** rather than relying on a developer to hand-code a bespoke contract per asset.

Trust between strangers is established without exposing private data. When an originator submits a claim, they attach the real supporting document. ATLAS fingerprints it (SHA-256) and anchors **only the fingerprint** on-chain — never the document. Investors can verify an asset is real and unaltered without ever seeing the private paperwork behind it.

ATLAS is genuinely two-sided: the originator gets a real-time funding dashboard, and the investor gets a fully transparent marketplace with a complete, auditable underwriting trail behind every listing.

---

## How ATLAS Works — Full Architecture Walkthrough

This section is intentionally detailed. ATLAS is not one AI model wrapped around a UI — it's a coordinated mesh of independent agents, an on-chain settlement layer, and a two-sided product experience, and understanding how those three layers connect is the core of what makes this project work. Read this top to bottom for the full picture, or jump to whichever diagram you need.

### 1. System Overview — who talks to whom

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                              ATLAS — SYSTEM OVERVIEW                              │
└──────────────────────────────────────────────────────────────────────────────────┘

     ┌─────────────────┐                                    ┌─────────────────┐
     │    ORIGINATOR    │                                    │     INVESTOR     │
     │  (needs capital  │                                    │ (deploys capital │
     │  against a real  │                                    │  into verified   │
     │  world asset)    │                                    │  yield assets)   │
     └────────┬─────────┘                                    └────────┬─────────┘
              │                                                        │
              │  1. Describes asset +                    5. Browses   │
              │     attaches document                       marketplace,
              │     (fingerprinted client-side)             invests
              ▼                                                        ▼
     ┌────────────────────────────────────────────────────────────────────────┐
     │                            ATLAS  FRONTEND                              │
     │   Home · Swarm View · Result · My Funding · Marketplace · Asset         │
     │   Detail · Agent Network · Analytics · Portfolio                       │
     └────────────────────────────┬─────────────────────────────────────────┘
                                   │  2. submits request payload
                                   │     (claim + document fingerprint)
                                   ▼
     ┌────────────────────────────────────────────────────────────────────────┐
     │                     ATLAS AGENT MESH  (each agent = its own MCP server) │
     │                                                                        │
     │   ┌─────────┐   x402   ┌────────────┐  x402  ┌────────────┐           │
     │   │  SCOUT  │─────────▶│ UNDERWRITER│───────▶│ COMPLIANCE │           │
     │   │  AGENT  │          │   AGENT    │        │   AGENT    │           │
     │   └────┬────┘          └─────┬──────┘        └─────┬──────┘           │
     │        │ x402                │ x402                │ x402             │
     │        ▼                     ▼                     ▼                  │
     │  Document registry    Credit bureau          KYC / AML provider       │
     │  cross-check           risk pull              eligibility check       │
     │                                                      │                 │
     │                                                      ▼                 │
     │                                          ┌────────────────────┐        │
     │                                          │  TOKENIZATION AGENT │        │
     │                                          │  writes + deploys   │        │
     │                                          │  bespoke Odra       │        │
     │                                          │  contract           │        │
     │                                          └──────────┬──────────┘        │
     │                                                     │ x402               │
     │                                                     ▼                    │
     │                                          ┌────────────────────┐         │
     │                                          │  MARKET-MAKER AGENT │         │
     │                                          │  prices, tranches,  │         │
     │                                          │  lists liquidity    │         │
     │                                          │  via CSPR.trade MCP │         │
     │                                          └──────────┬──────────┘         │
     │                                                     │                    │
     │                        ┌────────────────────────────┘                   │
     │                        ▼                                                │
     │              ┌──────────────────┐                                       │
     │              │   ORACLE AGENT    │  ◀── activates AFTER tokenization,   │
     │              │  (runs forever,   │      re-checks real-world repayment  │
     │              │   post-issuance)  │      on a recurring cycle             │
     │              └─────────┬─────────┘                                      │
     └────────────────────────┼──────────────────────────────────────────────┘
                               │  3. writes verified state, mints, updates
                               ▼
     ┌────────────────────────────────────────────────────────────────────────┐
     │                         CASPER TESTNET  (on-chain layer)                │
     │                                                                        │
     │   ┌──────────────────┐  ┌───────────────────┐  ┌────────────────────┐ │
     │   │ Receivable /      │  │ Document Anchor    │  │ Compliance          │ │
     │   │ Asset Tokenization│  │ Registry            │  │ Credential Contract │ │
     │   │ Contract (Odra)   │  │ (SHA-256 fingerprint│  │ (non-transferable)  │ │
     │   │  — one per asset  │  │  only, never the    │  │                     │ │
     │   │                   │  │  document itself)   │  │                     │ │
     │   └──────────────────┘  └───────────────────┘  └────────────────────┘ │
     │                          ┌───────────────────┐                         │
     │                          │ Oracle Update Log   │                         │
     │                          │ (append-only trust  │                         │
     │                          │  score history)     │                         │
     │                          └───────────────────┘                         │
     └────────────────────────────────────────────────────────────────────────┘
                               │
                               │  4. reflected back to both dashboards
                               ▼
     ┌─────────────────┐                                    ┌─────────────────┐
     │  MY FUNDING      │                                    │  MARKETPLACE +   │
     │  DASHBOARD        │                                    │  ASSET DETAIL +  │
     │  (originator view)│                                    │  PORTFOLIO        │
     │  tranche-by-tranche│                                   │  (investor view)  │
     │  disbursement,     │                                   │  full underwriting│
     │  $0 repayment       │                                  │  trail per asset   │
     │  obligation         │                                  │                    │
     └─────────────────┘                                    └─────────────────┘
```

### 2. The agent pipeline, in sequence — with what each agent actually does

Each agent in ATLAS is a single-responsibility, independently discoverable service. None of them are "the same model doing five things" — each one is scoped to one job, one set of inputs, and one output, which is what makes the swarm auditable step-by-step rather than a black box.

```
STAGE 1 — SCOUT AGENT                              STAGE 2 — UNDERWRITER AGENT
────────────────────────────                       ─────────────────────────────
Input:  uploaded document + claim                    Input:  Scout's verified data
Action: • re-hashes the document (SHA-256)                   + external credit signal
        • cross-references extracted fields          Action: • requests counterparty
          (amount, counterparty, due date)              credit data (paid x402 call)
          against the claim                                   • runs fraud heuristics on
        • anchors the fingerprint on-chain                    document metadata
Output: verified document + on-chain anchor tx               • produces numeric risk score
        ────────────────▶                            Output: risk score + rationale
                                                               ────────────────▶

STAGE 3 — COMPLIANCE AGENT                          STAGE 4 — TOKENIZATION AGENT
────────────────────────────                        ─────────────────────────────
Input:  originator + counterparty identity            Input:  risk score + compliance
Action: • verifies eligibility via KYC/AML                    credential + asset class
          provider (paid x402 call)                  Action: • selects the correct Odra
        • mints on-chain compliance                            contract template
          credential                                          • generates a bespoke
Output: compliance credential token                            contract for THIS asset
        ────────────────▶                                     • deploys to Casper Testnet
                                                       Output: live, asset-specific
                                                               smart contract
                                                               ────────────────▶

STAGE 5 — MARKET-MAKER AGENT                        STAGE 6 — ORACLE AGENT
────────────────────────────                        ─────────────────────────────
Input:  deployed contract + risk score                Input:  the live, tokenized asset
Action: • prices yield based on risk + term           Action: • runs on a recurring cycle,
        • structures senior / junior tranche                   for the LIFE of the asset
        • seeds liquidity via CSPR.trade MCP                  • re-checks real-world
Output: live marketplace listing                                repayment status
        ────────────────▶                                     • updates the on-chain trust
                                                                  score with each check
                                                       Output: continuously-verified,
                                                               living trust score
```

### 3. The trust mechanism — how a stranger's document becomes verifiable

This is the piece that makes ATLAS an underwriting system and not just a tokenization wrapper. An investor is being asked to fund a document they will never see. Here is exactly how that's made trustworthy:

```
  ORIGINATOR'S DEVICE                    ATLAS AGENT MESH                CASPER TESTNET
  ────────────────────                   ─────────────────               ───────────────

  [ Real invoice document ]
           │
           │  hashed locally
           │  (SHA-256, client-side —
           │   the file itself never
           │   leaves the originator's
           │   control unencrypted)
           ▼
  [ Fingerprint generated ]
  9f2a4c7e1d6b3805a2e9f61c8d3b5a70e4f9c2a1d6b8e3f705a91c4d2ee41c1b
           │
           │  submitted alongside the
           │  plain-language claim
           ▼
                                    [ SCOUT AGENT ]
                                          │
                                          │  re-hashes the SAME document
                                          │  server-side to confirm the
                                          │  fingerprint hasn't been swapped
                                          │
                                          │  extracts structured fields
                                          │  (amount, counterparty, due date)
                                          │  and compares them against the
                                          │  originator's plain-language claim
                                          ▼
                                 ┌──────────────────────┐
                                 │  Declared   Extracted  │
                                 │  $50,000  ✓ $50,000    │
                                 │  Meridian ✓ Meridian    │
                                 │  Net-60   ✓ Net-60      │
                                 └──────────┬───────────┘
                                            │  match confirmed
                                            ▼
                                                                    [ Document Anchor
                                                                      Registry ]
                                                                    fingerprint + timestamp
                                                                    + asset reference
                                                                    anchored on-chain
                                                                            │
                                                                            ▼
                                                                    Anyone — including an
                                                                    investor who has never
                                                                    seen the original file —
                                                                    can re-hash the same
                                                                    document later and
                                                                    confirm it matches. If
                                                                    a single character had
                                                                    been changed, the
                                                                    fingerprints would not
                                                                    match, and the mismatch
                                                                    would be publicly
                                                                    provable.
```

**Why this matters:** the document itself is never made public — only its cryptographic fingerprint is. This preserves the originator's privacy (their invoice may contain sensitive commercial terms) while still giving investors mathematical, not reputational, proof that the asset backing their investment is real and unaltered.

### 4. Two-sided by design — the originator and the investor see the same asset differently

Most RWA tokenization demos are built entirely from the investor's point of view. ATLAS treats the originator — the person the entire system exists to serve — as an equally important user, with their own dedicated experience:

```
                         ┌───────────────────────────┐
                         │   ONE TOKENIZED ASSET       │
                         │   INV-ATLAS-0417             │
                         └──────────────┬──────────────┘
                                         │
                ┌────────────────────────┴────────────────────────┐
                ▼                                                   ▼
   ┌─────────────────────────────┐                   ┌─────────────────────────────┐
   │      ORIGINATOR VIEW          │                   │       INVESTOR VIEW          │
   │      "My Funding"             │                   │   Marketplace → Asset Detail │
   ├─────────────────────────────┤                   ├─────────────────────────────┤
   │ • Funding status (% funded)   │                   │ • Yield, term, tranche        │
   │ • Tranche-by-tranche          │                   │ • Full underwriting trail     │
   │   disbursement received       │                   │   (every agent's report)      │
   │ • Advance rate & total        │                   │ • Document verification        │
   │   advance amount              │                   │   report (declared vs.         │
   │ • Explicit statement:         │                   │   extracted, with checkmarks)  │
   │   "Your repayment             │                   │ • Live agent activity           │
   │    obligation: $0" —          │                   │   timeline for this asset       │
   │   the debtor pays ATLAS       │                   │ • Buy panel with live           │
   │   directly, not the           │                   │   projected-return calculator   │
   │   originator                  │                   │ • Position appears in the       │
   │                                │                   │   investor's own Portfolio,     │
   │                                │                   │   clickable for full history    │
   └─────────────────────────────┘                   └─────────────────────────────┘
```

### 5. Continuous verification — underwriting doesn't stop at issuance

Static tokenization platforms treat underwriting as a one-time event: an asset is checked once, tokenized, and then left alone. ATLAS's Oracle Agent is designed specifically to close that gap:

```
   TOKENIZATION                                              MATURITY
        │                                                         │
        ▼                                                         ▼
   ●────────●────────●────────●────────●────────●────────●────────●
   │        │        │        │        │        │        │        │
  mint   check 1   check 2  check 3  check 4  check 5  check 6  final
                                                                 check
   │        │        │        │        │        │        │        │
   └────────┴────────┴────────┴────────┴────────┴────────┴────────┘
              every check: Oracle Agent re-verifies real-world
              repayment status, writes a trust-score delta to the
              on-chain Oracle Update Log, and the asset's trust
              score on the Marketplace updates accordingly —
              visible to every current and prospective investor
```

---

## Use Cases

ATLAS is built around trade receivable factoring as its flagship use case, but the underwriting mesh is asset-class agnostic — any real-world claim with a document behind it and a predictable payment can move through the same pipeline. Below are the primary use cases the platform is designed to serve.

### 1. Small business invoice factoring (the flagship use case)
A small business has delivered goods or services and holds a legitimate invoice that won't be paid for 30–90 days. Rather than waiting on a bank or a traditional factoring company — both of which are often uneconomical for smaller invoice sizes — the business submits the invoice to ATLAS and receives funding in tranches as investors fund the listing, often within minutes of the swarm completing underwriting. This is the single largest addressable use case: trade finance is a multi-trillion-dollar global market, and small businesses are consistently the most underserved segment of it.

### 2. Solar and renewable-energy lease monetization
Solar developers and asset owners often hold long-duration lease agreements (12–24 months or longer) with predictable, contracted payments. ATLAS allows these future cash flows to be tokenized and sold to investors seeking longer-duration yield, giving renewable energy operators faster access to capital for reinvestment in new installations — directly supporting the buildout of clean energy infrastructure.

### 3. Rent roll tokenization for real estate operators
A landlord or property manager with a stable, documented rent roll can tokenize future rental income as a yield instrument, converting predictable but illiquid income into upfront capital without selling the underlying property or taking on traditional debt.

### 4. Carbon credit forward financing
Carbon credit originators — reforestation projects, carbon capture operations — often need capital before their credits are fully issued or sold. ATLAS allows a forward claim on future carbon credit issuance to be underwritten and tokenized, giving climate-focused projects earlier access to capital while giving investors a way to gain exposure to carbon markets through a verified, structured instrument.

### 5. Portfolio diversification for on-chain investors
For investors, ATLAS is a way to gain exposure to real-world, cash-flow-backed yield that does not correlate with crypto-native market cycles — filling a category that is currently underserved on-chain, where most yield opportunities are either purely crypto-collateralized or backed by opaque off-chain claims with no verification layer.

### 6. Embedded finance for fintech platforms (forward-looking)
Because every ATLAS agent is exposed as an independent MCP server, other fintech products and platforms could eventually integrate ATLAS's underwriting mesh directly into their own applications — offering their users instant, verifiable asset-backed financing without building an underwriting pipeline of their own. This positions ATLAS not just as a standalone marketplace, but as underwriting infrastructure other builders on Casper can plug into.

---

## Key Features

- **Document fingerprinting and on-chain anchoring** — cryptographic proof an asset is real, without exposing private financial documents.
- **A true six-agent underwriting swarm** — Scout, Underwriter, Compliance, Tokenization, Market-Maker, and Oracle, each an independently discoverable MCP server.
- **Agent-to-agent x402 payments** — every handoff between agents, and every call to an external data provider, is a real, metered, on-chain-settled payment — visible live in the swarm's x402 ledger.
- **Autonomous Odra contract generation** — the Tokenization Agent writes and deploys a bespoke smart contract per asset, using Casper's AI-discoverable Odra documentation, rather than relying on a single reused pool contract.
- **Continuous post-issuance verification** — the Oracle Agent keeps re-checking real-world repayment for the life of every asset, maintaining a living, auditable trust score.
- **A genuinely two-sided marketplace** — a dedicated originator funding dashboard alongside the investor marketplace, each showing the same asset from the perspective that matters to them.
- **Full underwriting transparency** — every investor-facing asset page shows the complete agent trail: risk scores, compliance status, the document verification report, and a dated activity timeline.
- **Live agent network visibility** — an Agent Network page showing every agent's current job, trust score, job count, and last payment made, so the system's ongoing activity is never hidden behind a single "processing…" spinner.

---

## Tech Stack

**Casper AI Toolkit (core infrastructure):**
- **x402** — HTTP-native micropayments for every agent-to-agent and agent-to-provider transaction
- **MCP (Model Context Protocol) servers** — used for agent discovery and for blockchain query/interaction access via the Casper MCP Server
- **CSPR.trade MCP** — autonomous liquidity seeding and trade execution for tokenized assets
- **CSPR.cloud APIs** — middleware layer agents use to read and write Casper chain state
- **Odra Framework** (with `llms.txt` AI-discoverable documentation) — the smart contract framework used for autonomous, per-asset contract generation and deployment

**Frontend / Interface:**
- Single-page interactive prototype (HTML/CSS/JavaScript), covering nine linked views: Home, Swarm, Result, My Funding, Marketplace, Asset Detail, Agent Network, Analytics, and Portfolio (with drill-down position detail)

**Planned backend (see [Implementation Status](#implementation-status)):**
- Agent runtime services, one per agent, each exposing its own MCP server
- LLM-driven reasoning per agent for risk scoring, fraud heuristics, and pricing
- x402 payment integration for every inter-agent and external-provider call

---

## Smart Contract Layer

ATLAS's on-chain layer, built on **Odra**, consists of four coordinated contract types:

| Contract | Purpose |
|---|---|
| **Receivable / Asset Tokenization Contract** | Deployed fresh per asset (not a shared pool), encoding face value, term, discount rate, and tranche structure. Keeps each asset's risk fully isolated and auditable on its own terms. |
| **Compliance Credential Contract** | A non-transferable credential minted by the Compliance Agent, referenced by the tokenization contract at issuance. Designed for forward-compatibility with Casper's compliant security token roadmap. |
| **Document Anchor Registry** | Stores only the SHA-256 fingerprint of the source document, a timestamp, and a reference to the asset it belongs to — the trust-minimization primitive behind ATLAS's verification model. |
| **Oracle Update Log** | An append-only log the Oracle Agent writes to on each re-verification cycle, recording the trust-score delta and a reference to the evidence checked — giving every investor a fully auditable history of *why* an asset's trust score is what it is. |

---

## Project Structure

```
atlas/
├── prototype/
│   └── atlas-demo.html          # Interactive multi-page UI prototype (current submission)
├── contracts/                    # Odra smart contracts (in progress)
│   ├── receivable_tokenization/
│   ├── compliance_credential/
│   ├── document_anchor_registry/
│   └── oracle_update_log/
├── agents/                       # Agent service definitions (in progress)
│   ├── scout/
│   ├── underwriter/
│   ├── compliance/
│   ├── tokenization/
│   ├── market_maker/
│   └── oracle/
├── docs/
│   ├── architecture.md
│   └── submission/               # Hackathon submission materials
├── assets/
│   └── logo/                     # ATLAS wordmark and icon (SVG)
└── README.md
```

---

## Getting Started

The current submission includes a fully interactive front-end prototype demonstrating the complete ATLAS user experience and agent workflow.

```bash
# Clone the repository
git clone https://github.com/<your-org>/atlas.git
cd atlas/prototype

# Open directly in a browser
open atlas-demo.html          # macOS
# or simply double-click atlas-demo.html

# Or serve it locally
python3 -m http.server 8000
# then visit http://localhost:8000/atlas-demo.html
```

No build step, dependencies, or backend are required to explore the prototype — it runs entirely client-side.

---

## Implementation Status

We believe in being direct with judges about exactly what is live versus in progress, rather than letting a polished interface speak for more than it should.

**What is fully built and interactive in this submission:**
- The complete nine-page user experience described above, including the document upload and fingerprinting flow, the full agent swarm visualization with a live x402 ledger, the two-sided originator/investor dashboards, the Agent Network directory, Analytics, and drill-down Portfolio history.

**What is currently simulated, and being actively built next:**
- Live agent reasoning (currently represented via realistic, fully-specified simulated agent output rather than live LLM calls)
- Real x402-metered calls to external data, credit, and KYC providers
- Autonomous Odra contract generation and deployment by the Tokenization Agent (contract architecture is designed; live deployment is in progress)

A minimal real transaction demonstrating the Odra deployment path is included in this repository to satisfy the qualification round's on-chain requirement, with full agent-to-chain integration as our immediate next milestone.

---

## Roadmap

**Phase 1 — Post-Hackathon Hardening (Months 0–3)**
Connect each agent to real external data providers metered by genuine x402 calls; commission an external security review of the Odra contract suite; onboard 3–5 pilot originators with real, small-value invoices to stress-test the full pipeline end-to-end on testnet.

**Phase 2 — Trust and Model Maturity (Months 3–9)**
Fine-tune the Underwriter and Oracle agents against real underwriting outcomes; add a second, independent attestation layer (counterparty confirmation) for stronger fraud resistance; formalize compliance partnerships and align the Compliance Credential Contract with Casper's native compliant security token primitives as they ship; expand supported asset classes to solar leases, rent rolls, and carbon credit forwards at pilot scale.

**Phase 3 — Scale and Cross-Chain Expansion (Months 9–18)**
Move to Casper mainnet as x402 and MCP infrastructure matures for production use; open a secondary market for tranche tokens via CSPR.trade; begin institutional investor onboarding; explore cross-chain liquidity bridges and integrate Casper smart accounts once generally available.

---

## Track Alignment

ATLAS was built for the Casper Innovation Track's core convergence point — Agentic AI, DeFi, and Real-World Assets — using every component of Casper's AI Toolkit: x402 for agent-to-agent payment, MCP servers for discovery and chain access, CSPR.trade MCP for autonomous liquidity, CSPR.cloud as the middleware layer, and Odra with `llms.txt` for autonomous contract generation. It combines and extends the buildathon's own suggested build directions — the RWA Oracle Agent pattern and the AI-Driven Compliance pattern — into a single, full-lifecycle system rather than a standalone example of either.

---

## License & Acknowledgments

Built for the **Casper Agentic Buildathon 2026**, organized by the **Casper Association** in partnership with **DoraHacks** and **Istanbul Blockchain Week**.

Licensed under the MIT License — see `LICENSE` for details.

---

*ATLAS — Real-world assets. Underwritten by machines. Settled on Casper.*