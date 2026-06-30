const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const BASE_URL = 'https://api.github.com/search/repositories';

const SEARCH_QUERIES = [
  { query: 'codex skill SKILL.md', category: 'codex-skills', platform: 'codex' },
  { query: 'mcp server model context protocol', category: 'mcp-servers', platform: 'claude' },
  { query: 'langchain agent tools', category: 'langchain', platform: 'langchain' },
  { query: 'autogpt plugin crewai tool', category: 'autogpt', platform: 'autogpt' },
  { query: 'ai agent framework tools', category: 'ai-tools', platform: 'ai-tools' },
  { query: 'dify workflow plugin', category: 'dify', platform: 'dify' },
];

async function searchGitHub(query, page = 1) {
  const params = new URLSearchParams({
    q: query,
    sort: 'stars',
    order: 'desc',
    per_page: '30',
    page: String(page),
  });

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'AI-Skills-Market/1.0',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(`${BASE_URL}?${params}`, { headers });

  if (!response.ok) {
    console.error(`GitHub API error: ${response.status} for query: ${query}`);
    return [];
  }

  const data = await response.json();
  return data.items || [];
}

function inferInstallCommand(repo) {
  const topics = (repo.topics || []).map(t => t.toLowerCase());
  const lang = (repo.language || '').toLowerCase();
  const name = repo.name;

  if (topics.includes('mcp') || topics.includes('model-context-protocol')) {
    return `npx @modelcontextprotocol/server-${name.replace('server-', '')}`;
  }
  if (lang === 'python' || topics.includes('pip')) {
    return `pip install ${name.replace(/[-_]/g, '-')}`;
  }
  if (lang === 'typescript' || lang === 'javascript' || topics.includes('npm')) {
    return `npm install ${name}`;
  }
  if (lang === 'c#') {
    return `dotnet add package ${name}`;
  }
  if (topics.includes('docker')) {
    return `docker compose up -d`;
  }
  return `git clone ${repo.html_url}`;
}

function repoToSkill(repo, category, platform) {
  const id = repo.full_name.replace('/', '-').toLowerCase();
  return {
    id,
    name: repo.name,
    description: repo.description || 'No description available',
    repo_url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language || 'Unknown',
    topics: repo.topics || [],
    category,
    platform,
    install_command: inferInstallCommand(repo),
    last_updated: repo.pushed_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    license: repo.license?.spdx_id || 'Unknown',
    author: repo.owner?.login || 'Unknown',
    featured: repo.stargazers_count > 5000,
  };
}

async function main() {
  console.log('🔍 Fetching skills and agents from GitHub...\n');

  const allSkills = new Map();
  const seenRepos = new Set();

  for (const { query, category, platform } of SEARCH_QUERIES) {
    console.log(`  Searching: "${query}"...`);

    try {
      const repos = await searchGitHub(query);
      let added = 0;

      for (const repo of repos) {
        if (!seenRepos.has(repo.id)) {
          seenRepos.add(repo.id);
          allSkills.set(repo.id, repoToSkill(repo, category, platform));
          added++;
        }
      }

      console.log(`    → Found ${repos.length} repos, ${added} new`);

      // Rate limit: wait 1 second between requests
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`    → Error: ${err.message}`);
    }
  }

  const skills = Array.from(allSkills.values())
    .sort((a, b) => b.stars - a.stars);

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'skills.json');
  fs.writeFileSync(outputPath, JSON.stringify(skills, null, 2), 'utf8');

  console.log(`\n✅ Done! Wrote ${skills.length} skills to ${outputPath}`);

  // Stats
  const byCategory = {};
  for (const s of skills) {
    byCategory[s.category] = (byCategory[s.category] || 0) + 1;
  }
  console.log('\n📊 By category:');
  for (const [cat, count] of Object.entries(byCategory)) {
    console.log(`  ${cat}: ${count}`);
  }
}

main().catch(console.error);
