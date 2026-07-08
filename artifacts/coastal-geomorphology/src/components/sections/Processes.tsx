import { motion } from 'framer-motion';
import { Waves, Droplets, MoveRight, ArrowDownUp, ShieldMinus, Download } from 'lucide-react';

const processes = [
  {
    icon: <Waves className="w-8 h-8 text-primary" />,
    title: 'فعل الأمواج',
    desc: 'أمواج تتولّد بفعل الرياح. ارتفاع الموجة الفعّالة (Hs) يُقدّر بـ1/3 أعلى أمواج السلسلة.',
    bullets: ['الانكسار الإنقلابي', 'الانكسار الانهياري', 'الفعل الهيدروليكي', 'التجريف الموجي']
  },
  {
    icon: <Droplets className="w-8 h-8 text-primary" />,
    title: 'المد والجزر',
    desc: 'دورات المد تُحدّد عرض المنطقة الساحلية النشطة. المد الكبير فوق 4م يُنتج مستنقعات مدّية.',
    bullets: ['مد ربيعي', 'مد تربيعي', 'خوانق مدّية', 'دلتاوات مدّية']
  },
  {
    icon: <MoveRight className="w-8 h-8 text-primary" />,
    title: 'الانجراف الساحلي الطولي',
    desc: 'تيار مجرى الشاطئ (Longshore Current) ينقل ملايين الأطنان من الرواسب سنوياً.',
    bullets: ['جريان المياه على الشاطئ', 'الجريان العكسي', 'بناء الرصيفات الرملية', 'الحواجز الساحلية']
  },
  {
    icon: <ArrowDownUp className="w-8 h-8 text-primary" />,
    title: 'نقل الرواسب',
    desc: 'ثلاث آليات: حمل معلّق، حمل قاعي، حمل وثبي.',
    bullets: ['ميزان الرواسب الساحلية', 'مصادر الرسوب النهرية', 'فخ الرواسب المدّي']
  },
  {
    icon: <ShieldMinus className="w-8 h-8 text-primary" />,
    title: 'التآكل الساحلي',
    desc: 'يُزيل الفعل الهيدروليكي الحجري والتجريف والتذويب مئات الأمتار من الساحل في القرن.',
    bullets: ['انهيار الأجراف', 'تراجع الساحل الصخري', 'التعرية الكيميائية للكلس']
  },
  {
    icon: <Download className="w-8 h-8 text-primary" />,
    title: 'الترسيب والتراكم',
    desc: 'أمواج هادئة وتيارات ضعيفة تُرسّب الجسيمات المعلّقة.',
    bullets: ['بناء الشواطئ', 'تشكّل الكثبان', 'نمو الدلتاوات']
  }
];

export function Processes() {
  return (
    <section id="processes" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            العمليات الساحلية الكبرى
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            القوى الديناميكية التي تنحت وتشكل السواحل حول العالم باستمرار.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processes.map((process, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  {process.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">
                  {process.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 h-16">
                  {process.desc}
                </p>
                
                <ul className="space-y-2">
                  {process.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
