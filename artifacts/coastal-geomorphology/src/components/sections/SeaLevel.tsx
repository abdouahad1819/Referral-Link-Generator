import { motion } from 'framer-motion';
import { TrendingUp, Thermometer, Waves } from 'lucide-react';

const timeline = [
  { year: '20,000 سنة مضت', level: '−120 م', desc: 'أدنى مستوى، ذروة العصر الجليدي' },
  { year: '15,000 سنة مضت', level: '−80 م', desc: 'بداية الذوبان السريع' },
  { year: '10,000 سنة مضت', level: '−35 م', desc: 'استمرار الارتفاع' },
  { year: '7,000 سنة مضت', level: '−5 م', desc: 'اقتراب من المستويات الحالية' },
  { year: '4,000–2,000 سنة مضت', level: '±0 م', desc: 'استقرار نسبي في العصر الهولوسيني' },
  { year: 'اليوم', level: '+0 م', desc: 'نقطة المرجع، بدأ في التسارع مجدداً' },
  { year: '2100 (سيناريو منخفض)', level: '+0.3 م', desc: 'توقعات مناخية متفائلة' },
  { year: '2100 (سيناريو مرتفع)', level: '+1.0 م', desc: 'توقعات مناخية متشائمة' },
];

export function SeaLevel() {
  return (
    <section id="sea-level" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            تغيّرات مستوى سطح البحر
          </h2>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            من العصر الجليدي إلى المناخ المتغيّر
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 rounded-2xl text-center"
          >
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-white mb-2" dir="ltr">3.7 mm/yr</div>
            <p className="text-muted-foreground text-sm">معدل الارتفاع الحالي (أسرع من أي وقت منذ 3000 سنة)</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border p-8 rounded-2xl text-center"
          >
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Waves className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50%</div>
            <p className="text-muted-foreground text-sm">من الشواطئ الرملية متراجعة عالمياً حالياً</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border p-8 rounded-2xl text-center"
          >
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Thermometer className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1 مليار</div>
            <p className="text-muted-foreground text-sm">شخص يسكنون على ارتفاع أقل من 10 م عن مستوى البحر</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Timeline Chart visual representation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 border-b border-border pb-4">تاريخ مستوى البحر</h3>
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-32 text-right text-sm text-muted-foreground font-medium shrink-0">
                    {item.year}
                  </div>
                  <div className="relative flex-1 h-8 bg-background rounded-full overflow-hidden border border-border/50">
                    {/* The visual bar */}
                    <div 
                      className="absolute top-0 bottom-0 right-0 bg-primary/40 group-hover:bg-primary/60 transition-colors"
                      style={{ 
                        width: item.level.includes('−') 
                          ? `${100 - (parseInt(item.level.replace('−', '')) / 120 * 80)}%` 
                          : item.level === '±0 م' || item.level === '+0 م' ? '80%'
                          : '95%'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center px-4 justify-between text-xs">
                      <span className="font-bold text-white z-10" dir="ltr">{item.level}</span>
                      <span className="text-gray-300 z-10 truncate ml-2 hidden sm:block">{item.desc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card border border-border p-6 rounded-xl border-r-4 border-r-primary">
              <h4 className="text-xl font-bold text-white mb-2">الأسباب</h4>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                ارتفاع درجة الحرارة يُذيب الجليد القطبي والجبلي (يُسهم بـ40% من الارتفاع)، والتمدّد الحراري للمياه عندما تسخن (60%). في القرن العشرين ارتفع المستوى حوالي 20 سم.
              </p>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-xl border-r-4 border-r-blue-400">
              <h4 className="text-xl font-bold text-white mb-2">التأثيرات الساحلية (قاعدة برون)</h4>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                وفق قاعدة برون (Bruun Rule): ارتفاع 1 متر في مستوى البحر يؤدي إلى تراجع 50–100 متر في خط الشاطئ. هذا يعني أن الكثير من شواطئ العالم ستتراجع عشرات الأمتار مع نهاية القرن.
              </p>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl border-r-4 border-r-red-400">
              <h4 className="text-xl font-bold text-white mb-2">المناطق الأكثر عُرضة</h4>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                دلتا النيل وبنغلاديش (التي يقطنها ملايين البشر)، الجزر المرجانية المنخفضة مثل جزر المالديف وتوفالو التي لا يرتفع معظمها أكثر من مترين عن البحر، والمدن الساحلية الكبرى كبانكوك ونيو أورليانز.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
