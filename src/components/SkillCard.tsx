'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Skill } from '@/lib/skills';
import { toggleFavorite, isFavorited } from '@/lib/favorites';
import { platformColors, platformFallback } from '@/lib/constants';

interface SkillCardProps {
  skill: Skill;
  locale: string;
}

export default function SkillCard({ skill, locale }: SkillCardProps) {
  const [faved, setFaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFaved(isFavorited(skill.id));
  }, [skill.id]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFaved(toggleFavorite(skill.id));
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(skill.install_command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link href={`/${locale}/skills/${skill.id}`}>
      <div className="group relative rounded-xl border border-white/10 bg-gray-900/50 p-5 transition-all hover:border-white/20 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-brand-500/5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="truncate text-base font-semibold text-white group-hover:text-brand-400 transition-colors">
                {skill.name}
              </h3>
              {skill.featured && (
                <span className="shrink-0 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-300">
                  ★
                </span>
              )}
            </div>
            <p className="line-clamp-2 text-sm text-gray-400 mb-3">
              {skill.description}
            </p>
          </div>

          <button
            onClick={handleFavorite}
            className="shrink-0 rounded-lg p-1.5 transition-colors hover:bg-white/10"
            aria-label="Favorite"
          >
            <svg
              className={`h-5 w-5 transition-colors ${faved ? 'text-red-400 fill-red-400' : 'text-gray-500'}`}
              fill={faved ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${platformColors[skill.platform] || platformFallback}`}>
            {skill.platform}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {skill.stars.toLocaleString()}
          </span>
          <span className="text-xs text-gray-600">·</span>
          <span className="text-xs text-gray-500">{skill.language}</span>
        </div>

        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-mono text-gray-300 transition-colors hover:bg-white/10 hover:text-white border border-white/5"
        >
          <span className="truncate">{skill.install_command}</span>
          {copied ? (
            <span className="shrink-0 text-green-400">✓</span>
          ) : (
            <svg className="shrink-0 h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </Link>
  );
}
