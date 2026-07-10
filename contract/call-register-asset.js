/**
 * call-register-asset.js
 *
 * Calls register_asset() on the deployed ATLAS Asset Registry contract.
 * This creates a second on-chain transaction demonstrating the contract is callable.
 *
 * Usage:
 *   node contract/call-register-asset.js
 *
 * Requires casper_keys/ to be present.
 */

const { CasperClient, CLValueBuilder, Contracts, Keys, RuntimeArgs } = require("casper-js-sdk");
const path = require("path");

const NODE_ADDRESS = "https://node.testnet.casper.network/rpc";
const CHAIN_NAME = "casper-test";
// The individual contract version hash (hash- prefix as required by casper-js-sdk)
const CONTRACT_HASH = "hash-82444dfcd641f1278863abddd7a4d83b91d1cda0e431ce7be9a4425d9cd6ef48";

async function main() {
  const client = new CasperClient(NODE_ADDRESS);
  const contract = new Contracts.Contract(client);

  const keys = Keys.Ed25519.parseKeyFiles(
    path.join(__dirname, "casper_keys/public_key.pem"),
    path.join(__dirname, "casper_keys/secret_key.pem")
  );

  // Set the exact contract version hash
  contract.setContractHash(CONTRACT_HASH);


  const deploy = contract.callEntrypoint(
    "register_asset",
    RuntimeArgs.fromMap({}), // register_asset takes no arguments
    keys.publicKey,
    CHAIN_NAME,
    "10000000000", // 10 CSPR — entry point call, much cheaper than install
    [keys]
  );

  console.log("Calling register_asset() on ATLAS Asset Registry...");
  const deployHash = await client.putDeploy(deploy);
  console.log("\n✅ Call sent!");
  console.log("Deploy hash:", deployHash);
  console.log(`\nCheck its status here:\nhttps://testnet.cspr.live/deploy/${deployHash}`);
  console.log("\nThis is Transaction 2 for your DoraHacks BUIDL page.");
  console.log("Description: Calls register_asset() on the ATLAS Asset Registry,");
  console.log("incrementing total_assets from 0 → 1 and returning the new count.");
}

main().catch((err) => {
  console.error("❌ Call failed:", err.message || err);
});
