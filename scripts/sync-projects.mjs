// Pulls public GitHub repos tagged with a topic (default: "data-engineering")
// and writes them to src/data/projects.generated.json for the portfolio site.
// Run manually with `npm run sync-projects`, or on a schedule via
// .github/workflows/sync-projects.yml.
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const USERNAME = process.env.GH_USERNAME || 'alwyn-munatsi'
const TOPIC = process.env.PROJECT_TOPIC || 'data-engineering'
const TOKEN = process.env.GITHUB_TOKEN

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.resolve(__dirname, '../src/data/projects.generated.json')

function titleCase(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase())
}

async function fetchRepos() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`

  const url = `https://api.github.com/search/repositories?q=user:${USERNAME}+topic:${TOPIC}+fork:false&sort=updated&per_page=100`
  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`)
  }
  const data = await res.json()
  return data.items || []
}

function toProject(repo) {
  const skills = Array.from(new Set([
    ...(repo.language ? [repo.language] : []),
    ...(repo.topics || []).filter(t => t !== TOPIC).map(titleCase),
  ]))

  return {
    title: repo.description || titleCase(repo.name),
    short: titleCase(repo.name),
    period: new Date(repo.pushed_at).getFullYear().toString(),
    association: 'Personal Project',
    description: repo.description || `Data engineering project: ${titleCase(repo.name)}.`,
    skills: skills.length ? skills : ['Data Engineering'],
    category: 'Data Engineering',
    github: repo.html_url,
  }
}

const repos = await fetchRepos()
const projects = repos
  .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
  .map(toProject)

writeFileSync(OUT_PATH, JSON.stringify(projects, null, 2) + '\n')
console.log(`Synced ${projects.length} project(s) tagged "${TOPIC}" for ${USERNAME}.`)
