const fs = require("fs")
const path = require("path")

const title = process.env.ISSUE_TITLE || ""
const body = process.env.ISSUE_BODY || ""
const number = process.env.ISSUE_NUMBER || "unknown"

// ambil struktur project (biar AI punya context)
function getProjectStructure(dir, depth = 2) {
  if (!fs.existsSync(dir) || depth === 0) return ""

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

// apply patch sederhana (diff)
function applyPatch(filePath, patch) {
  if (!fs.existsSync(filePath)) {
    console.log("❌ File not found:", filePath)
    return false
  }

  let content = fs.readFileSync(filePath, "utf-8")

  const lines = patch.split("\n")

  let oldLine = ""
  let newLine = ""

  lines.forEach(line => {
    if (line.startsWith("- ")) {
      oldLine = line.replace("- ", "").trim()
    }
    if (line.startsWith("+ ")) {
      newLine = line.replace("+ ", "").trim()
    }
  })

  if (!oldLine || !newLine) {
    console.log("❌ Invalid patch format")
    return false
  }

  if (!content.includes(oldLine)) {
    console.log("⚠️ Old line not found in file")
    return false
  }

  content = content.replace(oldLine, newLine)

  fs.writeFileSync(filePath, content)

  console.log("✅ PATCH APPLIED:", filePath)
  return true
}

async function run() {
  try {
    const structure = getProjectStructure("./src")

    const prompt = `
      You are a senior Vue 3 + Ionic developer.

      Fix the issue below.

      IMPORTANT:
      - DO NOT ask questions
      - DO NOT explain
      - ALWAYS return a PATCH

      PROJECT STRUCTURE (src):
      ${structure}

      ISSUE:
      Title: ${title}
      Description:
      ${body}

      RULES:
      - Find the correct file inside src/
      - Modify ONLY necessary part
      - DO NOT rewrite full file

      OUTPUT FORMAT:

      FILE: src/path/to/file.vue
      PATCH:
      - old code
      + new code

      You can return multiple FILE blocks.
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
            content: "You are an expert Vue 3 + Ionic developer. Only output PATCH."
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
      console.error("❌ API ERROR:", data)

      fs.writeFileSync(
        `ai-output-${number}.txt`,
        JSON.stringify(data, null, 2)
      )

      process.exit(0)
    }

    const output = data.choices[0].message.content

    console.log("AI OUTPUT:\n", output)

    if (!output.includes("FILE:") || !output.includes("PATCH:")) {
      console.log("❌ Invalid AI format")

      fs.writeFileSync(`ai-output-${number}.txt`, output)
      process.exit(0)
    }

    // parsing multiple FILE blocks
    const blocks = output.split("FILE:")

    let successCount = 0

    blocks.forEach(block => {
      const fileMatch = block.match(/^(.+)\n/)
      const patchMatch = block.match(/PATCH:\n([\s\S]*)/)

      if (fileMatch && patchMatch) {
        const filePath = fileMatch[1].trim()
        const patch = patchMatch[1].trim()

        // security: hanya izinkan src/
        if (!filePath.startsWith("src/")) {
          console.log("⛔ SKIP invalid path:", filePath)
          return
        }

        const fullPath = path.resolve(filePath)

        const success = applyPatch(fullPath, patch)

        if (success) successCount++
      }
    })

    if (successCount === 0) {
      console.log("⚠️ No patch applied, fallback to txt")

      fs.writeFileSync(`ai-output-${number}.txt`, output)
    }

  } catch (err) {
    console.error("❌ SCRIPT ERROR:", err)

    fs.writeFileSync(
      `ai-error-${number}.txt`,
      err.toString()
    )

    process.exit(1)
  }
}

run()