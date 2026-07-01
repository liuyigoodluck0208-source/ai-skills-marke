/* --- REVIEW FIX --- 改为服务端组件以支持 generateStaticParams + output: 'export' */
import SkillDetailClient from './SkillDetailClient';
import skillsData from '@/data/skills.json';

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of ['en', 'zh']) {
    for (const skill of skillsData as { id: string }[]) {
      params.push({ locale, id: skill.id });
    }
  }
  return params;
}

export default function SkillDetailPage({ params }: { params: { locale: string; id: string } }) {
  return <SkillDetailClient locale={params.locale} skillId={params.id} />;
}
