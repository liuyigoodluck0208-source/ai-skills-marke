'use client';

// This page uses dynamic params, but for static export we generate params at build time

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getSkillById, getRelatedSkills, getAllCategories } from '@/lib/skills';
import { toggleFavorite, isFavorited, getRating, setRating } from '@/lib/favorites';
import SkillCard from '@/components/SkillCard';

export default function SkillDetailPage({ params }: { params: { locale: string; id: string } }) {
  const t = useTranslations('detail');
  const locale = params.locale;
  const skill = getSkillById(params.id);
  const related = skill ? getRelatedSkills(skill) : [];
  const categories = getAllCategories();

  const [faved, setFaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (skill) {
      setFaved(isFavorited(skill.id));
      setUserRating(getRating(skill.id));
    }
  }, [skill]);

  if (!skill) {
    return (
      <div className="py-20 text-center">
        <div className="text-5xl mb-4">404</div>
        <h2 className="text-xl font-bold text-gray-300">{t('skill_not_found')}</h2>
        <Link href={`/${locale + "/skills"}`} className="mt-4 inline-block text-brand-400 hover:text-brand-300">
          t('back')
        </Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === skill.category);
  const categoryName = category ? (locale === 'zh' ? category.name_zh : category.name_en) : skill.category;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(skill.install_command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    setFaved(toggleFavorite(skill.id));
  };

  const handleRate = (rating: number) => {
    setUserRating(rating);
    setRating(skill.id, rating);
  };

  const platformColors: Record<string, string> = {
    codex: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    claude: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    langchain: 'bg-green-500/20 text-green-300 border-green-500/30',
    autogpt: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ai-tools': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    dify: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Link
        href={`/${locale + "/skills"}`}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors"
      >
        
      </Link>

      <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{skill.name}</h1>
              {skill.featured && (
                <span className="rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-300">
                  ★ Featured
                </span>
              )}
            </div>
            <p className="text-gray-400 text-lg">{skill.description}</p>
          </div>

          <button
            onClick={handleFavorite}
            className="shrink-0 rounded-xl p-3 border border-white/10 transition-all hover:bg-white/10"
          >
            <svg
              className={`${faved ? 'text-red-400 fill-red-400' : 'text-gray-500'}`}
              fill={faved ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className={`${platformColors[skill.platform] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
            {categoryName}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            {skill.stars.toLocaleString()} Stars'); // translate below
          </span>
          <span className="text-gray-600">·</span>
          <span className="text-sm text-gray-400">{skill.language}</span>
          <span className="text-gray-600">·</span>
          <span className="text-sm text-gray-400">{t('license_label')} {skill.license}</span>
          <span className="text-gray-600">·</span>
          <span className="text-sm text-gray-400">{t('updated_label')} {skill.last_updated}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {skill.topics.slice(0, 8).map(topic => (
            <span key={topic} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-400">
              #{topic}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-gray-950/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">{t('install_label')}</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500"
              >
                {copied ? t('copied') : t('copy_command')}
              </button>
              <a
                href={skill.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {t('view_repo')} →
              </a>
            </div>
          </div>
          <code className="block overflow-x-auto rounded-lg bg-gray-900 p-3 text-sm font-mono text-green-400">
            $ {skill.install_command}
          </code>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-6 sm:p-8">
        <h3 className="text-lg font-bold mb-4">{t('rate_this')}</h3>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              className="p-1 transition-transform hover:scale-110"
            >
              <svg
                className={`${star <= userRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600 hover:text-gray-400'}`}
                fill={star <= userRating ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </button>
          ))}
          {userRating > 0 && (
            <span className="ml-2 text-sm text-gray-500">{userRating}/5</span>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('related')}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(s => (
              <SkillCard key={s.id} skill={s} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}