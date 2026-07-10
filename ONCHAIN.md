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

## Contract Package Hash

```
contract-package-hash-3468e75a524a6c7483e22307f149a3d30abadb1582258739f6a8a678fe47a1bc
```

Explorer: [testnet.cspr.live/contract-package/3468e75a…](https://testnet.cspr.live/contract-package/3468e75a524a6c7483e22307f149a3d30abadb1582258739f6a8a678fe47a1bc)

## Contract Hash (Version 1)

```
contract-82444dfcd641f1278863abddd7a4d83b91d1cda0e431ce7be9a4425d9cd6ef48
```

## Account (Deployer)

```
account-hash-716a50dcbd8d9f3ec474c7bc2436227f3262a093ba49b31c42d82b59b2069cdc
```

---

## Transaction 1 — Contract Install

| Field | Value |
|---|---|
| **Description** | Installs the ATLAS Asset Registry WASM on Casper testnet. Creates the ContractPackage with `register_asset()` and `get_total_assets()` entry points. |
| **Deploy Hash** | `3d66af45bf5d93abc9411ed576dc19978cc92b6759c3aceb97cc0541e2171d64` |
| **Explorer** | [testnet.cspr.live/deploy/3d66af45…](https://testnet.cspr.live/deploy/3d66af45bf5d93abc9411ed576dc19978cc92b6759c3aceb97cc0541e2171d64) |
| **Cost** | 500 CSPR |
| **Entry Point** | `call` (contract install) |
| **Result** | Success — ContractPackage stored under named key `atlas_asset_registry` |

---

## Transaction 2 — register_asset() Call

| Field | Value |
|---|---|
| **Description** | Calls `register_asset()` on the deployed ATLAS Asset Registry. Increments `total_assets` from 0 → 1 and returns the new count. Demonstrates the contract is live and callable. |
| **Deploy Hash** | `0887fef018ee02fcf66a3cc50ef7cf283d8173bcf15eb969ef53a66a72804091` |
| **Explorer** | [testnet.cspr.live/deploy/0887fef0…](https://testnet.cspr.live/deploy/0887fef018ee02fcf66a3cc50ef7cf283d8173bcf15eb969ef53a66a72804091) |
| **Cost** | ~10 CSPR |
| **Entry Point** | `register_asset` |
| **Result** | Returns `u32` = 1 (first registered asset) |

---

## Entry Points

| Entry Point | Args | Returns | Description |
|---|---|---|---|
| `register_asset` | none | `u32` | Increments `total_assets` counter and returns new count. Production version accepts a SHA-256 document fingerprint. |
| `get_total_assets` | none | `u32` | Returns the current number of registered assets (read-only). |

---

## Account Named Keys (post-deploy)

| Name | Value |
|---|---|
| `atlas_asset_registry` | `hash-3468e75a524a6c7483e22307f149a3d30abadb1582258739f6a8a678fe47a1bc` (ContractPackage) |
| `atlas_asset_registry_access_token` | `uref-fe0b7b430b68ebf18d2b4c0696d648ef20c1a2e2e442de3bd6b71c21a966f05a-007` |

---

## Verification Commands

```bash
# 1. Get the contract package stored value
curl -s https://node.testnet.casper.network/rpc \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0","id":1,
    "method":"state_get_item",
    "params":{
      "state_root_hash":"<latest-state-root>",
      "key":"hash-3468e75a524a6c7483e22307f149a3d30abadb1582258739f6a8a678fe47a1bc",
      "path":[]
    }
  }' | jq '.result.stored_value.ContractPackage'

# 2. Run the helper script (auto-derives state root and package hash)
node contract/get-package-hash.js

# 3. Call register_asset() to create another transaction
node contract/call-register-asset.js
```

---

## DoraHacks BUIDL Page Content

Paste the following into your BUIDL page under **"Contract package hashes and sample Testnet transactions"**:

> **Contract Package Hash:**
> `contract-package-hash-3468e75a524a6c7483e22307f149a3d30abadb1582258739f6a8a678fe47a1bc`
> [View on testnet.cspr.live](https://testnet.cspr.live/contract-package/3468e75a524a6c7483e22307f149a3d30abadb1582258739f6a8a678fe47a1bc)
>
> **Transaction 1 — Contract Install** (`call`): Deploys the ATLAS Asset Registry WASM to Casper testnet. On success, stores the ContractPackage under named key `atlas_asset_registry` on the deploying account.
> `3d66af45bf5d93abc9411ed576dc19978cc92b6759c3aceb97cc0541e2171d64`
> [View on testnet.cspr.live](https://testnet.cspr.live/deploy/3d66af45bf5d93abc9411ed576dc19978cc92b6759c3aceb97cc0541e2171d64)
>
> **Transaction 2 — register_asset()**: Calls the `register_asset` entry point on the live contract. Increments `total_assets` from 0 → 1 and returns the new count. Demonstrates the contract is callable and state is being updated on-chain.
> `0887fef018ee02fcf66a3cc50ef7cf283d8173bcf15eb969ef53a66a72804091`
> [View on testnet.cspr.live](https://testnet.cspr.live/deploy/0887fef018ee02fcf66a3cc50ef7cf283d8173bcf15eb969ef53a66a72804091)
