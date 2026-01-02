import * as fs from 'fs'

export async function collectLogs(): Promise<string> {
    const path = process.env.GITHUB_WORKSPACE + '/_temp/_github_workflow.log'
    if (!fs.existsSync(path)) return ''
    const content = fs.readFileSync(path, 'utf8')
    return content.split('\n').slice(-5000).join('\n')
}
