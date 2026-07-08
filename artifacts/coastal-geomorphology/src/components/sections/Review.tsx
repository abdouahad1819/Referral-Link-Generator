import { motion } from 'framer-motion';
import { Star, BookOpen, Quote } from 'lucide-react';

export function Review() {
  return (
    <section id="review" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            مراجعة شاملة للكتاب
          </h2>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Coastal Geomorphology: An Introduction — Eric C.F. Bird (2008)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Right/Main Review Content (occupies 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-card border border-border p-6 md:p-8 rounded-2xl relative overflow-hidden">
              <Quote className="absolute top-4 left-4 w-24 h-24 text-primary/5 -z-0" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="text-primary w-6 h-6" /> ملخص الكتاب
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  يُعدّ هذا الكتاب المرجع الأساسي في دراسة الجيومورفولوجيا الساحلية على مستوى العالم. يُقدّم بيرد في طبعته الثانية (2008) توليفاً شاملاً لأكثر من 50 سنة من بحوثه الميدانية على سواحل أستراليا وأوروبا وآسيا وأفريقيا. يغطي الكتاب دورة حياة السواحل الكاملة من العمليات الجيولوجية العميقة حتى الديناميكيات الساحلية اليومية.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-3">نقاط القوة</h4>
                    <ul className="space-y-2">
                      {[
                        'شمولية لا مثيل لها: 16 فصلاً تُغطّي كل نوع من أنواع السواحل',
                        'ثروة من الأمثلة التطبيقية من كل قارات العالم',
                        'صور ورسوم توضيحية عالية الجودة (أكثر من 200 صورة وخريطة)',
                        'لغة علمية دقيقة لكن في متناول الطلاب',
                        'تحديث شامل حول ارتفاع مستوى البحر وإدارة السواحل'
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-300">
                          <span className="text-primary mt-1">+</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-destructive mb-3">نقاط التقييم النقدي</h4>
                    <ul className="space-y-2">
                      {[
                        'الكتاب باللغة الإنجليزية فقط (لا توجد ترجمة عربية)',
                        'بعض الفصول تفترض خلفية رياضية في الهيدروليكيات',
                        'النماذج الرياضية المُقدّمة أصبح بعضها يُستخدم مع نماذج حاسوبية حديثة'
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-300">
                          <span className="text-destructive mt-1">-</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border p-6 rounded-2xl">
                <h4 className="text-lg font-bold text-white mb-3">الجمهور المستهدف</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  يُوجَّه الكتاب بصورة رئيسية لطلاب الجيولوجيا والجغرافيا والعلوم البيئية في مستوى البكالوريوس والماجستير. يُستخدم أيضاً مرجعاً أساسياً لمهندسي الشواطئ (Coastal engineers) وخبراء إدارة السواحل وعلماء المناخ.
                </p>
              </div>
              <div className="bg-card border border-border p-6 rounded-2xl">
                <h4 className="text-lg font-bold text-white mb-3">الأثر العلمي</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  اقتُبس الكتاب في أكثر من 5,000 ورقة بحثية علمية. يُدرَّس في جامعات في أستراليا والمملكة المتحدة وأمريكا. كان بيرد أول من وثّق بشكل منهجي ظاهرة "تراجع الشواطئ العالمية".
                </p>
              </div>
            </div>
          </motion.div>

          {/* Left/Sidebar Info Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card border border-border p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-border pb-4">بطاقة الكتاب</h3>
              
              <ul className="space-y-4 mb-6 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">العنوان</span>
                  <span className="font-bold text-white text-left truncate w-32" dir="ltr">Coastal Geomorphology</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">المؤلف</span>
                  <span className="font-bold text-white text-left" dir="ltr">Eric C.F. Bird</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">الناشر</span>
                  <span className="font-bold text-white text-left" dir="ltr">Wiley-Blackwell</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">الطبعة</span>
                  <span className="font-bold text-white">الثانية (2008)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">الصفحات</span>
                  <span className="font-bold text-white">436 صفحة</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">اللغة</span>
                  <span className="font-bold text-white">الإنجليزية</span>
                </li>
              </ul>

              <div className="bg-background rounded-lg p-4 mb-2 flex items-center justify-between">
                <span className="font-bold text-white text-sm">التقييم العام</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground">5/5 مرجع علمي</p>
            </div>

            <div className="bg-primary text-primary-foreground p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <h4 className="font-bold mb-4">اقتباسات لافتة</h4>
              <div className="space-y-4 text-sm font-medium">
                <p className="border-r-2 border-primary-foreground/30 pr-3">
                  "الساحل ليس خطاً ثابتاً، بل منطقة في حركة دائمة."
                </p>
                <p className="border-r-2 border-primary-foreground/30 pr-3">
                  "ميزان الرواسب الساحلية هو المفتاح لفهم كل تغيّر في خط الشاطئ."
                </p>
                <p className="border-r-2 border-primary-foreground/30 pr-3">
                  "إدارة السواحل التي تُهمل العمليات الطبيعية محكوم عليها بالفشل."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
