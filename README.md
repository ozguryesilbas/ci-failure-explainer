🤖 CI Failure Explainer

Explains why your GitHub Actions CI failed and how to fix it, using AI.

Get root cause, evidence, and exact fix steps directly in the Job Summary.


✨ What it does

Analyzes real GitHub Actions logs

Finds the actual root cause

Explains failures using AI

Works with any language or framework


🧩 What failures are supported?

Any failure produced inside GitHub Actions, including:

Test failures

Sonar / quality gate failures

Docker build & push errors

Dependency issues

Missing secrets or env vars

Script & YAML errors

Jenkins, GitLab CI, and Bitbucket Pipelines are not supported.


🚀 Quick start

```yaml
- uses: ozguryesilbas/ci-failure-explainer@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```


🔑 Requirements

GitHub Actions

OpenAI API key


📦 Marketplace

👉 https://github.com/marketplace/actions/ci-failure-explainer


🔐 Costs & privacy

You use your own OpenAI API key

No logs or secrets are stored
