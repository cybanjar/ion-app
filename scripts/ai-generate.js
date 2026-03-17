const fs = require("fs")

async function run() {
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
            content: "Fix bug from issue"
          }
        ]
      })
    })
    console.log("API KEY EXISTS:", !!process.env.OPENAI_API_KEY)
    console.log("STATUS:", res.status)

    const data = await res.json()

    if (!data.choices) {
      console.error("API ERROR:", data)
      process.exit(1)
    }

    const output = data.choices[0].message.content

    fs.writeFileSync("ai-output.txt", output)

  } catch (err) {
    console.error("SCRIPT ERROR:", err)
    process.exit(1)
  }
}

run()