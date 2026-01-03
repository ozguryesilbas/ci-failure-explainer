import * as core from '@actions/core'
import * as github from '@actions/github'
import AdmZip from 'adm-zip'
import OpenAI from 'openai'

async function run() {
    try {
        const githubToken = process.env.GITHUB_TOKEN
        const openaiKey = process.env.OPENAI_API_KEY

        if (!githubToken) {
            throw new Error('GITHUB_TOKEN missing')
        }

        if (!openaiKey) {
            throw new Error('OPENAI_API_KEY missing')
        }

        const { owner, repo } = github.context.repo
        const runId = github.context.runId

        const octokit = github.getOctokit(githubToken)

        const logResponse = await octokit.request(
            'GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs',
            {
                owner,
                repo,
                run_id: runId
            }
        )

        const zipBuffer = Buffer.from(logResponse.data as ArrayBuffer)
        const zip = new AdmZip(zipBuffer)
        const entries = zip.getEntries()

        const errorLogs = entries
            .map((e: AdmZip.IZipEntry) => e.getData().toString('utf8'))
            .filter((log: string) =>
                log.includes('Error') ||
                log.includes('ERROR') ||
                log.includes('Failed') ||
                log.includes('FAILED') ||
                log.includes('exit code')
            )
            .join('\n')
            .slice(0, 8000)

        if (!errorLogs) {
            await core.summary
                .addHeading('CI Failure Explained')
                .addRaw('No meaningful failure logs found.')
                .write()
            return
        }

        const openai = new OpenAI({
            apiKey: openaiKey
        })

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a senior CI/CD engineer. Be concise and practical.'
                },
                {
                    role: 'user',
                    content: `Analyze the following CI failure logs and respond with:
1. Root cause
2. Evidence from logs
3. Exact fix steps

Logs:
${errorLogs}`
                }
            ]
        })

        const explanation =
            completion.choices[0]?.message?.content ?? 'No explanation generated.'

                await core.summary
                    .addHeading('❌ CI Failure Explained')
                    .addRaw(explanation)
                    .write()

    } catch (err) {
        core.setFailed((err as Error).message)
    }
}

run()
