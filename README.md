# Alwyn Munatsi — Portfolio: React Single-Page Site with an AI Chatbot and Auto-Synced Projects

[![Framework](https://img.shields.io/badge/Framework-React%2019%20%2B%20Vite%208-61DAFB?logo=react)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS%203-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Animation](https://img.shields.io/badge/Motion-Framer%20Motion-0055FF?logo=framer)](https://www.framer.com/motion/)
[![AI](https://img.shields.io/badge/Chatbot-Groq%20Llama%203.3%2070B-F55036)](https://console.groq.com/)
[![Automation](https://img.shields.io/badge/Sync-GitHub%20Actions-2088FF?logo=githubactions)](https://docs.github.com/actions)

The personal portfolio website of **Alwyn (Ndodana) Munatsi** — Data Engineer · Data Analyst · BI Developer · AI/ML Engineering. It is a responsive single-page **React 19 + Vite** site styled with **Tailwind CSS** and animated with **Framer Motion**. All content lives in one data file, an embedded **AI chatbot** (Groq, Llama 3.3 70B) answers visitors' questions about experience, skills and availability, and a daily **GitHub Actions** job pulls public repositories tagged `data-engineering` into the Projects section automatically.

Live at: [alwynmunatsi.com](https://alwynmunatsi.com) <!-- update with actual URL -->

---

## 1. Site Architecture & Data Flow

### Content & Deployment Flow
$$\text{portfolio.js + projects.generated.json} \xrightarrow{\text{React components}} \text{Single-page app} \xrightarrow{\text{vite build}} \text{Static site}$$

### Project Auto-Sync Flow
$$\text{GitHub Search API (topic: data-engineering)} \xrightarrow{\text{sync-projects.mjs (daily 09:00 UTC)}} \text{projects.generated.json} \xrightarrow{\text{commit if changed}} \text{Projects section}$$

1. **Single source of truth (`src/data/portfolio.js`):** Personal details, experience, education, curated projects, certifications, skills and the chatbot's context prompt.
2. **Auto-synced projects (`src/data/projects.generated.json`):** Written by `scripts/sync-projects.mjs` from public, non-fork repos with the `data-engineering` topic. Curated entries win when both share a GitHub URL.
3. **Sections (`src/components/`):** Navbar, Hero, About, Experience, Projects (with filtering), Certifications, Skills and Contact, rendered in order by `App.jsx`.
4. **Chatbot (`Chatbot.jsx`):** Sends the conversation plus `chatbotContext` to Groq's OpenAI-compatible chat completions API.
5. **Optional API proxy (`server.js`):** An Express server exposing `POST /api/chat` that forwards to the Anthropic Messages API with a server-side key.

---

## 2. Component Directory

| Component | Technology | Purpose / Function | Configuration Details |
| :--- | :--- | :--- | :--- |
| **`src/App.jsx`** | React 19 | Page layout and section order | Navbar → Hero → About → Experience → Projects → Certifications → Skills → Contact + Chatbot |
| **`src/components/*`** | React + Framer Motion + Lucide | UI sections with entrance animations | `useInView` triggers animations on scroll |
| **`src/data/portfolio.js`** | JS module | All site content | Merges curated and auto-synced projects |
| **`src/components/Chatbot.jsx`** | Groq API | Visitor Q&A about Alwyn | Model `llama-3.3-70b-versatile`, key from `VITE_GROQ_API_KEY` |
| **`server.js`** | Express 5 | Optional Anthropic proxy | `PORT` default 3001; CORS for `localhost:5173` / `4173`; needs `ANTHROPIC_API_KEY` |
| **`scripts/sync-projects.mjs`** | Node 18+ `fetch` | GitHub repos → project cards | `GH_USERNAME`, `PROJECT_TOPIC`, optional `GITHUB_TOKEN` |
| **`.github/workflows/sync-projects.yml`** | GitHub Actions | Daily sync + auto-commit | Cron `0 9 * * *` |

---

## 3. Engineering Decisions

| Concern | Typical Approach | This Implementation | Justification |
| :--- | :--- | :--- | :--- |
| **Content updates** | Edit text inside each component | **One data file (`portfolio.js`)** | Update experience or skills without touching UI code |
| **Projects list** | Maintain by hand | **Topic-based GitHub sync + curated overrides** | New repos appear automatically; hand-written entries still take priority |
| **Chatbot knowledge** | Fine-tuning or retrieval | **Context prompt built from the same data file** | Answers stay consistent with what the site shows |
| **LLM provider** | Single hard-wired API | **Groq in the browser, Anthropic proxy available** | Fast free-tier inference for the demo; a server-side path exists for keeping keys private |
| **Styling & motion** | Custom CSS | **Tailwind utilities + Framer Motion** | Consistent spacing and responsive layout with little CSS |

> **Security note:** variables prefixed with `VITE_` are bundled into the client JavaScript, so `VITE_GROQ_API_KEY` is visible to visitors of a production build. For a public deployment, route chat requests through `server.js` (or another serverless function) so the key stays on the server.

---

## 4. Phase 1: Content Model

```js
export const personal = {
  name: "Alwyn Munatsi",
  nickname: "Ndodana",
  tagline: "Data Engineer · Data Analyst · BI Developer · AI/ML Engineering",
  // bio, stats, links, openToWork ...
}

// Curated projects first; auto-synced ones are added unless the same GitHub URL is already curated
export const projects = [
  ...curatedProjects,
  ...generatedProjects.filter(p => !seenUrls.has(p.github)),
]
```

Other exports: `experience`, `education`, `certifications`, `skills` and `chatbotContext`.

---

## 5. Phase 2: Automatic Project Sync

```js
const url = `https://api.github.com/search/repositories` +
  `?q=user:${USERNAME}+topic:${TOPIC}+fork:false&sort=updated&per_page=100`
```

Each repo becomes a project card: title and description from the repo description, skills from the primary language plus topics, and the period from the last push year. To make a repo appear, add the `data-engineering` topic to it on GitHub.

---

## 6. Phase 3: AI Chatbot

```js
const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'system', content: chatbotContext }, ...history],
  }),
})
```

If no key is configured, the chatbot shows a clear setup message instead of failing silently.

---

## 7. Repository Structure

```text
alwyn-portfolio/
├── README.md
├── index.html
├── package.json                        <-- Scripts: dev, build, preview, server, start, sync-projects
├── vite.config.js
├── tailwind.config.js / postcss.config.js
├── eslint.config.js
├── server.js                           <-- Optional Express proxy for /api/chat
├── public/                             <-- favicon.svg, icons.svg
├── scripts/
│   └── sync-projects.mjs               <-- GitHub topic → projects.generated.json
├── .github/workflows/
│   └── sync-projects.yml               <-- Daily sync job
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/hero.png
    ├── components/                     <-- Navbar, Hero, About, Experience, Projects,
    │                                       Certifications, Skills, Contact, Chatbot
    └── data/
        ├── portfolio.js                <-- All site content (edit this)
        └── projects.generated.json     <-- Auto-generated; do not hand-edit
```

---

## 8. Complete Step-by-Step Setup Guide

### Prerequisites
* Node.js 18+
* A [Groq API key](https://console.groq.com) (and optionally an Anthropic API key for `server.js`)

### Step 1: Install
```bash
git clone https://github.com/alwyn-munatsi/alwyn-portfolio.git
cd alwyn-portfolio
npm install
```

### Step 2: Configure Environment Variables
Create `.env` in the project root:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
# Optional, for server.js
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Step 3: Run Locally
```bash
npm run dev        # Vite dev server on http://localhost:5173
npm start          # Express proxy (port 3001) + Vite together
```

### Step 4: Update Content
Edit `src/data/portfolio.js`; the page hot-reloads.

### Step 5: Sync Projects from GitHub
```bash
npm run sync-projects      # set GITHUB_TOKEN to avoid API rate limits
```
In GitHub, the **Sync Data Engineering Projects** workflow runs daily and commits any changes.

### Step 6: Build for Production
```bash
npm run build
npm run preview
```
Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

---

## Contact

- LinkedIn: [linkedin.com/in/alwynmunatsi](https://www.linkedin.com/in/alwynmunatsi/)
- GitHub: [github.com/alwyn-munatsi](https://github.com/alwyn-munatsi)
- Email: munatsialwyn26@gmail.com
