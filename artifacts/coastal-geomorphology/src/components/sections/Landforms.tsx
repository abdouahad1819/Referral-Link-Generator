import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const filters = [
  { id: 'all', label: 'الكل' },
  { id: 'rocky', label: 'صخري' },
  { id: 'depositional', label: 'ترسيبي' },
  { id: 'biological', label: 'بيولوجي' },
  { id: 'wetland', label: 'مناطق رطبة' },
  { id: 'mixed', label: 'مختلط' },
];

const landforms = [
  {
    id: 1,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الشواطئ الرملية',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    desc: 'تتكوّن من تراكم حبيبات رمل تتفاوت أحجامها من 0.0625 إلى 2 مم. تُمثّل توازناً ديناميكياً دائم الحركة بين الأمواج والرواسب. يُقدّر بيرد أن نحو 70% من الشواطئ الرملية تتراجع عالمياً بسبب نقص الرواسب.',
    chars: ['ديناميكية عالية', 'تتأثر بالانجراف الطولي', 'تتغيّر موسمياً']
  },
  {
    id: 2,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الكثبان الرملية الساحلية',
    image: 'https://images.unsplash.com/photo-1574105760593-32b4dd6cbf6d?q=80&w=800&auto=format&fit=crop',
    desc: 'تتشكّل حين تُجفّف الشمس رمال الشاطئ وتُحرّكها الرياح البرية. تُعدّ مخزناً استراتيجياً يُغذّي الشاطئ في أوقات العواصف. تحتوي الكثبان الناضجة على ثلاث مناطق: الكثيب الأمامي، المنطقة المزهرة، والغابة الخلفية.',
    chars: ['خزان رملي استراتيجي', 'تثبيتها يعتمد على النباتات', 'تأثير الرياح محوري']
  },
  {
    id: 3,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'الجروف الساحلية',
    image: 'https://images.unsplash.com/photo-1487009805257-5ed2eb9f10a3?q=80&w=800&auto=format&fit=crop',
    desc: 'تتكوّن بفعل تآكل الأمواج عند قاعدة المنحدر الساحلي. معدل تراجعها يتراوح بين مليمترات وعشرات الأمتار سنوياً. جروف دوفر الطباشيرية بإنجلترا تتراجع بمعدل متر واحد سنوياً.',
    chars: ['انحدار شديد', 'مصدر رواسب للشواطئ', 'تتراجع باستمرار']
  },
  {
    id: 4,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'الأقواس البحرية والإبر الصخرية',
    image: 'https://images.unsplash.com/photo-1533519808603-91c890f5b1d4?q=80&w=800&auto=format&fit=crop',
    desc: 'مراحل التطور: كهف بحري ← قوس بحري ← إبرة صخرية ← جرف منهار. تستغرق آلاف إلى ملايين السنين. مثال: "أقواس لندن" الاثنا عشر في أستراليا.',
    chars: ['تآكل موضعي تدريجي', 'تطوّر زمني واضح', 'تكسّر هيدروليكي']
  },
  {
    id: 5,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'الكهوف البحرية',
    image: 'https://images.unsplash.com/photo-1670619666485-c13a485eea65?q=80&w=800&auto=format&fit=crop',
    desc: 'تتشكّل حين تُركّز الأمواج طاقتها على مناطق ضعيفة في الجرف الصخري. الهواء المضغوط داخلها يُكسر الصخر من الداخل. وجودها مؤشر مبكر على تكوّن قوس بحري مستقبلاً.',
    chars: ['تآكل في نقاط ضعف الصخر', 'ضغط هوائي داخلي', 'بداية تكوّن الأقواس']
  },
  {
    id: 6,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'منصات الشاطئ الصخري',
    image: 'https://images.unsplash.com/photo-1510617300431-729930f367fa?q=80&w=800&auto=format&fit=crop',
    desc: 'أسطح صخرية مستوية تمتد بين خط المد الأدنى وقاعدة الجرف. تتشكّل بالتآكل التدريجي للجرف الساحلي. عرضها يتراوح بين 10 م و300 م، وتُعدّ مؤشراً لمعدل تراجع الجرف.',
    chars: ['مسطحات صخرية أفقية', 'تتوسع مع تراجع الجرف', 'تخضع للتجوية والتآكل']
  },
  {
    id: 7,
    category: 'mixed',
    catLabel: 'مختلط',
    title: 'البحيرات الساحلية (اللاجون)',
    image: 'https://images.unsplash.com/photo-1676517305935-ab96ab961336?q=80&w=800&auto=format&fit=crop',
    desc: 'مسطّحات مائية ضحلة تُفصلها حواجز رملية أو شعابية عن البحر المفتوح. من أغنى البيئات البيولوجية: تُفقّس فيها أسماك كثيرة وتستريح الطيور المهاجرة. لاجون فينيسيا من أشهر أمثلتها.',
    chars: ['مياه ضحلة هادئة', 'يُفصلها حاجز رملي أو شعابي', 'تنوع بيولوجي استثنائي']
  },
  {
    id: 8,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الألسنة الرملية (Spits)',
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=800&auto=format&fit=crop',
    desc: 'امتدادات رملية تنمو من الشاطئ باتجاه الماء المفتوح بفعل الانجراف الطولي. يتحوّل طرفها عادةً إلى خطاف بسبب تغيّرات اتجاه الأمواج. لسان Spurn Head في إنجلترا ينمو 2 م سنوياً.',
    chars: ['نمو باتجاه الانجراف', 'طرف خطافي الشكل', 'تغذيها رواسب الشاطئ']
  },
  {
    id: 9,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'التومبولو (Tombolo)',
    image: 'https://images.unsplash.com/photo-1666286163385-abe05f0326c4?q=80&w=800&auto=format&fit=crop',
    desc: 'جسر رملي أو حصوي يربط جزيرة بالبر الرئيسي. يتكوّن حين تتقاطع أمواج مجاورة وتترسّب رواسبها خلف الجزيرة. مثال نادر على قدرة الأمواج في بناء الأرض لا هدمها.',
    chars: ['جسر طبيعي بين جزيرة والبر', 'تكوّن خلف الجزيرة الحاجزة', 'مثال على الترسيب البنّاء']
  },
  {
    id: 10,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الجزر الحاجزة',
    image: 'https://images.unsplash.com/photo-1681223399332-0ff9a88ea10c?q=80&w=800&auto=format&fit=crop',
    desc: 'جزر رملية طويلة وضيقة تتوازى مع الساحل وتُكوّن خلفها مياهاً هادئة. تُعدّ من أضعف الأنظمة الساحلية أمام ارتفاع مستوى البحر. سواحل أمريكا الشرقية مثال كلاسيكي.',
    chars: ['موازية للساحل', 'تحمي المياه الخلفية', 'هشّة أمام ارتفاع البحر']
  },
  {
    id: 11,
    category: 'mixed',
    catLabel: 'مختلط',
    title: 'المصبّات النهرية',
    image: 'https://images.unsplash.com/photo-1697729903522-807e1f675ddc?q=80&w=800&auto=format&fit=crop',
    desc: 'مناطق التقاء المياه العذبة بالمياه المالحة. تتميّز بطبقات مياه متعدّدة الكثافة والملوحة. من أكثر البيئات الساحلية إنتاجيةً بيولوجياً وأهمّها اقتصادياً.',
    chars: ['تدرج الملوحة', 'ترسب طيني كثيف', 'بيئة التقاء فريدة']
  },
  {
    id: 12,
    category: 'mixed',
    catLabel: 'مختلط',
    title: 'الدلتاوات النهرية',
    image: 'https://images.unsplash.com/photo-1448099940878-e0c48ea3a165?q=80&w=800&auto=format&fit=crop',
    desc: 'تتشكّل حين يتباطأ تدفق النهر عند دخوله البحر فيترسّب حمله من الرواسب. دلتا النيل تمتد 240 كم وتتراجع الآن بسبب السدود. دلتا ميسيسيبي نمت 5 كم كل قرن تاريخياً.',
    chars: ['ترسيب نهري غزير', 'هبوط دلتوي تدريجي', 'سيطرة الأمواج والمد']
  },
  {
    id: 13,
    category: 'biological',
    catLabel: 'بيولوجي',
    title: 'الشعاب المرجانية',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800&auto=format&fit=crop',
    desc: 'أكبر كائنات حيّة بنّاءة على الأرض. تنمو بمعدل 1-3 سم سنوياً. تشمل 284,000 كم² من سطح الأرض. ثلاثة أنواع: هامشية وعازلة وحلقية (أتول). يعتمد عليها أكثر من 800 مليون إنسان.',
    chars: ['بناء حيوي كلسي', 'مياه دافئة وضحلة وصافية', 'ثلاثة أنواع: هامشية، عازلة، أتول']
  },
  {
    id: 14,
    category: 'biological',
    catLabel: 'بيولوجي',
    title: 'أشجار المانغروف',
    image: 'https://images.unsplash.com/photo-1778477292436-4c1748f375e0?q=80&w=800&auto=format&fit=crop',
    desc: 'غابات ساحلية مدارية تنمو في المياه المالحة الضحلة. جذورها الهوائية تُثبّت الرواسب وتُكسر الأمواج. تمتص الكربون بكفاءة تفوق الغابات الاستوائية. تحمي السواحل من الأعاصير والتسونامي.',
    chars: ['تثبيت الرواسب بالجذور', 'حاجز طبيعي ضد العواصف', 'ختزان ممتاز للكربون']
  },
  {
    id: 15,
    category: 'wetland',
    catLabel: 'مناطق رطبة',
    title: 'المستنقعات الملحية',
    image: 'https://images.unsplash.com/photo-1661868856803-7cd1bdbbbb88?q=80&w=800&auto=format&fit=crop',
    desc: 'تتطوّر في المناطق المحمية من الأمواج حيث يترسّب الطمي الناعم. تُكوّن شبكات معقّدة من قنوات المد. تمتصّ ثاني أكسيد الكربون بكفاءة تفوق الغابات الاستوائية 50 مرة.',
    chars: ['نباتات ملحية متخصصة', 'قنوات مد وجزر', 'تخزين استثنائي للكربون']
  },
  {
    id: 16,
    category: 'wetland',
    catLabel: 'مناطق رطبة',
    title: 'الأراضي الرطبة الساحلية',
    image: 'https://images.unsplash.com/photo-1780079499051-3e9c0b60769c?q=80&w=800&auto=format&fit=crop',
    desc: 'بيئات انتقالية بين اليابسة والبحر تشمل المستنقعات والأهوار والسهول الفيضية الساحلية. تُؤدي وظائف بيئية متعددة: تنقية المياه، تخزين الفيضانات، موائل للطيور المهاجرة.',
    chars: ['بيئة انتقالية غنية', 'تنقية طبيعية للمياه', 'موائل للطيور المهاجرة']
  },
  {
    id: 17,
    category: 'wetland',
    catLabel: 'مناطق رطبة',
    title: 'السهول الطينية المدية',
    image: 'https://images.unsplash.com/photo-1769344379195-0a08bd79c5ac?q=80&w=800&auto=format&fit=crop',
    desc: 'مسطحات طينية تنكشف عند الجزر وتغمرها المياه عند المد. تُرسّب فيها الجسيمات الأدق من الطمي والصلصال. غنيّة بالكائنات الدقيقة التي تُغذّي طيور الشاطئ والأسماك.',
    chars: ['تنكشف في الجزر وتغمرها المياه', 'ترسّب الجسيمات الأدق', 'قاعدة السلسلة الغذائية الساحلية']
  },
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
            تنوّع مذهل من التضاريس ناتج عن تفاعل اليابسة والبحر عبر ملايين السنين — من الجروف الشامخة إلى المستنقعات والمانغروف.
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
                          <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
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
