'use client'; /* --- REVIEW FIX --- 添加 use client 指令 */

import { useTranslations } from 'next-intl';
import { getFeaturedSkills, getAllSkills, getAllCategories, getStats } from '@/lib/skills';
import HeroSection from '@/components/HeroSection';
import SkillCard from '@/components/SkillCard';
import CategoryGrid from '@/components/CategoryGrid';

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = useTranslations('hero');
  const tc = useTranslations('categories');
  const tf = useTranslations('featured');
  const tl = useTranslations('latest');

  const featured = getFeaturedSkills();
  const latest = getAllSkills().slice(0, 6);
  const categories = getAllCategories();
  const stats = getStats();

  return (
    <div className="space-y-16">
      <HeroSection
        locale={params.locale}
        title={t('title')}
        subtitle={t('subtitle')}
        searchPlaceholder={t('search_placeholder', { count: stats.totalSkills })}
        stats={{
          skills: { value: stats.totalSkills, label: t('stats_skills') },
          categories: { value: stats.totalCategories, label: t('stats_categories') },
          platforms: { value: stats.totalPlatforms, label: t('stats_platforms') },
        }}
      />

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{tc('title')}</h2>
          </div>
        </div>
        <CategoryGrid categories={categories} locale={params.locale} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{tf('title')}</h2>
            <p className="mt-1 text-sm text-gray-500">{tf('subtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(skill => (
            <SkillCard key={skill.id} skill={skill} locale={params.locale} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{tl('title')}</h2>
            <p className="mt-1 text-sm text-gray-500">{tl('subtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map(skill => (
            <SkillCard key={skill.id} skill={skill} locale={params.locale} />
          ))}
        </div>
      </section>
    </div>
  );
}