import Fuse from 'fuse.js';
import { Skill } from './skills';

let fuseInstance: Fuse<Skill> | null = null;

export function getFuse(skills: Skill[]): Fuse<Skill> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(skills, {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'topics', weight: 0.2 },
        { name: 'author', weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
  }
  return fuseInstance;
}

export function searchSkills(skills: Skill[], query: string): Skill[] {
  if (!query.trim()) return skills;
  const fuse = getFuse(skills);
  return fuse.search(query).map(r => r.item);
}
