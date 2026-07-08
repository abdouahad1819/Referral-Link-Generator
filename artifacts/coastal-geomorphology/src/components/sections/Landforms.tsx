import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const filters = [
  { id: 'all', label: 'الكل' },
  { id: 'rocky', label: 'صخري' },
  { id: 'depositional', label: 'ترسيبي' },
  { id: 'biological', label: 'بيولوجي' },
  { id: 'mixed', label: 'مختلط' }
];

const landforms = [
  {
    id: 1,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الشواطئ الرملية',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    desc: 'تتكوّن من تراكم حبيبات رمل تتفاوت أحجامها من 0.0625 إلى 2 مم. تُمثّل توازناً ديناميكياً دائم الحركة بين الأمواج والرواسب. يتغيّر شكل الشاطئ موسمياً: تراكم صيفي وتآكل شتوي. يُقدّر بيرد أن نحو 70% من الشواطئ الرملية تتراجع عالمياً بسبب نقص الرواسب.',
    chars: ['ديناميكية عالية', 'حبيبات دقيقة لمتوسطة', 'تتأثر بالانجراف الطولي']
  },
  {
    id: 2,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الكثبان الرملية الساحلية',
    image: 'https://images.unsplash.com/photo-1523824925769-e316a13346e2?q=80&w=800&auto=format&fit=crop',
    desc: 'تتشكّل حين تُجفّف الشمس رمال الشاطئ وتُحرّكها الرياح البرية. تُعدّ مخزناً استراتيجياً للرمال تُغذّي الشاطئ في أوقات العواصف. تحتوي الكثبان الناضجة على ثلاث مناطق: الكثيب الأمامي، المنطقة المزهرة، والغابة الخلفية المثبّتة.',
    chars: ['خزان للرمال', 'تثبيتها يعتمد على النباتات', 'تأثير قوي للرياح']
  },
  {
    id: 3,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'الجروف الساحلية',
    image: 'https://images.unsplash.com/photo-1466840787022-48e0ec048c8a?q=80&w=800&auto=format&fit=crop',
    desc: 'تتكوّن بفعل تآكل الأمواج عند قاعدة المنحدر الساحلي. معدل تراجعها يتراوح بين مليمترات وعشرات الأمتار سنوياً. تُولّد رواسب تُغذّي الشواطئ المجاورة. الجروف في حجر طباشيري (كجروف دوفر بإنجلترا) تتراجع بمعدل 1 م سنوياً.',
    chars: ['انحدار شديد', 'مصدر رواسب للشواطئ', 'تتراجع باستمرار']
  },
  {
    id: 4,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'الأقواس البحرية والإبر الصخرية',
    image: 'https://images.unsplash.com/photo-1533519808603-91c890f5b1d4?q=80&w=800&auto=format&fit=crop',
    desc: 'مراحل تطوّر السواحل الصخرية: الكهف البحري → القوس البحري → الإبرة الصخرية → الجرف المنهار. تُقدّر مدة تكوّن قوس كامل بألاف إلى ملايين السنين. مثال: "أقواس لندن" في أستراليا.',
    chars: ['نتاج تآكل موضعي', 'تطوّر زمني واضح', 'تكسّر هيدروليكي']
  },
  {
    id: 5,
    category: 'mixed',
    catLabel: 'مختلط',
    title: 'البحيرات الساحلية (اللاجون)',
    image: 'https://images.unsplash.com/photo-1590483736622-398541e243d9?q=80&w=800&auto=format&fit=crop',
    desc: 'مسطّحات مائية ضحلة تُفصلها حواجز رملية أو شعابية عن البحر المفتوح. تُعدّ من أغنى البيئات البيولوجية: تُفقّس فيها أسماك كثيرة وتتوالد الطيور المهاجرة. مثال بارز: لاغون فينيسيا (البندقية).',
    chars: ['مياه ضحلة', 'حاجز رملي/شعابي', 'تنوع بيولوجي عالي']
  },
  {
    id: 6,
    category: 'mixed',
    catLabel: 'مختلط',
    title: 'المصبّات النهرية',
    image: 'https://images.unsplash.com/photo-1544374737-1dce449db1e7?q=80&w=800&auto=format&fit=crop',
    desc: 'مناطق التقاء المياه العذبة بالمياه المالحة. تتميّز بطبقات مياه متعدّدة الكثافة والملوحة. تُعدّ من أكثر البيئات الساحلية إنتاجيةً بيولوجياً. تُقدّر الطمي المترسّب سنوياً بمليارات الأطنان.',
    chars: ['تدرج الملوحة', 'ترسب طيني كبير', 'بيئة التقاء']
  },
  {
    id: 7,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الدلتاوات النهرية',
    image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=800&auto=format&fit=crop',
    desc: 'تتشكّل حين يتباطأ تدفق النهر عند دخول البحر فيترسّب حمله من الرواسب. دلتا النيل تُشكّل مثلثاً يمتد 240 كم، وتتراجع الآن بسبب بناء السدود التي تحبس الرواسب. دلتا ميسيسيبي تنمو بمعدل 5 كم كل قرن.',
    chars: ['ترسيب نهري', 'تهدّم دلتوي (هبوط)', 'سيطرة الأمواج/المد']
  },
  {
    id: 8,
    category: 'biological',
    catLabel: 'بيولوجي',
    title: 'الشعاب المرجانية',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop',
    desc: 'أكبر كائنات حيّة بنّاءة على الأرض. تنمو بمعدل 1-3 سم سنوياً فوق القاعدة العظمية للمرجان الميت. تشمل مساحة 284,000 كم² من سطح الأرض. أكثر من 800 مليون إنسان يعتمدون عليها.',
    chars: ['بناء حيوي', 'مياه دافئة وضحلة', 'شعاب هامشية وحلقية']
  },
  {
    id: 9,
    category: 'biological',
    catLabel: 'بيولوجي',
    title: 'مناطق المستنقعات الملحية',
    image: 'https://images.unsplash.com/photo-1616867332303-34538805f6b0?q=80&w=800&auto=format&fit=crop',
    desc: 'تتطوّر في المناطق المحمية من الأمواج حيث يترسّب الطمي الناعم. تُكوّن شبكات معقّدة من قنوات المد. تمتصّ ثاني أكسيد الكربون بكفاءة تفوق الغابات الاستوائية 50 مرة.',
    chars: ['نباتات ملحية', 'قنوات مد وجزر', 'تخزين عالي للكربون']
  },
  {
    id: 10,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'منصات الشاطئ الصخري',
    image: 'https://images.unsplash.com/photo-1510617300431-729930f367fa?q=80&w=800&auto=format&fit=crop',
    desc: 'أسطح صخرية مستوية تمتد بين خط المد الأدنى وقاعدة الجرف. تتشكّل بالتآكل التدريجي للجرف الساحلي. عرضها يتراوح بين 10 م و300 م. تُعدّ مؤشراً لمعدل تراجع الجرف عبر الزمن.',
    chars: ['مسطحات صخرية', 'تتوسع مع تراجع الجرف', 'تخضع للتآكل والتجوية']
  }
];

export function Landforms() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredLandforms = activeFilter === 'all' 
    ? landforms 
    : landforms.filter(item => item.category === activeFilter);

  return (
    <section id="landforms" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            الأشكال الأرضية الساحلية
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تنوّع مذهل من التضاريس ناتج عن تفاعل اليابسة والبحر عبر ملايين السنين.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-5 py-2.5 rounded-full font-medium transition-all",
                activeFilter === filter.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card text-muted-foreground hover:bg-card/80 border border-border hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredLandforms.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl overflow-hidden group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-background/80 backdrop-blur-md border border-border rounded-full text-xs font-bold text-primary">
                    {item.catLabel}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    {item.desc}
                  </p>
                  
                  <div className="pt-4 border-t border-border mt-auto">
                    <ul className="space-y-1">
                      {item.chars.map((char, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
