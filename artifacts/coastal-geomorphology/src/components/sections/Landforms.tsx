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
    // Unsplash classic 2018 ID — very stable
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    desc: 'تتكوّن من تراكم حبيبات رمل تتفاوت أحجامها من 0.0625 إلى 2 مم. تُمثّل توازناً ديناميكياً دائم الحركة بين الأمواج والرواسب. يُقدّر بيرد أن نحو 70% من الشواطئ الرملية تتراجع عالمياً بسبب نقص الرواسب.',
    chars: ['ديناميكية عالية', 'تتأثر بالانجراف الطولي', 'تتغيّر موسمياً'],
  },
  {
    id: 2,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الكثبان الرملية الساحلية',
    // Wikimedia Commons — guaranteed open
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/White_Sand_Coastal_dunes_Crane_beach_Ipswich_Massachusetts.jpg',
    desc: 'تتشكّل حين تُجفّف الشمس رمال الشاطئ وتُحرّكها الرياح البرية. تُعدّ مخزناً استراتيجياً يُغذّي الشاطئ في أوقات العواصف. تحتوي الكثبان الناضجة على ثلاث مناطق: الكثيب الأمامي، المنطقة المزهرة، والغابة الخلفية.',
    chars: ['خزان رملي استراتيجي', 'تثبيتها يعتمد على النباتات', 'تأثير الرياح محوري'],
  },
  {
    id: 3,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'الأجراف الساحلية',
    // Unsplash 2019 — stable
    image: 'https://images.unsplash.com/photo-1487009805257-5ed2eb9f10a3?q=80&w=800&auto=format&fit=crop',
    desc: 'تتكوّن بفعل تآكل الأمواج عند قاعدة المنحدر الساحلي. معدل تراجعها يتراوح بين مليمترات وعشرات الأمتار سنوياً. أجراف دوفر الطباشيرية بإنجلترا تتراجع بمعدل متر واحد سنوياً.',
    chars: ['انحدار شديد', 'مصدر رواسب للشواطئ', 'تتراجع باستمرار'],
  },
  {
    id: 4,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'الأقواس البحرية والإبر الصخرية',
    // Unsplash 2018 — stable
    image: 'https://images.unsplash.com/photo-1533519808603-91c890f5b1d4?q=80&w=800&auto=format&fit=crop',
    desc: 'مراحل التطور: كهف بحري ← قوس بحري ← إبرة صخرية ← جرف منهار. تستغرق آلاف إلى ملايين السنين. مثال: "أقواس لندن" الاثنا عشر في أستراليا.',
    chars: ['تآكل موضعي تدريجي', 'تطوّر زمني واضح', 'تكسّر هيدروليكي'],
  },
  {
    id: 5,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'الكهوف البحرية',
    // Pexels — direct stable link
    image: 'https://images.pexels.com/photos/34672073/pexels-photo-34672073.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'تتشكّل حين تُركّز الأمواج طاقتها على مناطق ضعيفة في الجرف الصخري. الهواء المضغوط داخلها يُكسر الصخر من الداخل. وجودها مؤشر مبكر على تكوّن قوس بحري مستقبلاً.',
    chars: ['تآكل في نقاط ضعف الصخر', 'ضغط هوائي داخلي', 'بداية تكوّن الأقواس'],
  },
  {
    id: 6,
    category: 'rocky',
    catLabel: 'صخري',
    title: 'منصات الشاطئ الصخري',
    // Unsplash 2018 — stable
    image: 'https://images.unsplash.com/photo-1510617300431-729930f367fa?q=80&w=800&auto=format&fit=crop',
    desc: 'أسطح صخرية مستوية تمتد بين خط المد الأدنى وقاعدة الجرف. تتشكّل بالتآكل التدريجي للجرف الساحلي. عرضها يتراوح بين 10 م و300 م، وتُعدّ مؤشراً لمعدل تراجع الجرف.',
    chars: ['مسطحات صخرية أفقية', 'تتوسع مع تراجع الجرف', 'تخضع للتجوية والتآكل'],
  },
  {
    id: 7,
    category: 'mixed',
    catLabel: 'مختلط',
    title: 'البحيرات الساحلية (اللاجون)',
    // Pexels — direct stable link
    image: 'https://images.pexels.com/photos/13829154/pexels-photo-13829154.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'مسطّحات مائية ضحلة تُفصلها حواجز رملية أو شعابية عن البحر المفتوح. من أغنى البيئات البيولوجية: تُفقّس فيها أسماك كثيرة وتستريح الطيور المهاجرة. لاجون فينيسيا من أشهر أمثلتها.',
    chars: ['مياه ضحلة هادئة', 'يُفصلها حاجز رملي أو شعابي', 'تنوع بيولوجي استثنائي'],
  },
  {
    id: 8,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الألسنة الرملية (Spits)',
    // Unsplash 2019 — stable
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=800&auto=format&fit=crop',
    desc: 'امتدادات رملية تنمو من الشاطئ باتجاه الماء المفتوح بفعل الانجراف الطولي. يتحوّل طرفها عادةً إلى خطاف بسبب تغيّرات اتجاه الأمواج. لسان Spurn Head في إنجلترا ينمو 2 م سنوياً.',
    chars: ['نمو باتجاه الانجراف', 'طرف خطافي الشكل', 'تغذيها رواسب الشاطئ'],
  },
  {
    id: 9,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'التومبولو (Tombolo)',
    // Wikimedia Commons — St Ninian's Isle, Shetland
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Tombolo_St_Ninians_5940.JPG',
    desc: 'جسر رملي أو حصوي يربط جزيرة بالبر الرئيسي. يتكوّن حين تتقاطع أمواج مجاورة وتترسّب رواسبها خلف الجزيرة. مثال نادر على قدرة الأمواج في بناء الأرض لا هدمها.',
    chars: ['جسر طبيعي بين جزيرة والبر', 'تكوّن خلف الجزيرة الحاجزة', 'مثال على الترسيب البنّاء'],
  },
  {
    id: 10,
    category: 'depositional',
    catLabel: 'ترسيبي',
    title: 'الجزر الحاجزة',
    // USGS (US Government) — always accessible
    image: 'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/20210307_134640_0.jpg',
    desc: 'جزر رملية طويلة وضيقة تتوازى مع الساحل وتُكوّن خلفها مياهاً هادئة. تُعدّ من أضعف الأنظمة الساحلية أمام ارتفاع مستوى البحر. سواحل أمريكا الشرقية مثال كلاسيكي.',
    chars: ['موازية للساحل', 'تحمي المياه الخلفية', 'هشّة أمام ارتفاع البحر'],
  },
  {
    id: 11,
    category: 'mixed',
    catLabel: 'مختلط',
    title: 'المصبّات النهرية',
    // Wikimedia Commons — Tralee Bay estuary, Ireland
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Tidal_Estuary-3614%2C_Tralee_Bay%2C_Co._Kerry%2C_Ireland.jpg/800px-Tidal_Estuary-3614%2C_Tralee_Bay%2C_Co._Kerry%2C_Ireland.jpg',
    desc: 'مناطق التقاء المياه العذبة بالمياه المالحة. تتميّز بطبقات مياه متعدّدة الكثافة والملوحة. من أكثر البيئات الساحلية إنتاجيةً بيولوجياً وأهمّها اقتصادياً.',
    chars: ['تدرج الملوحة', 'ترسب طيني كثيف', 'بيئة التقاء فريدة'],
  },
  {
    id: 12,
    category: 'mixed',
    catLabel: 'مختلط',
    title: 'الدلتاوات النهرية',
    // Unsplash 2015 — very stable
    image: 'https://images.unsplash.com/photo-1448099940878-e0c48ea3a165?q=80&w=800&auto=format&fit=crop',
    desc: 'تتشكّل حين يتباطأ تدفق النهر عند دخوله البحر فيترسّب حمله من الرواسب. دلتا النيل تمتد 240 كم وتتراجع الآن بسبب السدود. دلتا ميسيسيبي نمت 5 كم كل قرن تاريخياً.',
    chars: ['ترسيب نهري غزير', 'هبوط دلتوي تدريجي', 'سيطرة الأمواج والمد'],
  },
  {
    id: 13,
    category: 'biological',
    catLabel: 'بيولوجي',
    title: 'الشعاب المرجانية',
    // Wikimedia Commons — Elkhorn coral, Caribbean
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Elkhorn_Coral_with_a_Yellowtail_Damselfish_in_the_Caribbean_Sea_in_Cura%C3%A7ao.jpg/800px-Elkhorn_Coral_with_a_Yellowtail_Damselfish_in_the_Caribbean_Sea_in_Cura%C3%A7ao.jpg',
    desc: 'أكبر كائنات حيّة بنّاءة على الأرض. تنمو بمعدل 1-3 سم سنوياً. تشمل 284,000 كم² من سطح الأرض. ثلاثة أنواع: هامشية وعازلة وحلقية (أتول). يعتمد عليها أكثر من 800 مليون إنسان.',
    chars: ['بناء حيوي كلسي', 'مياه دافئة وضحلة وصافية', 'ثلاثة أنواع: هامشية، عازلة، أتول'],
  },
  {
    id: 14,
    category: 'biological',
    catLabel: 'بيولوجي',
    title: 'أشجار المانغروف',
    // Wikimedia Commons — Mangrove roots, Koh Chang Thailand
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Mangrove_tree_roots%2C_Koh_Chang%2C_Thailand.jpg/800px-Mangrove_tree_roots%2C_Koh_Chang%2C_Thailand.jpg',
    desc: 'غابات ساحلية مدارية تنمو في المياه المالحة الضحلة. جذورها الهوائية تُثبّت الرواسب وتُكسر الأمواج. تمتص الكربون بكفاءة تفوق الغابات الاستوائية. تحمي السواحل من الأعاصير والتسونامي.',
    chars: ['تثبيت الرواسب بالجذور', 'حاجز طبيعي ضد العواصف', 'ختزان ممتاز للكربون'],
  },
  {
    id: 15,
    category: 'wetland',
    catLabel: 'مناطق رطبة',
    title: 'المستنقعات الملحية',
    // Pixabay CDN — very stable
    image: 'https://cdn.pixabay.com/photo/2021/07/24/20/47/salt-marsh-6490350_1280.jpg',
    desc: 'تتطوّر في المناطق المحمية من الأمواج حيث يترسّب الطمي الناعم. تُكوّن شبكات معقّدة من قنوات المد. تمتصّ ثاني أكسيد الكربون بكفاءة تفوق الغابات الاستوائية 50 مرة.',
    chars: ['نباتات ملحية متخصصة', 'قنوات مد وجزر', 'تخزين استثنائي للكربون'],
  },
  {
    id: 16,
    category: 'wetland',
    catLabel: 'مناطق رطبة',
    title: 'الأراضي الرطبة الساحلية',
    // Pexels — direct stable link
    image: 'https://images.pexels.com/photos/37775013/pexels-photo-37775013.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'بيئات انتقالية بين اليابسة والبحر تشمل المستنقعات والأهوار والسهول الفيضية الساحلية. تُؤدي وظائف بيئية متعددة: تنقية المياه، تخزين الفيضانات، موائل للطيور المهاجرة.',
    chars: ['بيئة انتقالية غنية', 'تنقية طبيعية للمياه', 'موائل للطيور المهاجرة'],
  },
  {
    id: 17,
    category: 'wetland',
    catLabel: 'مناطق رطبة',
    title: 'السهول الطينية المدية',
    // Wikimedia Commons — tidal flat
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Tidal_flats_in_South_Korea.jpg/800px-Tidal_flats_in_South_Korea.jpg',
    desc: 'مسطحات طينية تنكشف عند الجزر وتغمرها المياه عند المد. تُرسّب فيها الجسيمات الأدق من الطمي والصلصال. غنيّة بالكائنات الدقيقة التي تُغذّي طيور الشاطئ والأسماك.',
    chars: ['تنكشف في الجزر وتغمرها المياه', 'ترسّب الجسيمات الأدق', 'قاعدة السلسلة الغذائية الساحلية'],
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
            تنوّع مذهل من التضاريس ناتج عن تفاعل اليابسة والبحر — من الأجراف الشامخة إلى المستنقعات والمانغروف.
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
                <div className="relative h-48 overflow-hidden bg-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to a reliable gradient if image fails
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-background/80 backdrop-blur-md border border-border rounded-full text-xs font-bold text-primary">
                    {item.catLabel}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
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
