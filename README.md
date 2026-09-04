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

### Command Palette (`Ctrl/⌘ + K`)
One box to jump to any section, run an action (new expense, voice entry, PDF export, theme, sign out) or find a transaction by description, category, amount or date — a transaction hit opens it for editing. Press `N` anywhere to start a new expense, `Esc` to close anything.

### Edit & Undo
Every transaction row has ✎ edit and ✕ delete. Editing keeps linked credit-card balances in sync. Deleting shows a 6-second **Deshacer** toast that restores the row.

### Daily Cockpit
At the top of Diario: what you spent today, how much you can spend per remaining day of the month, and two streaks — consecutive days logging and consecutive no-spend days. Frequent transactions appear as chips: one tap prefills amount, category, payment method and description.

### Spending Heatmap & Month Compare
Gastos shows a 16-week calendar heatmap of daily spend and a category-by-category comparison with the previous month (month-to-date while the month is in progress, so day 4 isn't compared against 31 days).

### Themes
Five visual themes (Phantom, Carbon, Forest, Solar, Arctic) switchable from the 🎨 button; the choice persists on the device and overrides `client.json`.

### Local AI Assistant (🧠)
Turns free text or voice — *"ayer pagué 32 mil de taxi con nequi"*, *"muéstrame los gastos de agosto en efectivo"*, *"cambia al tema solar"* — into a transaction proposal (always confirmed by you), a navigation, a Gastos filter, a theme change or a search. Nothing leaves the device. Two interchangeable backends, picked in the 🧠 panel:

| Backend | Where it runs | Model | Notes |
|---|---|---|---|
| **WebLLM** | In the browser (WebGPU) | Qwen2.5-1.5B-Instruct from Hugging Face, ~1 GB one-time download, cached offline | Works on phone and desktop; picks the f16 or f32 build by GPU capability |
| **Ollama** | On your PC at `http://localhost:11434` | Any pulled model, e.g. `qwen2.5:1.5b`, `llama3.2:1b`, `gemma3:1b` | Desktop only. Allow the app origin once: `[System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS','<app origin>','User')`, restart Ollama |

The model only proposes JSON; the app validates amounts, categories, dates and payment methods, and falls back to the built-in rules parser if the model is unavailable or answers badly.

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
