const { Octokit } = require("@octokit/rest");
const OpenAI = require("openai");
const fs = require("fs");
const { execSync } = require("child_process");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  // 1. Dapatkan daftar semua file di repo (exclude node_modules)
  const fileTree = execSync('find . -maxdepth 3 -not -path "*/.*" -not -path "./node_modules/*"').toString();

  const prompt = `
    Anda adalah AI Senior Developer.
    
    CONTEXT:
    - Tech Stack: ${fs.readFileSync('./package.json', 'utf8')}
    - File Tree: 
    ${fileTree}

    ISSUE:
    - Judul: ${process.env.ISSUE_TITLE}
    - Deskripsi: ${process.env.ISSUE_BODY}

    TUGAS:
    1. Jika ini 'ai-fix', cari file yang paling relevan dengan bug tersebut.
    2. Jika ini 'ai-feature', tentukan di mana file baru harus dibuat atau file mana yang harus dimodifikasi.
    
    OUTPUT (JSON ONLY):
    {
      "action": "fix" atau "feature",
      "explanation": "Alasan perubahan",
      "files": [
        {
          "path": "path/ke/file.js",
          "content": "Isi kode lengkap yang baru atau perubahan total",
          "status": "modified" atau "new"
        }
      ]
    }
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful coding assistant." }, { role: "user", content: prompt }],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  const response = JSON.parse(completion.choices[0].message.content);

  // 3. Eksekusi Penulisan File Secara Otomatis
  response.files.forEach(file => {
    const dir = file.path.split('/').slice(0, -1).join('/');
    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file.path, file.content, 'utf8');
    console.log(`Successfully wrote to ${file.path}`);
  });
}

run();