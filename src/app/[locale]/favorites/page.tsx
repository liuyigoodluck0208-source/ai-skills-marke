'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getAllSkills, Skill } from '@/lib/skills';
import { getFavorites } from '@/lib/favorites';
import SkillCard from '@/components/SkillCard';

export default function FavoritesPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('favorites');
  const locale = params.locale;
  const [favoriteSkills, setFavoriteSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const favIds = getFavorites();
    const all = getAllSkills();
    setFavoriteSkills(all.filter(s => favIds.includes(s.id)));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('title')}</h1>

      {favoriteSkills.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-lg font-medium text-gray-300">{t('empty')}</h3>
          <p className="mt-2 text-sm text-gray-500">{t('add_hint')}</p>
        </div>
      )}
    </div>
  );
}