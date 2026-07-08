import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10" />
        {/* Animated ocean gradients */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at center, hsl(var(--primary)/0.4) 0%, transparent 60%)',
            backgroundSize: '200% 200%',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1454388683759-ee76c15fee26?q=80&w=2000&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            mixBlendMode: 'luminosity'
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              بوابة الجيومورفولوجيا الساحلية
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.2]">
              استكشف العلم الديناميكي الذي يدرس <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-blue-400">الأشكال الأرضية الساحلية</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              والعمليات الهائلة التي شكّلتها عبر ملايين السنين. بناءً على المرجع العلمي لإريك بيرد.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => scrollTo('book')}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
            >
              <span>استكشف الكتاب</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('videos')}
              className="w-full sm:w-auto px-8 py-4 bg-card text-white border border-border rounded-lg font-bold hover:bg-muted transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 text-primary" />
              <span>شاهد الفيديوهات</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-border/50"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">3.7<span className="text-primary text-xl"> مم</span></span>
              <span className="text-sm text-muted-foreground">ارتفاع سنوي لمستوى البحر</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">+600</span>
              <span className="text-sm text-muted-foreground">شكل ساحلي موثّق</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">370,000<span className="text-primary text-xl"> كم</span></span>
              <span className="text-sm text-muted-foreground">سواحل عالمية</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
