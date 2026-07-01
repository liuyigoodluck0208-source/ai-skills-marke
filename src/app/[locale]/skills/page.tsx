/* --- REVIEW FIX --- useSearchParams() 需要 Suspense 边界以支持 static export */
import { Suspense } from 'react';
import SkillsContent from './SkillsContent';

export default function SkillsPage({ params }: { params: { locale: string } }) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading...</div>}>
      <SkillsContent locale={params.locale} />
    </Suspense>
  );
}
