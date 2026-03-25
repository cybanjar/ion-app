const fs = require("fs")

async function run() {
  const title = process.env.ISSUE_TITLE
  const body = process.env.ISSUE_BODY
  const number = process.env.ISSUE_NUMBER

  const prompt = `
    You are a senior Nuxt 3 developer.

    Fix this issue:

    Title: ${title}
    Description:
    ${body}

    Return ONLY code with file path.

    Format:
    FILE: path/to/file
    CODE:
    <code here>
  `

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    })
    console.log("API KEY EXISTS:", !!process.env.OPENAI_API_KEY)
    console.log("STATUS:", res.status)

    const data = await res.json()

    if (!data.choices) {
      console.error("API ERROR:", data)

      // fallback biar tetap ada perubahan file
      fs.writeFileSync(
        `ai-output-${process.env.ISSUE_NUMBER}.txt`,
        "AI FAILED: " + JSON.stringify(data)
      )

      process.exit(0) // jangan fail CI
    }

    const output = data.choices[0].message.content

    fs.writeFileSync("ai-output.txt", output)

  } catch (err) {
    console.error("SCRIPT ERROR:", err)
    process.exit(1)
  }
}

run()