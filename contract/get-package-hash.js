/**
 * get-package-hash.js
 *
 * Queries the Casper testnet RPC to retrieve the contract package hash
 * created when the ATLAS Asset Registry (Flipper) was deployed.
 *
 * Usage:
 *   node contract/get-package-hash.js
 *
 * Requires Node 18+ (uses built-in fetch).
 *
 * Output:
 *   The contract-package-hash-<hex> string to paste into ONCHAIN.md
 *   and your DoraHacks BUIDL page.
 */

const RPC_URL = "https://node.testnet.casper.network/rpc";
const DEPLOY_HASH = "9b3ecf721f759fd6fa0a90b581ed6ffe9d35ba034670d0845116af978213d7e5";

async function getDeployResult() {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "info_get_deploy",
      params: { deploy_hash: DEPLOY_HASH },
    }),
  });

  if (!response.ok) {
    throw new Error(`RPC error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  console.log("Querying Casper testnet RPC...");
  console.log(`Deploy hash: ${DEPLOY_HASH}\n`);

  const result = await getDeployResult();

  if (result.error) {
    console.error("RPC returned an error:", JSON.stringify(result.error, null, 2));
    process.exit(1);
  }

  const deploy = result.result;
  const execResults = deploy?.execution_results;

  if (!execResults || execResults.length === 0) {
    console.log("⚠️  Deploy found but execution results are not yet available.");
    console.log("   Try again in a few seconds.");
    return;
  }

  const execResult = execResults[0]?.result;

  if (execResult?.Failure) {
    console.error("❌ Deploy failed:", JSON.stringify(execResult.Failure, null, 2));
    process.exit(1);
  }

  console.log("✅ Deploy status: Success\n");

  // Extract contract package hash from effect transforms
  const transforms = execResult?.Success?.effect?.transforms || [];
  let contractHash = null;
  let packageHash = null;

  for (const t of transforms) {
    const key = t.key || "";
    if (key.startsWith("contract-package-hash-")) {
      packageHash = key;
    }
    if (key.startsWith("contract-") && !key.startsWith("contract-package")) {
      contractHash = key;
    }
  }

  if (packageHash) {
    console.log("─────────────────────────────────────────────────────");
    console.log("CONTRACT PACKAGE HASH:");
    console.log("");
    console.log(`  ${packageHash}`);
    console.log("");
    console.log("─────────────────────────────────────────────────────");
    console.log("Paste this into ONCHAIN.md and your DoraHacks BUIDL page.");
  } else {
    console.log("Package hash not found in transforms. All transform keys:\n");
    transforms.forEach((t) => { if (t.key) console.log(" ", t.key); });
    console.log("\nFull execution result:");
    console.log(JSON.stringify(execResult, null, 2).slice(0, 4000));
  }

  if (contractHash) {
    console.log(`\nContract hash (version key): ${contractHash}`);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
