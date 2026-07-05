# Finora — Smart Finance Dashboard

Modern personal finance dashboard built with React + Vite. Features balances overview, transactions, cards, investments, budgets, bills, dark/light mode, and EN/AR (RTL) support.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy (GitHub Pages)

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`):

1. Push this repo to GitHub (branch `main`).
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Every push to `main` builds and publishes the site automatically.

Site URL: `https://<username>.github.io/<repo-name>/`
