import { Waves } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Waves className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                الجيومورفولوجيا الساحلية
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              بوابة تعليمية مخصصة لتبسيط ونشر علوم الأرض الساحلية في العالم العربي، بالاستناد إلى المرجع الأكاديمي "Coastal Geomorphology: An Introduction" للعالم إريك بيرد.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">حول العلم</a></li>
              <li><a href="#book" className="hover:text-primary transition-colors">فصول الكتاب</a></li>
              <li><a href="#processes" className="hover:text-primary transition-colors">العمليات الساحلية</a></li>
              <li><a href="#landforms" className="hover:text-primary transition-colors">الأشكال الأرضية</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">مصادر</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#sea-level" className="hover:text-primary transition-colors">مستوى البحر</a></li>
              <li><a href="#videos" className="hover:text-primary transition-colors">فيديوهات علمية</a></li>
              <li><a href="#review" className="hover:text-primary transition-colors">مراجعة الكتاب</a></li>
              <li><a href="#quiz" className="hover:text-primary transition-colors">اختبر معلوماتك</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            تخليداً لذكرى إريك بيرد (1930–2023) وإسهاماته في علوم السواحل.
          </p>
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
            موقع تعليمي غير ربحي
          </div>
        </div>
      </div>
    </footer>
  );
}
