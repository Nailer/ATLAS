/**
 * get-package-hash.js
 *
 * Retrieves the ATLAS Asset Registry contract package hash from Casper testnet.
 *
 * Uses three strategies in order:
 *   1. CSPR.cloud REST API (best indexed data retention)
 *   2. Account named keys via RPC (queries the deployer account directly)
 *   3. Raw RPC info_get_deploy (fallback)
 *
 * Usage:
 *   node contract/get-package-hash.js
 *
 * Requires Node 18+ (uses built-in fetch).
 */

const { CasperClient, Keys } = require("casper-js-sdk");
const path = require("path");

const DEPLOY_HASH = "3d66af45bf5d93abc9411ed576dc19978cc92b6759c3aceb97cc0541e2171d64";
const RPC_URL = "https://node.testnet.casper.network/rpc";
const CSPR_CLOUD_BASE = "https://api.testnet.cspr.cloud";
const EXPLORER_DEPLOY = `https://testnet.cspr.live/deploy/${DEPLOY_HASH}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function printResult(packageHash) {
  console.log("\n─────────────────────────────────────────────────────");
  console.log("✅ CONTRACT PACKAGE HASH:");
  console.log("");
  console.log(`  ${packageHash}`);
  console.log("");
  console.log("─────────────────────────────────────────────────────");
  console.log("Next steps:");
  console.log("  1. Paste this into ONCHAIN.md (replacing the placeholder on line 36)");
  console.log("  2. Add it to your DoraHacks BUIDL page under 'Contract package hashes'");
  console.log("");
  const shortHash = packageHash.replace("contract-package-hash-", "");
  console.log(`Explorer: https://testnet.cspr.live/contract-package/${shortHash}`);
}

function extractPackageHashFromTransforms(transforms) {
  let packageHash = null;
  let contractHash = null;

  for (const t of transforms) {
    const key = (t.key || "").toString();
    if (key.startsWith("contract-package-hash-") || key.startsWith("hash-")) {
      if (t.transform?.WriteContractPackage !== undefined || 
          Object.prototype.hasOwnProperty.call(t.transform || {}, "WriteContractPackage")) {
        packageHash = key.startsWith("contract-package-hash-") ? key : `contract-package-hash-${key.replace("hash-", "")}`;
      }
      // Fallback: any key starting with contract-package-hash-
      if (key.startsWith("contract-package-hash-") && !packageHash) {
        packageHash = key;
      }
    }
    if (key.startsWith("contract-") && !key.startsWith("contract-package")) {
      contractHash = key;
    }
  }

  return { packageHash, contractHash };
}

// ─── Strategy 1: CSPR.cloud REST API ─────────────────────────────────────────

async function tryCSPRCloud() {
  console.log("\n[Strategy 1] Querying CSPR.cloud REST API...");
  const url = `${CSPR_CLOUD_BASE}/deploys/${DEPLOY_HASH}`;
  
  const res = await fetch(url, {
    headers: { "accept": "application/json" },
  });

  if (!res.ok) {
    console.log(`  ⚠️  CSPR.cloud returned HTTP ${res.status}. Skipping.`);
    return null;
  }

  const data = await res.json();

  // CSPR.cloud wraps data in a `data` key
  const deployData = data?.data || data;
  const execResults = deployData?.execution_results;

  if (!execResults || execResults.length === 0) {
    console.log("  ⚠️  CSPR.cloud: deploy found but no execution results.");
    
    // Show what we did get
    if (deployData?.account_hash) {
      console.log(`  Account hash: ${deployData.account_hash}`);
    }
    if (deployData?.timestamp) {
      console.log(`  Timestamp: ${deployData.timestamp}`);
    }
    return null;
  }

  console.log(`  ✅ CSPR.cloud returned ${execResults.length} execution result(s).`);

  for (const execResult of execResults) {
    const transforms = 
      execResult?.result?.Success?.effect?.transforms ||
      execResult?.transforms ||
      [];

    if (transforms.length > 0) {
      const { packageHash, contractHash } = extractPackageHashFromTransforms(transforms);
      if (packageHash) {
        console.log("  Found package hash in execution transforms.");
        return packageHash;
      }
      if (contractHash) {
        console.log(`  Found contract hash: ${contractHash}`);
      }
    }
  }

  // Dump the exec result structure if we couldn't parse it
  console.log("  Could not find package hash. Raw execution result (first 2000 chars):");
  console.log(JSON.stringify(execResults[0], null, 2).slice(0, 2000));
  return null;
}

// ─── Strategy 2: Account Named Keys via RPC ──────────────────────────────────

async function tryAccountNamedKeys() {
  console.log("\n[Strategy 2] Querying deployer account named keys via RPC...");

  // Derive account hash from the public key PEM file
  let keys;
  try {
    keys = Keys.Ed25519.parseKeyFiles(
      path.join(__dirname, "casper_keys/public_key.pem"),
      path.join(__dirname, "casper_keys/secret_key.pem")
    );
  } catch (e) {
    console.log(`  ⚠️  Could not load key files: ${e.message}. Skipping.`);
    return null;
  }

  const accountHash = keys.publicKey.toAccountHashStr();
  console.log(`  Account hash: ${accountHash}`);

  // Get current state root hash first
  const stateRootRes = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1,
      method: "chain_get_state_root_hash",
      params: {},
    }),
  });
  const stateRootData = await stateRootRes.json();
  const stateRootHash = stateRootData?.result?.state_root_hash;
  if (!stateRootHash) {
    console.log("  ⚠️  Could not get state root hash. Skipping.");
    return null;
  }
  console.log(`  State root hash: ${stateRootHash.slice(0, 16)}…`);

  // Query the account's stored value
  const accountRes = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 2,
      method: "state_get_item",
      params: {
        state_root_hash: stateRootHash,
        key: accountHash,
        path: [],
      },
    }),
  });
  const accountData = await accountRes.json();

  if (accountData?.error) {
    console.log(`  ⚠️  RPC error: ${JSON.stringify(accountData.error)}`);
    return null;
  }

  const namedKeys = accountData?.result?.stored_value?.Account?.named_keys || [];
  
  if (namedKeys.length === 0) {
    console.log("  ⚠️  No named keys found on this account.");
    return null;
  }

  console.log(`  Found ${namedKeys.length} named key(s) on account:`);
  for (const nk of namedKeys) {
    console.log(`    ${nk.name}: ${nk.key}`);
  }

  // Odra stores the ContractPackage under a "hash-" named key.
  // Query that stored value to confirm it's a ContractPackage.
  for (const nk of namedKeys) {
    const key = nk.key || "";
    if (!key.startsWith("hash-") && !key.startsWith("contract-")) continue;

    const svRes = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0", id: 10,
        method: "state_get_item",
        params: { state_root_hash: stateRootHash, key, path: [] },
      }),
    });
    const svData = await svRes.json();
    const sv = svData?.result?.stored_value;
    const svType = sv ? Object.keys(sv)[0] : null;

    if (svType === "ContractPackage") {
      // The named key IS the contract package hash — just reformat the prefix
      const hexPart = key.replace(/^hash-/, "").replace(/^contract-package-hash-/, "");
      const packageHash = `contract-package-hash-${hexPart}`;
      const contractHash = sv.ContractPackage?.versions?.[0]?.contract_hash || "(unknown)";
      console.log(`  ✅ Found ContractPackage under named key '${nk.name}'`);
      console.log(`  Contract hash (v1): ${contractHash}`);
      return packageHash;
    }
    if (svType === "Contract") {
      const pkgHash = sv.Contract?.contract_package_hash;
      if (pkgHash) {
        console.log(`  ✅ Found Contract; package hash: ${pkgHash}`);
        return `contract-package-hash-${pkgHash}`;
      }
    }
  }

  console.log("  No contract package found in any named key.");
  return null;
}

// ─── Strategy 3: Raw RPC info_get_deploy ─────────────────────────────────────

async function tryRawRPC() {
  console.log("\n[Strategy 3] Querying raw Casper RPC (info_get_deploy)...");

  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1,
      method: "info_get_deploy",
      params: { deploy_hash: DEPLOY_HASH },
    }),
  });

  if (!res.ok) {
    console.log(`  ⚠️  RPC returned HTTP ${res.status}. Skipping.`);
    return null;
  }

  const data = await res.json();

  if (data?.error) {
    console.log(`  ⚠️  RPC error: ${JSON.stringify(data.error)}`);
    return null;
  }

  const execResults = data?.result?.execution_results || [];
  console.log(`  Execution results: ${execResults.length}`);

  if (execResults.length === 0) {
    console.log("  ⚠️  Execution results array is empty on this RPC node.");
    console.log("     This is a known issue with public testnet RPC nodes — they");
    console.log("     sometimes prune execution results from their local state.");
    console.log("     The deploy IS on-chain; the account named keys (Strategy 2)");
    console.log("     are the most reliable source for the package hash.");
    return null;
  }

  const transforms = execResults[0]?.result?.Success?.effect?.transforms || [];
  const { packageHash } = extractPackageHashFromTransforms(transforms);
  return packageHash || null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("ATLAS — Contract Package Hash Retrieval");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`Deploy hash: ${DEPLOY_HASH}`);
  console.log(`Explorer:    ${EXPLORER_DEPLOY}`);

  let packageHash = null;

  try { packageHash = await tryCSPRCloud(); } catch (e) { console.log(`  Error: ${e.message}`); }
  if (packageHash) { printResult(packageHash); return; }

  try { packageHash = await tryAccountNamedKeys(); } catch (e) { console.log(`  Error: ${e.message}`); }
  if (packageHash) { printResult(packageHash); return; }

  try { await tryRawRPC(); } catch (e) { console.log(`  Error: ${e.message}`); }

  // Final guidance
  console.log("\n─────────────────────────────────────────────────────");
  console.log("⚠️  Could not automatically retrieve the package hash.");
  console.log("");
  console.log("Options:");
  console.log("");
  console.log("  A. Open the explorer and look manually:");
  console.log(`     ${EXPLORER_DEPLOY}`);
  console.log("     Click the account link → look for 'named keys' on the account page.");
  console.log("     The contract-package-hash-... value is what you need.");
  console.log("");
  console.log("  B. Redeploy the contract to get a fresh deploy hash:");
  console.log("     node contract/deploy.js");
  console.log("     Then run this script again immediately after.");
  console.log("─────────────────────────────────────────────────────");
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err.message);
  process.exit(1);
});
