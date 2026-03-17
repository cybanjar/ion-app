import fs from "fs"
import fetch from "node-fetch"

const issueTitle = process.env.ISSUE_TITLE
const issueBody = process.env.ISSUE_BODY

const prompt = `
You are a senior developer.
Fix or implement based on this issue:

Title: ${issueTitle}
Description: ${issueBody}

Return only code changes.
`

async function run() {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  })
  console.log("STATUS:", res.status)

  const data = await res.json()
  if (!data.choices) {
    console.error("ERROR RESPONSE:", data)
    process.exit(1)
  }

  const output = data.choices[0].message.content

  // contoh: tulis ke file
  fs.writeFileSync("ai-output.txt", output)
}

run()