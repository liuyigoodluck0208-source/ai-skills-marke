'use client';

const FAVORITES_KEY = 'ai-skills-favorites';
const RATINGS_KEY = 'ai-skills-ratings';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(skillId: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(skillId);
  let isFavorited: boolean;

  if (index > -1) {
    favorites.splice(index, 1);
    isFavorited = false;
  } else {
    favorites.push(skillId);
    isFavorited = true;
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return isFavorited;
}

export function isFavorited(skillId: string): boolean {
  return getFavorites().includes(skillId);
}

export function getFavoriteCount(): number {
  return getFavorites().length;
}

// Ratings
export function getRating(skillId: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const stored = localStorage.getItem(RATINGS_KEY);
    const ratings = stored ? JSON.parse(stored) : {};
    return ratings[skillId] || 0;
  } catch {
    return 0;
  }
}

export function setRating(skillId: string, rating: number): void {
  const stored = localStorage.getItem(RATINGS_KEY);
  const ratings = stored ? JSON.parse(stored) : {};
  ratings[skillId] = rating;
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}
