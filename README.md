CI Failure Explainer 🤖

Automatically explains why your GitHub Actions CI failed and how to fix it, using AI.

No more scrolling through logs.
Get root cause, evidence, and exact fix steps directly in the Job Summary.

✨ What it does

Detects failed GitHub Actions workflows

Downloads real workflow logs

Filters noise (git warnings, irrelevant output)

Finds the actual root cause

Explains the failure using AI

Writes a clear explanation to Job Summary

Works with any language or framework running inside GitHub Actions

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

🧩 What failures can it explain?

CI Failure Explainer analyzes logs produced by GitHub Actions workflows.

Any tool that runs inside GitHub Actions (tests, Sonar, Docker, scripts, etc.)
is supported.

🧪 Test failures (inside GitHub Actions)

Unit / integration test failures

AssertionError, timeout

Test framework errors (JUnit, Jest, PyTest, etc.)

Example:
“Test X failed due to a null pointer exception.”

🔍 Sonar / quality gate failures

(when Sonar runs as a GitHub Actions step)

Quality Gate failed

Coverage below threshold

Blocker / critical code issues

Example:
“Sonar Quality Gate failed because coverage dropped below 80%.”

🐳 Docker & build failures

Docker image build failures

Base image pull errors

Registry authentication errors (401 / 403)

Push failures

Example:
“Docker image push failed due to missing registry credentials.”

📦 Dependency & package failures

npm / Maven / Gradle / pip dependency not found

Version conflicts

Lockfile mismatches

Example:
“Build failed because the lodash dependency is missing.”

🔐 Secret & environment failures

Missing environment variables

Undefined secrets

Invalid or expired tokens

Example:
“DOCKER_PASSWORD secret is not defined.”

🧱 Script & configuration failures

Bash / shell script exit code errors

YAML syntax issues

File or path not found errors

Example:
“Workflow failed due to invalid indentation in ci.yml.”

❌ Not supported (v1)

Jenkins logs

GitLab CI logs

Bitbucket Pipelines logs

These platforms are not supported in v1.

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

🔐 Costs & privacy

Users provide their own OpenAI API key

The action does not store or log secrets

API keys are masked by GitHub and never exposed

📦 Marketplace

👉 https://github.com/marketplace/actions/ci-failure-explainer

🛠 Built with

GitHub Actions API

OpenAI

TypeScript

@vercel/ncc