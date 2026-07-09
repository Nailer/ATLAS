# Contributing to ATLAS

Thank you for your interest in contributing to ATLAS — the Autonomous RWA Underwriting Mesh built on Casper. This guide explains how to contribute code, report bugs, or suggest improvements.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Branching Strategy](#branching-strategy)
4. [Commit Conventions](#commit-conventions)
5. [Pull Request Process](#pull-request-process)
6. [Development Environment](#development-environment)
7. [Reporting Bugs](#reporting-bugs)
8. [Feature Requests](#feature-requests)

---

## Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

---

## Getting Started

1. **Fork** the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/ATLAS.git
   cd ATLAS
   ```

2. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/<org>/ATLAS.git
   ```

3. **Set up each component** — see [Development Environment](#development-environment) below.

---

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready, protected |
| `develop` | Integration branch for feature work |
| `feat/<name>` | New features |
| `fix/<name>` | Bug fixes |
| `chore/<name>` | Tooling, CI, dependency updates |
| `docs/<name>` | Documentation-only changes |

All PRs should target `develop`, **not** `main` directly (except for hotfixes).

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

**Types:** `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`, `ci`

**Scopes:** `frontend`, `backend`, `contracts`, `agents`, `ci`, `docs`

**Examples:**
```
feat(contracts): add oracle update log contract
fix(backend): handle x402 payment timeout gracefully
docs(readme): update deployment hash and testnet link
ci: add cargo audit step to contracts job
```

---

## Pull Request Process

1. Ensure your branch is up to date with `develop`:
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```

2. Make sure all CI checks pass locally before pushing:
   - Frontend: `cd frontend && npm run lint && npm run build`
   - Backend: `cd backend && npm audit --audit-level=high`
   - Contracts: `cd atlas_registry && cargo clippy && cargo fmt --check`

3. Open a PR against `develop` and fill out the PR template.

4. At least **one maintainer review** is required before merging.

5. Squash-merge is preferred to keep history clean.

---

## Development Environment

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 20.x |
| npm | ≥ 10.x |
| Rust | nightly-2024-02-01 |
| `wasm32-unknown-unknown` target | via `rustup` |
| Odra CLI (`cargo odra`) | ≥ 2.8.x |

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

### Backend

```bash
cd backend
cp .env.example .env   # fill in your API keys
npm install
npm run dev
```

### Smart Contracts (Odra / Rust)

```bash
cd atlas_registry
rustup target add wasm32-unknown-unknown
cargo odra build       # compiles to WASM
cargo test             # runs unit tests
```

---

## Reporting Bugs

Please open a [GitHub Issue](../../issues/new?template=bug_report.md) with:

- A clear description of the bug
- Steps to reproduce
- Expected vs. actual behaviour
- Your environment (OS, Node version, browser if applicable)

For **security vulnerabilities**, see [SECURITY.md](SECURITY.md) — do not open a public issue.

---

## Feature Requests

Open a [GitHub Issue](../../issues/new?template=feature_request.md) with:

- The problem you're trying to solve
- Your proposed solution or approach
- Any alternatives you've considered
