const fs = require("fs")
const path = require("path")

const title = process.env.ISSUE_TITLE || ""
const body = process.env.ISSUE_BODY || ""
const number = process.env.ISSUE_NUMBER || "unknown"

// ambil struktur project (fokus src)
function getProjectStructure(dir, depth = 2) {
  if (depth === 0) return ""

  return fs.readdirSync(dir)
    .map(file => {
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        return `${file}/\n` + getProjectStructure(fullPath, depth - 1)
      }
      return file
    })
    .join("\n")
}

async function run() {
  try {
    const structure = getProjectStructure("./src")

    const prompt = `
      You are a senior Vue 3 developer using Vue CLI and Ionic Vue.

      You MUST fix the issue below.
      DO NOT ask questions.
      DO NOT explain.
      DO NOT return text.

      If information is incomplete, MAKE A BEST GUESS.

      PROJECT STRUCTURE (src):
      ${structure}

      PROJECT STACK:
      - Vue 3
      - Vue Router
      - Pinia
      - Ionic Vue

      ISSUE:
      Title: ${title}
      Description:
      ${body}

      RULES:
      - Always return at least ONE file change
      - Focus on src/components, src/views, src/pages
      - Use Vue 3 Composition API if possible
      - If UI bug → fix component
      - If file doesn't exist → create new one

      OUTPUT FORMAT (STRICT):
      ACTION: update
      FILE: src/components/Example.vue
      CODE:
      <full code>

      You can return multiple ACTION blocks.

      Only return this format. No explanation.
    `

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: "You are an expert Vue 3 + Ionic developer. Always output code only."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    })

    console.log("STATUS:", res.status)

    const data = await res.json()

    if (!data.choices) {
      console.error("API ERROR:", data)

      fs.writeFileSync(
        `ai-output-${number}.txt`,
        "AI FAILED:\n" + JSON.stringify(data, null, 2)
      )

      process.exit(0)
    }

    const output = data.choices[0].message.content

    console.log("AI OUTPUT:\n", output)

    if (!output.includes("FILE:") || !output.includes("CODE:")) {
      fs.writeFileSync(
        `ai-output-${number}.txt`,
        "INVALID FORMAT:\n" + output
      )
      process.exit(0)
    }

    const blocks = output.split("ACTION:")

    let fileCount = 0

    blocks.forEach(block => {
      const fileMatch = block.match(/FILE:\s(.+)/)
      const codeMatch = block.match(/CODE:\n([\s\S]*)/)

      if (fileMatch && codeMatch) {
        const filePath = fileMatch[1].trim()
        const code = codeMatch[1].trim()

        // whitelist path (biar aman)
        const allowed = ["src/components", "src/views", "src/pages"]

        if (!allowed.some(p => filePath.startsWith(p))) {
          console.log("SKIP:", filePath)
          return
        }

        const fullPath = path.resolve(filePath)

        fs.mkdirSync(path.dirname(fullPath), { recursive: true })
        fs.writeFileSync(fullPath, code)

        console.log("UPDATED:", filePath)
        fileCount++
      }
    })

    if (fileCount === 0) {
      fs.writeFileSync(
        `ai-output-${number}.txt`,
        "NO FILE CHANGED:\n" + output
      )
    }

  } catch (err) {
    console.error("SCRIPT ERROR:", err)

    fs.writeFileSync(
      `ai-error-${number}.txt`,
      err.toString()
    )

    process.exit(1)
  }
}

run()