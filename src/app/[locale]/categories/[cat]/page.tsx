/* --- REVIEW FIX --- 改为服务端组件以支持 generateStaticParams + output: 'export' */
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getCategoryById, getSkillsByCategory, getAllCategories } from '@/lib/skills';
import SkillCard from '@/components/SkillCard';
import categoriesData from '@/data/categories.json';

export function generateStaticParams() {
  const params: { locale: string; cat: string }[] = [];
  for (const locale of ['en', 'zh']) {
    for (const cat of categoriesData as { id: string }[]) {
      params.push({ locale, cat: cat.id });
    }
  }
  return params;
}

export default async function CategoryPage({ params }: { params: { locale: string; cat: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('categories');
  const tDetail = await getTranslations('detail');
  const locale = params.locale;
  const category = getCategoryById(params.cat);
  const skills = getSkillsByCategory(params.cat);
  const allCategories = getAllCategories();

  const categoryName = category
    ? (locale === 'zh' ? category.name_zh : category.name_en)
    : params.cat;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors mb-4"
        >
          {tDetail('back_home')}
        </Link>
        <h1 className="text-3xl font-bold">
          {category?.icon} {categoryName}
        </h1>
        {category && (
          <p className="mt-2 text-gray-500">
            {locale === 'zh' ? category.description_zh : category.description_en}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-600">{skills.length} skills</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {allCategories.map(c => (
          <Link
            key={c.id}
            href={`/${locale}/categories/${c.id}`}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${c.id === params.cat ? 'bg-brand-500/20 text-brand-300' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            {c.icon} {locale === 'zh' ? c.name_zh : c.name_en}
          </Link>
        ))}
      </div>

      {skills.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(skill => (
            <SkillCard key={skill.id} skill={skill} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-300">{t('empty_title')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('empty_hint')}</p>
        </div>
      )}
    </div>
  );
}
