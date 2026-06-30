'use client';

import Link from 'next/link';
import { Category } from '@/lib/skills';

export default function CategoryGrid({ categories, locale }: { categories: Category[]; locale: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map(cat => (
        <Link
          key={cat.id}
          href={`/${locale}/categories/${cat.id}`}
          className="group rounded-xl border border-white/10 bg-gray-900/50 p-4 text-center transition-all hover:border-white/20 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-brand-500/5"
        >
          <div className="text-3xl mb-2">{cat.icon}</div>
          <div className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">
            {locale === 'zh' ? cat.name_zh : cat.name_en}
          </div>
          <div className="mt-1 text-xs text-gray-500 line-clamp-2">
            {locale === 'zh' ? cat.description_zh : cat.description_en}
          </div>
        </Link>
      ))}
    </div>
  );
}
