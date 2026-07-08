import { motion } from 'framer-motion';
import { BookOpen, LineChart, ThermometerSun, MountainSnow } from 'lucide-react';

const capabilities = [
  {
    icon: <MountainSnow className="w-6 h-6 text-primary" />,
    title: 'تحليل الأشكال الأرضية',
  },
  {
    icon: <LineChart className="w-6 h-6 text-primary" />,
    title: 'دراسة الأمواج والمد',
  },
  {
    icon: <ThermometerSun className="w-6 h-6 text-primary" />,
    title: 'رصد التغير المناخي',
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: 'فهم العمليات الجيولوجية',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ما هي الجيومورفولوجيا الساحلية؟
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              الجيومورفولوجيا الساحلية هي الدراسة العلمية للأشكال الأرضية الموجودة على امتداد سواحل العالم، والعمليات التي تُشكّلها وتُعدّلها. إنها حقل يتداخل فيه علم الجيولوجيا والمحيطات والمناخ والبيولوجيا، وتساعدنا على فهم التغيرات المستمرة في السواحل التي نعيش عليها.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  {cap.icon}
                  <span className="font-medium text-white text-sm md:text-base">{cap.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent blur-2xl -z-10 rounded-[3rem]" />
            
            <div className="bg-card border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10" />
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">إريك كلارنس فريدريك بيرد</h3>
                  <p className="text-primary font-medium">(1930–2023)</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-muted-foreground w-20 shrink-0">الجنسية:</span>
                  <span className="text-white font-medium">أسترالي بريطاني</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-muted-foreground w-20 shrink-0">المؤسسة:</span>
                  <span className="text-white font-medium">جامعة ملبورن</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-muted-foreground w-20 shrink-0">الكتاب:</span>
                  <span className="text-white font-medium">"Coastal Geomorphology: An Introduction" (الطبعة الثانية 2008)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-muted-foreground w-20 shrink-0">الإسهامات:</span>
                  <span className="text-white font-medium">وثّق أكثر من 600 شكل ساحلي، أسس منهجية دراسة التآكل الساحلي الحديث، شارك في تقارير IPCC</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-muted-foreground w-20 shrink-0">الجوائز:</span>
                  <span className="text-white font-medium">ميدالية الجمعية الملكية الجغرافية، جائزة الجمعية الأمريكية للشواطئ</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
