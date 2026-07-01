/* --- REVIEW FIX --- 升级到 next-intl 3.26+ API：使用 requestLocale 替代 deprecated locale 参数，修复 static export 兼容 */
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && ['en', 'zh'].includes(requested) ? requested : 'en';
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
