import OpenAI from 'openai'

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function explainFailure(logs: string): Promise<string> {
    const res = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are a senior DevOps engineer. Be concise.' },
            {
                role: 'user',
                content: `
CI failed. Explain briefly:

1. Root cause
2. Evidence
3. Fix steps

Logs:
${logs}
`
            }
        ]
    })

    return res.choices[0].message.content || ''
}
