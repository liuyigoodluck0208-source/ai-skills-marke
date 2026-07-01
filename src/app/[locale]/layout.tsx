import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server'; /* --- REVIEW FIX --- 添加 setRequestLocale */
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); /* --- REVIEW FIX --- static export 要求调用 setRequestLocale */
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header locale={locale} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
