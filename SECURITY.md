# Security Policy

## Supported Versions

ATLAS is currently in active development for the **Casper Agentic Buildathon 2026**.
The following versions receive security updates:

| Version | Supported          |
| ------- | ------------------ |
| `main`  | ✅ Active support  |
| Older branches | ❌ Not supported |

---

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability in ATLAS — including the smart contracts, agent services, or frontend — please **do not** open a public GitHub issue.

### How to Report

1. **Email**: Send a detailed report to the repository maintainer via GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability) feature:
   - Navigate to the **Security** tab of this repository
   - Click **"Report a vulnerability"**

2. **Include in your report**:
   - A clear description of the vulnerability and its impact
   - Steps to reproduce (proof-of-concept if possible)
   - The component affected (smart contract / agent service / frontend / CI)
   - Any suggested mitigation

### What to Expect

| Timeline | Action |
|---|---|
| **Within 48 hours** | Acknowledgment of your report |
| **Within 7 days** | Initial severity assessment and response |
| **Within 30 days** | Patch or mitigation for High/Critical issues |
| **After patch** | Public disclosure coordinated with reporter |

We follow responsible disclosure. Reporters who follow this process will be credited in the security advisory (unless they request anonymity).

---

## Severity Classification

We follow the [CVSS v3.1](https://www.first.org/cvss/v3.1/specification-document) scoring system:

| Severity | CVSS Score | Response SLA |
|---|---|---|
| **Critical** | 9.0 – 10.0 | 7 days |
| **High** | 7.0 – 8.9 | 14 days |
| **Medium** | 4.0 – 6.9 | 30 days |
| **Low** | 0.1 – 3.9 | Next release |

---

## Scope

### In Scope
- `atlas_registry/` — Odra/Rust smart contracts deployed to Casper
- `backend/` — Agent orchestration and API services
- `frontend/` — React/Vite user interface
- `contract/` — Casper deployment scripts
- GitHub Actions CI/CD pipeline

### Out of Scope
- Third-party services (Casper testnet infrastructure, CSPR.cloud, CSPR.trade)
- Social engineering attacks
- Denial-of-service attacks on testnet

---

## Security Tools in Use

- **GitHub CodeQL** — static analysis on every push and PR
- **Dependabot** — automated dependency vulnerability alerts and PRs
- **`npm audit`** — run in CI, blocking at `--audit-level=high`
- **`cargo audit`** — run in CI for Rust/Odra dependencies
- **Dependency Review Action** — blocks PRs that introduce High+ severity dependencies
