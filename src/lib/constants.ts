/**
 * Platform → Tailwind color classes (bg + text + border).
 * Single source of truth for SkillCard and skill detail page.
 */
export const platformColors: Record<string, string> = {
  codex: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  claude: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  langchain: 'bg-green-500/20 text-green-300 border-green-500/30',
  autogpt: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'ai-tools': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  dify: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};

export const platformFallback = 'bg-gray-500/20 text-gray-300 border-gray-500/30';
