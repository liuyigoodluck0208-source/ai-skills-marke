import { useTranslations } from 'next-intl';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const statsT = useTranslations('hero');

  return (
    <footer className="border-t border-white/5 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-2xl">🧠</span>
              <span className="text-lg font-bold">AI Skills Market</span>
            </div>
            <p className="text-sm text-gray-500">{t('description')}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>{t('built_with')}</span>
            <span>·</span>
            <span>{t('data_source')}</span>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} AI Skills Market. Open Source.
        </div>
      </div>
    </footer>
  );
}