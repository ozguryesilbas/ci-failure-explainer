import * as core from '@actions/core'
import * as github from '@actions/github'
import { collectLogs } from './logCollector'
import { explainFailure } from './ai'
import { formatMarkdown } from './formatter'

async function run() {
    const logs = await collectLogs()
    if (!logs) return

    const explanation = await explainFailure(logs)
    const markdown = formatMarkdown(explanation)

    await core.summary.addRaw(markdown).write()

    const token = process.env.GITHUB_TOKEN
    if (!token) return

    const pr = github.context.payload.pull_request
    if (!pr) return

    const octokit = github.getOctokit(token)
    const { owner, repo } = github.context.repo

    await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: pr.number,
        body: markdown
    })
}

run()
