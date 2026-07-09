// backend/server.js — ATLAS Agent Mesh API
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { x402Gate } from "./middleware/x402.js";
import { scanContract, scoreContract } from "./services/scanner.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8099;

// Health check — free, no payment needed
app.get("/health", (req, res) => {
  res.json({
    status: "ATLAS Agent Mesh is live",
    chain: "casper-test",
    network: "Casper Testnet",
    deployHash: "9b3ecf721f759fd6fa0a90b581ed6ffe9d35ba034670d0845116af978213d7e5",
    agents: ["Scout", "Underwriter", "Compliance", "Tokenization", "Market-Maker", "Oracle"],
  });
});

// PAID ENDPOINT 1: Full underwriting scan — costs $0.02 (in wei)
// Called by Underwriter Agent (x402-metered call to external risk provider)
app.post(
  "/underwrite",
  x402Gate("20000000000000000", "ATLAS Underwriter — Full asset risk scan"),
  (req, res) => {
    const { contractAddress } = req.body;
    if (!contractAddress) {
      return res.status(400).json({ error: "contractAddress is required" });
    }
    const result = scanContract(contractAddress);
    res.json({ ...result, agent: "Underwriter", paymentReceipt: req.paymentReceipt });
  }
);

// PAID ENDPOINT 2: Quick risk score — costs $0.01
// Called by Market-Maker Agent (x402-metered) for rapid pricing decisions
app.get(
  "/risk-score",
  x402Gate("10000000000000000", "ATLAS Market-Maker — Quick risk score check"),
  (req, res) => {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ error: "address query param is required" });
    }
    const result = scoreContract(address);
    res.json({ ...result, agent: "Market-Maker", paymentReceipt: req.paymentReceipt });
  }
);

app.listen(PORT, () => {
  console.log(`🏛️  ATLAS Agent Mesh API running on port ${PORT}`);
  console.log(`🔗 Network: Casper Testnet (casper-test)`);
  console.log(`💰 Merchant wallet: ${process.env.MERCHANT_WALLET}`);
});