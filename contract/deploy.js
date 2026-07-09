const fs = require("fs");
const { CasperClient, Contracts, Keys, RuntimeArgs } = require("casper-js-sdk");

// ---- EDIT THESE THREE LINES ----
const WASM_PATH = "../atlas_registry/flipper/wasm/Flipper.wasm"; // optimized output of `cargo odra build`
const NODE_ADDRESS = "https://node.testnet.casper.network/rpc"; // official Casper Association public testnet node
const CHAIN_NAME = "casper-test";
// ---------------------------------

async function main() {
  const client = new CasperClient(NODE_ADDRESS);
  const contract = new Contracts.Contract(client);

  const keys = Keys.Ed25519.parseKeyFiles(
    "./casper_keys/public_key.pem",
    "./casper_keys/secret_key.pem"
  );

  const wasm = new Uint8Array(fs.readFileSync(WASM_PATH).buffer);

  const deploy = contract.install(
    wasm,
    RuntimeArgs.fromMap({}),
    "50000000000", // 50 CSPR gas payment — Odra contracts can be gas-hungry, this gives headroom
    keys.publicKey,
    CHAIN_NAME,
    [keys]
  );

  console.log("Sending deploy...");
  const deployHash = await client.putDeploy(deploy);
  console.log("\n✅ Deploy sent!");
  console.log("Deploy hash:", deployHash);
  console.log(`\nCheck its status here:\nhttps://testnet.cspr.live/deploy/${deployHash}`);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
});