<div align="center">

# ◈ DFG Finance OS

**Personal Finance Operating System**

*Track. Analyze. Project. Own your financial future.*

---

[![PWA](https://img.shields.io/badge/PWA-Ready-b89b6a?style=flat-square&logo=pwa&logoColor=white)](https://github.com/Lenfantsauvage998/03-4-2026-006-ORIGIN)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-3ecf8e?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Zero Dependencies](https://img.shields.io/badge/Build_Step-None-4d9fff?style=flat-square)](#)
[![Spanish](https://img.shields.io/badge/Language-Spanish-a78bfa?style=flat-square)](#)

</div>

---

## The Idea

Most finance apps show you numbers. DFG Finance OS shows you **your story** — where every peso came from, where it went, and where it's going.

Built for a single purpose: give one person complete, uncompromising clarity over their financial life. No subscriptions. No bloat. No third-party tracking. Just you, your data, and a dashboard that respects your intelligence.

> *"The best tool is the one you actually use."*

---

## What It Does

```
┌──────────────────────────────────────────────────────────────┐
│                     DFG Finance OS                           │
│                                                              │
│  Home          →  Net worth at a glance. $50M goal progress  │
│  01 Overview   →  Monthly wealth chart + salary timeline      │
│  02 Flujo      →  Income vs. expenses vs. savings            │
│  03 Gastos     →  Spending by category, filterable by method │
│  04 Proyección →  3-scenario goal projection with APY sliders│
│  05 Diario     →  Live transaction entry, cloud-synced       │
│  06 Mes Perfecto→ Real vs. optimal spend + financial score   │
│  07 Portafolios→  Monte Carlo simulation + account breakdown │
│  Calculadora   →  Compound interest calculator               │
│  Insights      →  Dynamic spending/savings intelligence      │
└──────────────────────────────────────────────────────────────┘
```

---

## Architecture

**One file. Zero build step. Total control.**

```
daniel_finance_v6.html   ← the entire application
manifest.json            ← PWA manifest
sw.js                    ← Service Worker (offline support)
icon-192.png             ← PWA icon
icon-512.png             ← PWA icon
```

Everything — HTML structure, CSS design system, JavaScript logic — lives in a single self-contained file. Open it in a browser. That's it.

---

## Stack

| Layer | Technology |
|---|---|
| **UI** | Vanilla HTML/CSS/JS — no framework |
| **Charts** | Chart.js (CDN) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | PIN-based, SHA-256 hashed |
| **Offline** | Service Worker, cache-first |
| **Deployment** | Any static host with HTTPS |

---

## Key Features

### Real-Time Cash Flow
Every transaction you log is instantly reflected across all modules — charts update, averages recalculate, projections shift.

### Monte Carlo Projections
The Portafolios module runs thousands of simulated futures using Box-Muller normally distributed returns — Conservative, Moderate, and Aggressive — to show P10 / P50 / P90 outcome bands.

### Account Distribution
Split your net worth across real accounts — CDTs, bank accounts, investment funds — and watch each one tracked independently while the total stays true.

### Payment Method Filtering
Every transaction records *how* it was paid. Filter Gastos by Efectivo, Nequi, Débito, or Crédito to understand spending patterns per payment channel.

### Mes Perfecto Score
Compares your actual monthly spending against an optimal $232K/month budget. Shows you the counterfactual: what would your net worth be if you'd always spent optimally?

### Offline First
Works without internet. The Service Worker caches the app shell. Supabase syncs when connectivity returns.

---

## Security

- PIN is **never stored** — only its SHA-256 hash
- Auth state lives in `sessionStorage` — clears on tab close
- No analytics, no telemetry, no external data sharing
- All financial data stays in your own Supabase project

---

## Running Locally

```bash
# No install. No npm. No build.
# Just open the file.

open daniel_finance_v6.html
```

For PWA features (Service Worker, install prompt), serve over HTTPS or use a local HTTPS server.

---

## Deploying

Any static host works — GitHub Pages, Netlify, Vercel, Cloudflare Pages. HTTPS required for PWA.

```bash
# Example: push to GitHub Pages
git add .
git commit -m "Deploy"
git push origin main
```

---

<div align="center">

**Built for one. Designed for clarity.**

*DFG Finance OS — because your money deserves better than a spreadsheet.*

</div>
