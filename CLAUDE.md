# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DFG Finance OS is a personal finance dashboard PWA (Progressive Web App) built as a **monolithic single-file app** (`daniel_finance_v6.html`). It is Spanish-language, PIN-protected, and integrates with Supabase for data persistence.

## Running the App

No build step. No package manager. No dependencies to install.

- **Local:** Open `daniel_finance_v6.html` directly in a browser
- **Production:** Deploy to any static host with HTTPS (required for PWA/Service Worker)
- Chart.js is loaded via CDN; Supabase client is loaded via CDN

## Architecture

### Single-File Structure

All HTML, CSS, and JavaScript live in `daniel_finance_v6.html` (~1859 lines). There is no build pipeline, no module bundler, and no framework.

### State Management

A global `DB` object is the single source of truth for all financial data:
- `DB.all` — all transactions
- `DB.income` / `DB.expenses` / `DB.real_exp` — filtered subsets
- `DB.balances` — monthly balance snapshots
- `DB.monthly` — aggregated monthly data (income, expenses, savings)
- `DB.curBal` — current net worth

On data load, transactions are grouped by month, charts are rebuilt, and all sections re-render via direct DOM manipulation.

### Supabase Integration

Data is persisted in Supabase (PostgreSQL). Two tables:
- `transactions` — all financial transactions
- `monthly_balance` — month-by-month historical snapshots

Helper functions `sbPost`, `sbDelete`, `sbGet` wrap Supabase API calls. No SDK install needed — CDN loaded.

### Balance Calculation Logic

- `SNAPSHOT_DATE` (currently March 14, 2026) divides historical vs. live data
- Historical balances before snapshot come from `monthly_balance` table
- Post-snapshot balance is calculated live from diary entries

### Authentication

PIN-based auth using SHA-256. The PIN hash is stored in the `PIN_HASH` constant. Authentication flag stored in `sessionStorage.dfg_auth`.

To change PIN: hash the new PIN with SHA-256 at emn178.github.io/online-tools/sha256.html and replace `PIN_HASH` in the file.

### App Sections

| Section | Description |
|---|---|
| Home | Net worth KPIs, progress to $50M goal |
| 01 Overview | Monthly net worth chart, salary/Affirm timeline |
| 02 Flujo | Cash flow: income vs. expenses vs. savings |
| 03 Gastos | Spending by category, top transactions |
| 04 Proyección | Goal projection with 3 scenarios, adjustable APY/target sliders |
| 05 Diario | Live transaction entry with Supabase sync |
| 06 Mes Perfecto | Real vs. optimal spending, financial score, counterfactual analysis |
| 07 Portafolios | Monte Carlo simulation (Conservative / Moderate / Aggressive) |
| Calculadora | Compound interest calculator |
| Insights | Dynamic spending/savings insights |

### Key Implementation Details

- **Monte Carlo** uses Box-Muller transform for normally-distributed random numbers
- **Counterfactual analysis** computes net worth if spending always matched the $232K/month optimal
- **Percentile bands** P10/P50/P90 shown in portfolio projections
- **CSV export** available for transaction history
- **Offline support** via `sw.js` Service Worker (cache-first for static assets, network-first for Supabase/Fonts)

## Workflow: Task → Do → Verify

When making any visual or structural change to `daniel_finance_v6.html`, follow this cycle strictly.

### 1. Task
- Understand the goal before touching any file.
- If the task is ambiguous, ask one clarifying question before proceeding.

### 2. Do
- Make the minimal necessary changes to complete the task.
- Do not refactor or touch unrelated sections of the file.

### 3. Verify
- After every change, use the Playwright MCP to open the file in a browser.
- The app is a single HTML file — open it directly: `file:///absolute/path/to/daniel_finance_v6.html`
- Take a screenshot and visually inspect the result.
- Check for: layout breaks, missing chart renders, broken PIN screen, missing section content.
- If something looks wrong, fix it and re-verify before declaring the task done.
- **Never report a task as complete without a passing screenshot.**

### Verification Checklist
- PIN screen renders and accepts input
- Target section is visible and correctly styled
- Charts (Chart.js) render without errors
- No JavaScript console errors
- Mobile viewport (375px) does not break layout

## GitHub Actions

- `.github/workflows/claude.yml` — responds to `@claude` mentions in issues and PRs
- `.github/workflows/claude-code-review.yml` — automatic code review on PR open/sync

## PWA

- `manifest.json` — app manifest (name: "DFG Finance OS", lang: `es`, dark theme)
- `sw.js` — Service Worker with cache name `dfg-v6`; caches HTML, manifest, icons
- `icon-192.png` / `icon-512.png` — maskable PWA icons