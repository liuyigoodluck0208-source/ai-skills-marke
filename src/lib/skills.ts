import skillsData from '@/data/skills.json';
import categoriesData from '@/data/categories.json';

export interface Skill {
  id: string;
  name: string;
  description: string;
  repo_url: string;
  stars: number;
  language: string;
  topics: string[];
  category: string;
  platform: string;
  install_command: string;
  last_updated: string;
  license: string;
  author: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name_en: string;
  name_zh: string;
  icon: string;
  description_en: string;
  description_zh: string;
  queries: string[];
}

export function getAllSkills(): Skill[] {
  return skillsData as Skill[];
}

export function getSkillById(id: string): Skill | undefined {
  return (skillsData as Skill[]).find(s => s.id === id);
}

export function getFeaturedSkills(): Skill[] {
  return (skillsData as Skill[]).filter(s => s.featured);
}

export function getSkillsByCategory(categoryId: string): Skill[] {
  return (skillsData as Skill[]).filter(s => s.category === categoryId);
}

export function getSkillsByPlatform(platform: string): Skill[] {
  return (skillsData as Skill[]).filter(s => s.platform === platform);
}

export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryById(id: string): Category | undefined {
  return (categoriesData as Category[]).find(c => c.id === id);
}

export function getRelatedSkills(skill: Skill, limit = 4): Skill[] {
  const all = getAllSkills();
  return all
    .filter(s => s.id !== skill.id && (s.category === skill.category || s.platform === skill.platform))
    .sort((a, b) => {
      const aShared = (s: Skill) => s.topics.filter(t => skill.topics.includes(t)).length;
      return aShared(b) - aShared(a);
    })
    .slice(0, limit);
}

export function getStats() {
  const skills = getAllSkills();
  const categories = getAllCategories();
  const platforms = new Set(skills.map(s => s.platform));
  return {
    totalSkills: skills.length,
    totalCategories: categories.length,
    totalPlatforms: platforms.size,
  };
}
