import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Lightbulb, Target, Star, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const chapters = [
  {
    num: '01',
    title: 'مدخل إلى الجيومورفولوجيا الساحلية',
    theme: 'التعريفات والمفاهيم الأساسية',
    keyPoints: [
      'الساحل هو المنطقة الانتقالية بين اليابسة والبحر، وتُقدَّر بـ 620,000 كم من الخطوط الساحلية العالمية.',
      'يُفرَّق بين ثلاثة مصطلحات: الشاطئ (Beach)، والساحل (Coast)، والخط الساحلي (Shoreline).',
      'تتشكّل السواحل عبر عاملين رئيسيين: العمليات البحرية (الأمواج، المد، التيارات) والعمليات البرية (الأنهار، الرياح، الجليد).',
      'يُقدّم بيرد إطاراً تصنيفياً للسواحل بين: سواحل "تقدّم" (progradation) وسواحل "تراجع" (erosion).',
    ],
    examTip: 'افهم الفرق بين الساحل والخط الساحلي — سؤال مكرر في الامتحانات.',
    terms: ['Shoreline', 'Coast', 'Beach', 'Nearshore', 'Offshore', 'Backshore'],
  },
  {
    num: '02',
    title: 'الأمواج',
    theme: 'توليد الأمواج وخصائصها وتصنيفاتها',
    keyPoints: [
      'الأمواج هي اضطرابات تنتشر على سطح الماء ناتجة عن احتكاك الرياح بالسطح. الطاقة تنتقل لا الماء.',
      'معادلة سرعة الموجة: C = L/T حيث L = الطول الموجي، T = الفترة الزمنية.',
      'ثلاثة أنواع من الأمواج عند الشاطئ: الأمواج الانكسارية (Spilling)، الأمواج الانهيارية (Plunging)، الأمواج الانزلاقية (Surging).',
      'الانكسار (Refraction): تتباطأ الأمواج فوق الأعماق الضحلة فتنكسر نحو خطوط الكنتور، مُركّزةً طاقتها على الرؤوس الصخرية.',
      'الحجم الأقصى للموجة: تعتمد على سرعة الريح × مدة هبوبها × المسافة المقطوعة (Fetch).',
    ],
    examTip: 'ارسم مخططاً للانكسار الموجي وكيف يُركّز الطاقة على الرؤوس ويُشتّتها في الخلجان.',
    terms: ['Wave height', 'Wave period', 'Wavelength', 'Fetch', 'Refraction', 'Diffraction', 'Swash', 'Backwash'],
  },
  {
    num: '03',
    title: 'المد والجزر والتيارات الساحلية',
    theme: 'قوى المد وأنماط التيارات',
    keyPoints: [
      'المد ظاهرة دورية ناتجة عن الجاذبية القمرية والشمسية. المد الكامل (Spring) عند الاقتران، والمد الربعي (Neap) عند التربيع.',
      'ثلاثة أنماط للمد: نصف يومي (Semi-diurnal) كأوروبا، يومي (Diurnal) كخليج المكسيك، ومختلط.',
      'المد العالي (> 4 م): مناطق كخليج فاندي (16 م). المد الضعيف (< 2 م): البحر الأبيض المتوسط.',
      'التيار الساحلي (Longshore Current) يسير بمحاذاة الشاطئ بفعل الأمواج المائلة — المحرك الرئيسي للانجراف الطولي.',
      'تيارات الارتداد (Rip Currents): تيارات ضيقة وعنيفة تمزق خط التكسير، خطيرة على السباحين.',
    ],
    examTip: 'اعرف كيف تؤثر درجة المد (Tidal range) على شكل المصبّات والسهول الطينية.',
    terms: ['Spring tide', 'Neap tide', 'Tidal range', 'Longshore current', 'Rip current', 'Tidal prism'],
  },
  {
    num: '04',
    title: 'الشواطئ',
    theme: 'تكوّن الشواطئ وديناميكيتها',
    keyPoints: [
      'الشاطئ منظومة ديناميكية متوازنة بين إمداد الرواسب وطاقة الأمواج. تغيّره الموسمي طبيعي ومتوقع.',
      'منحدر الشاطئ يتناسب طردياً مع حجم حبيبات الرواسب: رمال دقيقة = منحدر لطيف، حصى = منحدر حاد.',
      'الميزان الرسوبي (Sediment budget): الفرق بين الرواسب الواردة والمغادرة يُحدد حالة الشاطئ (تقدّم/استقرار/تراجع).',
      '70% من الشواطئ الرملية العالمية في حالة تراجع — جزء كبير منه بسبب تدخل الإنسان (سدود، جدران بحرية).',
      'أنواع الشواطئ: الرملية (Sandy)، الحصوية (Shingle/Gravel)، المختلطة، وشواطئ المانغروف والشعاب.',
    ],
    examTip: 'ميزان الرواسب هو المفهوم الأكثر أهمية في هذا الفصل — وضّحه بمخطط.',
    terms: ['Sediment budget', 'Beach profile', 'Berm', 'Swash zone', 'Beach drift', 'Cusps', 'Storm surge'],
  },
  {
    num: '05',
    title: 'الكثبان الساحلية',
    theme: 'تكوّن الكثبان وأنواعها وإدارتها',
    keyPoints: [
      'الكثبان تحتاج ثلاثة شروط: رواسب جافة، رياح قوية، وعائق طبيعي أو صناعي.',
      'التطور المرحلي للكثبان: كثيب أمامي (Foredune) ← كثيب ناضج ← غابة كثبان مستقرة.',
      'النباتات الرائدة (Marram Grass) تُثبّت الكثيب الأمامي برباطها الجذري العميق.',
      'الكثبان الهلالية (Barchan) تتشكّل في مناطق شحيحة الرواسب وتتحرك بسرعة.',
      'تُقدّر الكثبان بأنها خزان احتياطي للرمال — تُعيد إمداد الشاطئ بعد العواصف.',
    ],
    examTip: 'ارسم تسلسل تطوّر الكثبان من الشاطئ للداخل (Succession) مع ذكر النباتات في كل مرحلة.',
    terms: ['Foredune', 'Parabolic dune', 'Barchan', 'Blowout', 'Marram grass', 'Psammosere succession'],
  },
  {
    num: '06',
    title: 'المصبّات النهرية',
    theme: 'التفاعل بين الأنهار والبحر',
    keyPoints: [
      'المصبّ النهري منطقة تلتقي فيها المياه العذبة بالمياه المالحة، مُكوِّنةً تدرجاً ملحياً (Halocline).',
      'أربعة أنواع: ريائي (Ria / drowned valley)، فيوردي (Fjord)، دلتوي (bar-built)، وتكتوني.',
      'ترسيب الطمي يُكوّن سهولاً طينية وقنوات متشعبة. المياه الكثيفة تغوص تحت العذبة.',
      'المصبّات من أغنى البيئات بيولوجياً: تُفقّس فيها سمكة الأنقليس، وتتوالد طيور الشاطئ.',
      'تُهدَّد المصبّات بالتلوث والردم والسدود التي تحبس الرواسب.',
    ],
    examTip: 'افهم كيف يؤثر تدرج الملوحة على ترسيب الجسيمات الغروية (Flocculation).',
    terms: ['Halocline', 'Flocculation', 'Ria', 'Fjord', 'Tidal bore', 'Mangrove estuary', 'Turbidity maximum'],
  },
  {
    num: '07',
    title: 'الدلتاوات النهرية',
    theme: 'تكوّن الدلتاوات وأنواعها وتهديداتها',
    keyPoints: [
      'تتشكّل الدلتا حين يغلب الترسيب النهري على تآكل البحر. تتفرّع فيها قنوات الأنهار قبل الوصول للبحر.',
      'ثلاثة أنواع: سيطرة النهر (النيل، ميسيسيبي)، سيطرة الأمواج (دلتا السن، موريتانيا)، سيطرة المد (دلتا الغانج).',
      'الدلتا تهبط بفعل ضغط الترسيب، وتصريف المياه الجوفية، وتحلّل المواد العضوية.',
      'دلتا النيل تتراجع بسبب حجز السد العالي للرواسب — تراجع 1.7 كم² سنوياً.',
      'دلتا ميسيسيبي خسرت 25% من مساحتها منذ 1930 بسبب قنوات التصريف الاصطناعية.',
    ],
    examTip: 'اعرف الأنواع الثلاثة للدلتاوات وأمثلة على كل منها — سؤال مقالي متوقع.',
    terms: ['Distributary', 'Delta plain', 'Subsidence', 'Bird-foot delta', 'Cuspate delta', 'Wave-dominated delta'],
  },
  {
    num: '08',
    title: 'السواحل الصخرية',
    theme: 'التآكل والتكوينات الصخرية',
    keyPoints: [
      'أربعة عمليات تآكل: الضرب الهيدروليكي، السحت، التآكل الكيميائي (تحلّل الكربونات)، التجوية.',
      'الضرب الهيدروليكي يضغط هواءً في الشقوق بقوة تصل لـ 600 كيلوپاسكال.',
      'منصة الشاطئ الصخري (Wave-cut platform) تتوسع مع تراجع الجرف، وعرضها يقيس معدل التآكل.',
      'الجرف يتراجع باستمرار وليس عند القاعدة فحسب — التجوية تُضعف الجزء العلوي أيضاً.',
      'أنواع الجروف: مائلة الانحدار (Slope-over-wall)، مستقيمة، ومرتدة (Overhang).',
    ],
    examTip: 'اشرح الدورة الكاملة: جرف ← شق ← كهف ← قوس ← إبرة ← منصة.',
    terms: ['Hydraulic action', 'Abrasion', 'Corrosion', 'Wave-cut notch', 'Wave-cut platform', 'Sea cave', 'Stack'],
  },
  {
    num: '09',
    title: 'الشعاب المرجانية',
    theme: 'البيولوجيا والجيومورفولوجيا المرجانية',
    keyPoints: [
      'الشعاب تنمو بمعدل 1-3 سم سنوياً فوق الهيكل الكلسي للمرجان الميت.',
      'ثلاثة أنواع وفق داروين: الشعاب الهامشية (Fringing) ← الشعاب العازلة (Barrier) ← الأتول (Atoll).',
      'الأتول يتشكّل حين تغوص الجزيرة البركانية ببطء بينما ينمو المرجان لأعلى مُكوّناً حلقة.',
      'الشعاب تحتاج: حرارة 18-30°م، ملوحة 32-37 ppt، شفافية عالية، ضحالة (< 50 م).',
      'الأحداث العالمية كالنينو ترفع درجات الحرارة فتُحدث ابيضاض المرجان (Coral Bleaching).',
    ],
    examTip: 'اشرح نظرية داروين في تطوّر الشعاب من هامشية لأتول مع رسم توضيحي.',
    terms: ['Fringing reef', 'Barrier reef', 'Atoll', 'Coral bleaching', 'Zooxanthellae', 'Reef flat', 'Lagoon'],
  },
  {
    num: '10',
    title: 'أشجار المانغروف',
    theme: 'غابات الساحل الاستوائية ودورها الجيومورفولوجي',
    keyPoints: [
      'المانغروف غابات ساحلية تنمو في المناطق المدارية وشبه المدارية في المياه المالحة الضحلة.',
      'جذورها الهوائية (Pneumatophores) تُثبّت الرواسب وتُقلّل سرعة التيارات.',
      'تُقدّر بتخزين 3-5 أضعاف كربون الغابات الاستوائية بوحدة المساحة.',
      'تُقلّل ارتفاع الأمواج بنسبة 66% في مسافة 100 م — حماية طبيعية من التسونامي والأعاصير.',
      'اندثر 35-50% من مساحة المانغروف عالمياً منذ 1980 بسبب زراعة الروبيان وتطوير السواحل.',
    ],
    examTip: 'اربط الدور الجيومورفولوجي للمانغروف بترسيب الرواسب وتثبيت الخط الساحلي.',
    terms: ['Pneumatophores', 'Prop roots', 'Viviparous propagule', 'Blue carbon', 'Mangrove zonation'],
  },
  {
    num: '11',
    title: 'المستنقعات الملحية والأراضي الرطبة',
    theme: 'المناطق الانتقالية بين البر والبحر',
    keyPoints: [
      'تتطوّر المستنقعات الملحية في المناطق المحمية ذات التيارات الضعيفة حيث يترسّب الطمي الناعم.',
      'تُقسَّم إلى مناطق عمودية بحسب تكرار الغمر: منخفضة (عالية الغمر) ومرتفعة (نادرة الغمر).',
      'قنوات المد (Tidal creeks) شبكة دموية للمستنقع تُوزّع الماء والرواسب.',
      'تُمتصّ ثاني أكسيد الكربون بكفاءة 50 مرة أعلى من الغابات الاستوائية — "الكربون الأزرق".',
      'تُوفر حواجز طبيعية ضد الفيضانات وتُصفّي الملوّثات من مياه الصرف.',
    ],
    examTip: 'اشرح مفهوم "الكربون الأزرق" وأهمية المستنقعات الملحية في التخفيف من التغيّر المناخي.',
    terms: ['Salt marsh', 'Halophyte', 'Tidal creek', 'Marsh zonation', 'Blue carbon', 'Spartina', 'Sediment accretion'],
  },
  {
    num: '12',
    title: 'البحيرات الساحلية واللاجونات',
    theme: 'المسطحات المائية المحمية',
    keyPoints: [
      'اللاجون مسطح مائي يُفصله عن البحر حاجز رملي أو شعابي. 13% من سواحل العالم لاجونات.',
      'تتشكّل بثلاث طرق: ترسيب حاجز رملي، ارتفاع مستوى البحر فوق سهل ساحلي، أو نمو شعاب مرجانية.',
      'الملوحة فيها أعلى من البحر في المناطق الجافة (بالتبخر) وأقل في الرطبة (بالأمطار).',
      'توفر مناطق تفريخ للأسماك والروبيان — تُقدَّر قيمتها الاقتصادية بمليارات الدولارات سنوياً.',
      'اللاجون هشّة جداً: التعكّر، والردم، وإغلاق الممرات يُفضي إلى انهيار نظامها البيئي.',
    ],
    examTip: 'قارن بين آليات تشكّل اللاجون في المناطق المدارية (شعابية) والمعتدلة (رملية).',
    terms: ['Lagoon', 'Inlet', 'Barrier bar', 'Washover fan', 'Tidal inlet', 'Hypersaline lagoon'],
  },
  {
    num: '13',
    title: 'الجروف الساحلية والمنحدرات',
    theme: 'تفصيل هندسة الجرف وتراجعه',
    keyPoints: [
      'الجرف يتراجع بآليتين: التآكل البحري عند القاعدة، والانهيارات الكتلية (Mass movement) من الأعلى.',
      'معدل تراجع الجرف يعتمد على: صلابة الصخر، درجة التشقق، طاقة الأمواج، ووجود الشاطئ كدرع.',
      'الشاطئ أمام الجرف يُقلّل التآكل — إزالة الشاطئ (نقل الرمال) تُسرّع التراجع 5-10 أضعاف.',
      'الجروف الطباشيرية (كدوفر) أسرع تراجعاً من البازلتية لهشاشة الكربونات بالتحلل.',
      'الرقابة البشرية (Cliff monitoring) تستخدم LiDAR وصور القمر الصناعي لقياس التغيّر.',
    ],
    examTip: 'اشرح لماذا إضافة مواد دفاعية أمام الجرف قد تُسرّع تآكل الجرف المجاور.',
    terms: ['Mass movement', 'Rotational slip', 'Cliff recession rate', 'Wave-cut notch', 'Hard engineering', 'Soft engineering'],
  },
  {
    num: '14',
    title: 'تغيّرات مستوى البحر',
    theme: 'التاريخ والحاضر والمستقبل',
    keyPoints: [
      'في آخر الجليدي الأخير (18,000 سنة) كان مستوى البحر أقل بـ 120 م من اليوم.',
      'الهولوسين شهد ارتفاعاً سريعاً (15,000-7,000 سنة) ثم استقراراً نسبياً منذ 6,000 سنة.',
      'ارتفاع مستوى البحر في القرن الماضي: ~17 سم. الإسراع منذ 1993: 3.1-3.6 مم سنوياً.',
      'الأسباب: ذوبان الجليد الجليدي (50%) والتمدد الحراري للمحيطات (50%).',
      'توقعات IPCC 2100: ارتفاع 0.3-1 م (الأرجح 0.5-0.7 م). بعض السيناريوهات تصل لـ 2 م.',
      'السواحل الأكثر تضرراً: الجزر المنخفضة (مالديف، توفالو)، الدلتاوات، المدن الساحلية.',
    ],
    examTip: 'افهم الفرق بين Eustatic (تغيّر حجم المحيط) و Isostatic (تغيّر ارتفاع اليابسة).',
    terms: ['Eustatic change', 'Isostatic change', 'Transgression', 'Regression', 'Holocene', 'Sea level rise', 'Submerged coast'],
  },
  {
    num: '15',
    title: 'إدارة السواحل',
    theme: 'المقاربات الهندسية والبيئية',
    keyPoints: [
      'الهندسة الصلبة (Hard Engineering): جدران بحرية، مقذوفات حجرية، حواجز موج — تعكس الطاقة لكن تُعيق انجراف الرواسب.',
      'الهندسة اللينة (Soft Engineering): ضخ رمال، إعادة النباتات، بناء مصطبات — تُحاكي العمليات الطبيعية.',
      'التراجع المُدار (Managed Retreat): السماح للبحر بالتقدم داخل المناطق المنخفضة الإنتاجية بدل الدفاع عنها.',
      'مقاربة النظام بأكمله (Coastal Cell Management): إدارة الخلية الرسوبية ككيان واحد متكامل.',
      'التكلفة مقابل الفائدة: جدار بحري يكلف 10,000-30,000 دولار/م ويحمي لعقود فقط.',
    ],
    examTip: 'ناقش إيجابيات وسلبيات الجدران البحرية مع مثال تطبيقي (سواحل إنجلترا مثلاً).',
    terms: ['Seawall', 'Groyne', 'Beach nourishment', 'Managed retreat', 'Coastal cell', 'Littoral drift', 'EIA'],
  },
  {
    num: '16',
    title: 'مستقبل السواحل',
    theme: 'التغيّر المناخي والسواحل في القرن 21',
    keyPoints: [
      'مزدوج التهديد: ارتفاع مستوى البحر + زيادة قوة العواصف يُضاعف الضغط على السواحل.',
      '600 مليون شخص يسكنون على ارتفاع أقل من 10 م فوق سطح البحر — 10% من سكان العالم.',
      'الشعاب المرجانية مُهدَّدة بالانقراض الوظيفي بحلول 2050 إذا تجاوزت الحرارة 2°م.',
      'المانغروف والمستنقعات قد تُواكب ارتفاع البحر إذا توفرت رواسب كافية — لكنها تفشل إذا كانت مقيّدة خلف جدران.',
      'الحلول المستدامة: الدفاع المبني على النظام البيئي (EbA)، إعادة بناء الشعاب صناعياً، الابتعاد عن الشاطئ.',
    ],
    examTip: 'اكتب مقالاً عن "لماذا لا تنجح الهندسة الصلبة وحدها في حماية السواحل في مواجهة التغيّر المناخي".',
    terms: ['Climate change', 'Storm surge', 'EbA (Ecosystem-based Adaptation)', 'Resilience', 'Coastal squeeze', 'Blue-green infrastructure'],
  },
];

const keyConceptCards = [
  {
    icon: '🌊',
    title: 'ميزان الرواسب',
    desc: 'كمية الرواسب الواردة مقارنةً بالمُصدَّرة تُحدد ما إذا كان الشاطئ في تقدّم أو تراجع أو استقرار.',
  },
  {
    icon: '🔄',
    title: 'الانجراف الطولي',
    desc: 'حركة الرواسب بمحاذاة الشاطئ بفعل الأمواج المائلة — المحرك الرئيسي لتشكّل الألسنة والحواجز.',
  },
  {
    icon: '📉',
    title: 'تغيّر مستوى البحر',
    desc: 'عُستاتي (حجم المحيط) وإيزوستاتي (حركة اليابسة) — فهم الفرق أساسي لتحليل أي شاطئ.',
  },
  {
    icon: '🌱',
    title: 'الكربون الأزرق',
    desc: 'المانغروف والمستنقعات والأعشاب البحرية تختزن كميات ضخمة من الكربون — وظيفة بيئية حيوية.',
  },
  {
    icon: '⚖️',
    title: 'التوازن الديناميكي',
    desc: 'الساحل لا يميل للثبات بل للاتزان مع الظروف المحيطة — تغيّر المدخلات يؤدي لتغيّر الشكل.',
  },
  {
    icon: '🏗️',
    title: 'الهندسة اللينة vs الصلبة',
    desc: 'الحلول الهندسية الصلبة تعكس الطاقة لكن تُعيق الرواسب. اللينة تُحاكي الطبيعة وأكثر استدامة.',
  },
];

export function BookSummary() {
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  return (
    <section id="book-summary" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            مرجع المراجعة الشامل
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ملخص الكتاب فصلاً بفصل
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ملخص أكاديمي شامل لـ <span className="text-primary font-semibold">Coastal Geomorphology: An Introduction</span> — Eric C.F. Bird (الطبعة الثانية، 2008).
            كل فصل يحتوي على النقاط الجوهرية ونصيحة للمراجعة والمصطلحات الأساسية.
          </p>
        </motion.div>

        {/* Key Concepts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <Lightbulb className="text-primary w-6 h-6" />
            المفاهيم الجوهرية للكتاب
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyConceptCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h4 className="text-white font-bold mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chapters Accordion */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <Target className="text-primary w-6 h-6" />
            الفصول الستة عشر — نقاط المراجعة
          </h3>
          <div className="space-y-3">
            {chapters.map((ch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenChapter(openChapter === i ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-right hover:bg-white/5 transition-colors"
                >
                  <span className="text-2xl font-black text-primary/30 font-mono w-10 shrink-0">
                    {ch.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-base leading-tight">{ch.title}</p>
                    <p className="text-muted-foreground text-sm mt-0.5">{ch.theme}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform shrink-0",
                      openChapter === i && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {openChapter === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 border-t border-border pt-5 space-y-5">
                        {/* Key Points */}
                        <div>
                          <h5 className="text-sm font-bold text-primary mb-3 flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5" /> النقاط الجوهرية
                          </h5>
                          <ul className="space-y-2">
                            {ch.keyPoints.map((pt, j) => (
                              <li key={j} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                                <span className="text-primary mt-1 shrink-0">◆</span>
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Exam Tip */}
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3">
                          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-primary mb-1">نصيحة المراجعة</p>
                            <p className="text-sm text-gray-300">{ch.examTip}</p>
                          </div>
                        </div>

                        {/* Key Terms */}
                        <div>
                          <p className="text-xs font-bold text-muted-foreground mb-2">المصطلحات الأساسية:</p>
                          <div className="flex flex-wrap gap-2">
                            {ch.terms.map((term, j) => (
                              <span
                                key={j}
                                className="px-2.5 py-1 bg-background border border-border rounded-md text-xs font-mono text-primary/80"
                                dir="ltr"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">الخلاصة الكبرى</h3>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-lg">
            الرسالة المركزية لكتاب إريك بيرد: <span className="text-white font-semibold">الساحل منظومة ديناميكية متوازنة</span>، لا خطٌّ ثابت.
            كل تدخّل بشري — سد، جدار، ميناء — يُخلّ بميزان الرواسب، فيتراجع الشاطئ هنا ويترسّب هناك.
            فهم العمليات الطبيعية هو الشرط الأول لأي إدارة ساحلية ناجحة.
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { n: '16', label: 'فصلاً' },
              { n: '436', label: 'صفحة' },
              { n: '5,000+', label: 'استشهاد علمي' },
              { n: '50+', label: 'سنة بحث ميداني' },
            ].map((stat, i) => (
              <div key={i} className="bg-background/40 rounded-xl p-4">
                <p className="text-2xl font-black text-primary" dir="ltr">{stat.n}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
