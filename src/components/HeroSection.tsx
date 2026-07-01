'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  locale: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  stats: {
    skills: { value: number; label: string };
    categories: { value: number; label: string };
    platforms: { value: number; label: string };
  };
}

export default function HeroSection({ locale, title, subtitle, searchPlaceholder, stats }: HeroSectionProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/skills?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/${locale}/skills`);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-900 to-brand-950/30 px-6 py-16 sm:px-12 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 sm:text-xl">{subtitle}</p>

        <form onSubmit={handleSearch} className="mt-8">
          <div className="relative mx-auto max-w-xl">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-xl border border-white/10 bg-gray-900/80 py-4 pl-12 pr-32 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-500"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-10 flex items-center justify-center gap-8 sm:gap-12">
          {[stats.skills, stats.categories, stats.platforms].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
