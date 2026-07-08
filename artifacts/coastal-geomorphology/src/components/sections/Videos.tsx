import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const filters = [
  { id: 'all', label: 'الكل' },
  { id: 'processes', label: 'العمليات' },
  { id: 'landforms', label: 'التضاريس' },
  { id: 'climate', label: 'المناخ' }
];

const videos = [
  {
    id: 'BNG_eoV7Ewg',
    cat: 'processes',
    badge: 'العمليات',
    title: 'Landforms of Coastal Erosion',
    desc: 'مراجعة شاملة للأشكال الأرضية الناتجة عن عمليات التآكل الساحلي وكيف تتطور.'
  },
  {
    id: 'QEZEjbvl_m4',
    cat: 'processes',
    badge: 'العمليات',
    title: 'Longshore Drift Explained',
    desc: 'شرح الانجراف الساحلي الطولي بالصور والرسوم التوضيحية — كيف ينقل الأمواجُ الرمالَ بمحاذاة الشاطئ.'
  },
  {
    id: 'AA2MC3WC1mw',
    cat: 'landforms',
    badge: 'التضاريس',
    title: 'Coastal Landforms',
    desc: 'نظرة شاملة على أشكال التضاريس الساحلية التآكلية والترسيبية: الرؤوس البحرية، الجروف، الأقواس، الحواجز.'
  },
  {
    id: 'oD9GRPXAgVM',
    cat: 'landforms',
    badge: 'التضاريس',
    title: 'Cliffs, Arches, Stacks & Spits',
    desc: 'كيف تتشكل وتتطور الجروف البحرية والأقواس والإبر الصخرية والألسنة الرملية عبر الزمن الجيولوجي.'
  },
  {
    id: 'QH-KYmRAzOA',
    cat: 'climate',
    badge: 'المناخ',
    title: 'What Causes Sea Level Rise?',
    desc: 'شرح علمي مبسط لأسباب ارتفاع مستوى البحر — ذوبان الجليد وتمدد المياه الحرارية والتأثيرات المستقبلية.'
  },
  {
    id: 'y6WbzkI17k0',
    cat: 'climate',
    badge: 'المناخ',
    title: 'Coastal Erosion – Reshaping Our Coastline',
    desc: 'التآكل الساحلي وكيف يُعيد تشكيل الخطوط الساحلية حول العالم وتداعياته على المجتمعات البشرية.'
  }
];

export function Videos() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredVideos = activeFilter === 'all' 
    ? videos 
    : videos.filter(v => v.cat === activeFilter);

  return (
    <section id="videos" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            فيديوهات علمية منتقاة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مقاطع تعليمية لفهم آليات علم الجيومورفولوجيا الساحلية بصرياً.
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

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredVideos.map((video) => (
              <motion.div
                layout
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl overflow-hidden flex flex-col group"
              >
                <div className="relative pt-[56.25%] w-full bg-black overflow-hidden border-b border-border">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-background/80 backdrop-blur-md border border-border rounded-full text-xs font-bold text-primary pointer-events-none">
                    {video.badge}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-2" dir="ltr">{video.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
