# ATLAS — On-Chain Reference

All verified hashes and transactions for ATLAS deployed on **Casper Testnet**.

---

## Contract: ATLAS Asset Registry

| Field | Value |
|---|---|
| **Network** | `casper-test` |
| **Contract Name** | ATLAS Asset Registry (`Flipper`) |
| **Framework** | Odra v2.8.2 · Rust `wasm32-unknown-unknown` |
| **WASM Source** | `atlas_registry/flipper/src/flipper.rs` |
| **WASM Binary** | `atlas_registry/flipper/wasm/Flipper.wasm` |

---

## Transaction 1 — Contract Install

| Field | Value |
|---|---|
| **Description** | Initial WASM deploy that installs the ATLAS Asset Registry contract on Casper testnet |
| **Deploy Hash** | `9b3ecf721f759fd6fa0a90b581ed6ffe9d35ba034670d0845116af978213d7e5` |
| **Explorer** | [testnet.cspr.live/deploy/9b3ecf72…](https://testnet.cspr.live/deploy/9b3ecf721f759fd6fa0a90b581ed6ffe9d35ba034670d0845116af978213d7e5) |
| **Cost** | 200 CSPR (Odra init + storage allocation) |
| **Entry Point** | `call` (contract install) |
| **Result** | `Success` |

**What this transaction does:**
Compiles the Flipper contract (`total_assets: Var<u32>` with `register_asset()` and `get_total_assets()` entry points) to WASM via `cargo odra build` and deploys it to the Casper testnet using `deploy.js`. On success, Casper creates a `ContractPackage` and `Contract` stored value in global state under the deploying account's named keys.

---

## Contract Package Hash

> **Retrieve by running:** `node contract/get-package-hash.js`
>
> This script queries the Casper testnet RPC for the deploy execution result and extracts the `contract-package-hash` from the named keys stored under the deploying account.

```
contract-package-hash-[PASTE RESULT FROM: node contract/get-package-hash.js]
```

Once retrieved, this hash can be used to:
- Call `state_get_item` on the RPC to read `total_assets`
- Reference the contract in future agent-deployed asset contracts
- Verify the contract on-chain independently of the deploy hash

---

## Transaction 2 — register_asset() call

> **To generate:** Run `node contract/call-register-asset.js` after adding your keys back to `contract/casper_keys/` (see `contract/generate-keys.js` to generate a fresh funded keypair from the Casper testnet faucet).

| Field | Value |
|---|---|
| **Description** | Calls `register_asset()` on the deployed ATLAS Asset Registry, incrementing `total_assets` from 0 → 1 and returning the new asset count |
| **Deploy Hash** | `[PASTE RESULT AFTER RUNNING call-register-asset.js]` |
| **Explorer** | `https://testnet.cspr.live/deploy/[hash]` |
| **Entry Point** | `register_asset` |
| **Result** | Returns `u32` (new total count) |

---

## Entry Points

| Entry Point | Args | Returns | Description |
|---|---|---|---|
| `register_asset` | none | `u32` | Increments `total_assets` counter and returns the new count. In production this also accepts the document SHA-256 fingerprint as an argument. |
| `get_total_assets` | none | `u32` | Returns the current number of registered assets without mutating state. |

---

## Verification Steps

```bash
# 1. Verify the install deploy
curl https://node.testnet.casper.network/rpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"chain_get_block_transfers","params":{"block_identifier":{"Hash":"9b3ecf721f759fd6fa0a90b581ed6ffe9d35ba034670d0845116af978213d7e5"}},"id":1}'

# 2. Retrieve package hash (use the helper script)
node contract/get-package-hash.js

# 3. Read total_assets named key (after retrieving package hash)
# Replace <package-hash> with output from step 2
curl https://node.testnet.casper.network/rpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"state_get_item","params":{"state_root_hash":"<latest>","key":"contract-package-hash-<package-hash>","path":["total_assets"]},"id":1}'
```
