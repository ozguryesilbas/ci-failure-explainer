"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainFailure = explainFailure;
const openai_1 = __importDefault(require("openai"));
const client = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY
});
async function explainFailure(logs) {
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
    });
    return res.choices[0].message.content || '';
}
