CI Failure Explainer 🤖

Automatically explains why your GitHub Actions CI failed and how to fix it, using AI.

No more scrolling through logs. Get root cause, evidence, and exact fix steps in seconds.


✨ What it does

Detects failed CI runs

Downloads real GitHub Actions logs

Filters noise (git warnings, irrelevant output)

Explains the failure using AI

Writes a clear report to Job Summary

Works with any language or framework


🧠 Example output

❌ CI Failure Explained

Root cause:
The CI failed because the dependency "lodash" is missing.

Evidence:
Error: Cannot find module 'lodash'
code: MODULE_NOT_FOUND

Fix steps:
1. Run `npm install lodash`
2. Ensure dependencies are installed in CI
3. Re-run the pipeline


🚀 How to use

1️⃣ Your CI workflow (.github/workflows/ci.yml)
name: CI

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: node -e "require('lodash')"

2️⃣ Explain workflow (.github/workflows/explain.yml)
name: Explain CI Failure

on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]

permissions:
  actions: read
  contents: read

jobs:
  explain:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - uses: ozguryesilbas/ci-failure-explainer@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}


🔑 Requirements

GitHub Actions

OpenAI API key

Add your key:

Settings → Secrets → Actions → New repository secret
Name: OPENAI_API_KEY


🧩 Why this action?

Works after CI finishes (no hacks)

Uses official GitHub APIs

Real log analysis, not guesses

Language-agnostic

Marketplace-ready architecture


💰 Pricing (planned)

Free: Public repositories

Pro: Private repositories, advanced analysis


🛠️ Built with

GitHub Actions API

OpenAI

TypeScript

@vercel/ncc


📦 Marketplace

👉 https://github.com/marketplace/actions/ci-failure-explainer

