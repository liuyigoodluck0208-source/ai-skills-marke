'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { getAllSkills, getAllCategories } from '@/lib/skills';
import { searchSkills } from '@/lib/search';
import SkillCard from '@/components/SkillCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';

export default function SkillsContent({ locale }: { locale: string }) {
  const t = useTranslations('skills');
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const allSkills = useMemo(() => getAllSkills(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const [query, setQuery] = useState(initialQuery);
  const [platform, setPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('stars');

  const platforms = useMemo(() => {
    const map = new Map<string, { id: string; name: string }>();
    for (const cat of categories) {
      map.set(cat.id, { id: cat.id, name: locale === 'zh' ? cat.name_zh : cat.name_en });
    }
    return Array.from(map.values());
  }, [categories, locale]);

  const filteredSkills = useMemo(() => {
    let results = query ? searchSkills(allSkills, query) : [...allSkills];

    if (platform !== 'all') {
      results = results.filter(s => s.category === platform);
    }

    results.sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars;
      if (sortBy === 'newest') return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
      return 0;
    });

    return results;
  }, [allSkills, query, platform, sortBy]);

  const placeholder = locale === 'zh' ? '搜索技能、代理、工具...' : 'Search skills, agents, tools...';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-gray-500">
          {t('found', { count: filteredSkills.length })}
        </p>
      </div>

      <SearchBar
        placeholder={placeholder}
        onSearch={setQuery}
      />

      <FilterBar
        platforms={platforms}
        activePlatform={platform}
        sortBy={sortBy}
        onPlatformChange={setPlatform}
        onSortChange={setSortBy}
        sortLabels={{
          newest: t('sort_newest'),
          stars: t('sort_stars'),
          favorites: t('sort_favorites'),
        }}
      />

      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-4xl mb-4"></div>
          <h3 className="text-lg font-medium text-gray-300">{t('no_results')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('try_different')}</p>
        </div>
      )}
    </div>
  );
}
