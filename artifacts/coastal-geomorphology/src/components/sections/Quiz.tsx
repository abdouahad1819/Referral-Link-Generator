import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const questions = [
  {
    q: "ما هو تعريف الجيومورفولوجيا الساحلية وفق إريك بيرد؟",
    options: [
      "دراسة الأشجار والنباتات الساحلية",
      "الدراسة العلمية للأشكال الأرضية على امتداد السواحل والعمليات التي تشكّلها",
      "علم دراسة الأعماق البحرية",
      "دراسة الزلازل والبراكين البحرية"
    ],
    correct: 1
  },
  {
    q: "كيف يُصنّف بيرد المد الذي يتجاوز اختلافه 4 أمتار؟",
    options: [
      "مد صغير (Microtidal)",
      "مد متوسط (Mesotidal)",
      "مد كبير (Macrotidal)",
      "مد عملاق (Megatidal)"
    ],
    correct: 2
  },
  {
    q: "ما الفرق بين \"الشاطئ المرن\" و\"الشاطئ الانعكاسي\" في نموذج بيرد؟",
    options: [
      "حجم الأمواج",
      "نوع الصخر الأساسي",
      "ميل الشاطئ وطبيعة انكسار الأمواج",
      "درجة حرارة الماء"
    ],
    correct: 2
  },
  {
    q: "وفق \"قاعدة برون\" التي يستشهد بها بيرد، ارتفاع 1 متر في مستوى البحر يُؤدّي إلى:",
    options: [
      "تراجع 1–5 أمتار في خط الشاطئ",
      "تراجع 10–25 متراً",
      "تراجع 50–100 متر في خط الشاطئ",
      "لا تأثير إذا كان الشاطئ صخرياً"
    ],
    correct: 2
  },
  {
    q: "أيّ من العمليات التالية يُصنّفها بيرد ضمن \"التآكل الميكانيكي\"؟",
    options: [
      "التحليل الكيميائي للحجر الجيري",
      "الفعل الهيدروليكي والتجريف",
      "ذوبان الملح في الصخور",
      "نشاط الكائنات البيولوجية"
    ],
    correct: 1
  },
  {
    q: "ما الشرط الأساسي لنمو الشعاب المرجانية الصحية وفق بيرد؟",
    options: [
      "مياه باردة وغنية بالأكسجين",
      "أعماق كبيرة بعيدة عن الشاطئ",
      "مياه دافئة (فوق 18°م) ضحلة ونظيفة",
      "وجود تيارات بحرية قوية"
    ],
    correct: 2
  },
  {
    q: "كيف يُسمّي بيرد الظاهرة التي يُغذّي فيها الانجراف الطولي الشاطئ برمال من مناطق أخرى؟",
    options: [
      "ميزان الرواسب الساحلية",
      "دورة الرسوب الدلتوية",
      "نموذج التوازن الشاطئي",
      "آلية الانعكاس الموجي"
    ],
    correct: 0
  },
  {
    q: "وفق تصنيف بيرد للدلتاوات، ما الذي يُحدّد شكل الدلتا؟",
    options: [
      "عمق المجرى النهري فقط",
      "نسبة قوة النهر إلى قوى البحر (الأمواج والمد)",
      "درجة الحرارة وهطول الأمطار",
      "نوع الصخور في حوض النهر"
    ],
    correct: 1
  },
  {
    q: "ما المقصود بـ\"الإيزوستازيا الجليدية\" التي يناقشها بيرد؟",
    options: [
      "تمدّد المياه بفعل الحرارة",
      "ارتفاع الأرض بعد زوال ثقل الجليد",
      "ذوبان الأنهار الجليدية القطبية",
      "تحرّك الصفائح التكتونية"
    ],
    correct: 1
  },
  {
    q: "ما هو \"المد الربيعي\" (Spring tide) وفق الكتاب؟",
    options: [
      "مدّ يحدث فصل الربيع فقط",
      "مدّ صغير الحجم يحدث يومياً",
      "مدّ أقوى يحدث عند اصطفاف الشمس والقمر",
      "مدّ ناتج عن العواصف والأعاصير"
    ],
    correct: 2
  },
  {
    q: "وفق بيرد، ما نسبة الشواطئ الرملية العالمية التي تتراجع حالياً؟",
    options: [
      "10% تقريباً",
      "30% تقريباً",
      "50% تقريباً",
      "70% تقريباً"
    ],
    correct: 3
  },
  {
    q: "ما الفرق بين المصبّ النهري (Estuary) والدلتا وفق بيرد؟",
    options: [
      "المصبّ يتشكّل في البحيرات والدلتا في المحيطات",
      "في المصبّ تتدخّل المياه المالحة، وفي الدلتا تتراكم الرواسب في البحر",
      "الدلتا أكبر دائماً من المصبّ",
      "لا فرق جوهري بينهما"
    ],
    correct: 1
  },
  {
    q: "ما الآلية الرئيسية لتكوّن الكثبان الرملية الساحلية؟",
    options: [
      "الترسيب الموجي مباشرةً على الشاطئ",
      "الرياح تُجفّف رمال الشاطئ وتنقلها للداخل",
      "المد يدفع الرمال خلف الشاطئ",
      "الأنهار تُلقي الرواسب على الساحل"
    ],
    correct: 1
  },
  {
    q: "ما المقصود بـ\"التهدّد الدلتوي\" (Delta Subsidence) الذي يُحلّله بيرد؟",
    options: [
      "تآكل الدلتا بفعل الأمواج",
      "هبوط الأرض في الدلتا بفعل انضغاط الرواسب وسحب المياه الجوفية",
      "انقطاع مصادر الرسوب من الأنهار",
      "الزيادة السريعة في مستوى مياه البحر"
    ],
    correct: 1
  },
  {
    q: "أيّ تصنيف وضعه داروين (وأكّده بيرد) يُميّز أنواع الشعاب المرجانية؟",
    options: [
      "شعاب هامشية وعميقة وسطحية",
      "شعاب باردة ودافئة ومعتدلة",
      "شعاب هامشية وعازلة وجزر حلقية",
      "شعاب استوائية وشبه استوائية وقطبية"
    ],
    correct: 2
  },
  {
    q: "ما الذي يُميّز \"التآكل بالفعل الهيدروليكي\" عن \"التجريف\" وفق بيرد؟",
    options: [
      "التجريف أسرع دائماً",
      "الفعل الهيدروليكي يُفجّر الصخر بضغط الهواء المحبوس، والتجريف يستخدم الرواسب أداةً للحفر",
      "الفعل الهيدروليكي يحدث فقط في المناطق الاستوائية",
      "التجريف خاص بالشواطئ الرملية فقط"
    ],
    correct: 1
  },
  {
    q: "كيف يُسهم الغطاء النباتي في استقرار الكثبان وفق بيرد؟",
    options: [
      "يُولّد ظلاً يُبرّد الرمل ويُجمّده",
      "يُطلق مواد كيميائية تُلصق حبيبات الرمل",
      "يُبطّئ سرعة الرياح ويُثبّت الرمل بجذوره",
      "يُنتج رطوبة تمنع الرمل من التطاير"
    ],
    correct: 2
  },
  {
    q: "ما القيمة التي وثّقها بيرد لمعدل ارتفاع مستوى البحر السنوي الحالي؟",
    options: [
      "0.5 مم سنوياً",
      "3.7 مم سنوياً",
      "15 مم سنوياً",
      "50 مم سنوياً"
    ],
    correct: 1
  },
  {
    q: "ما مبدأ \"إدارة التراجع المدار\" (Managed Retreat) الذي يُقدّمه بيرد؟",
    options: [
      "بناء جدران ساحلية أطول وأقوى",
      "ضخّ الرمال من الأعماق إلى الشاطئ",
      "نقل المباني والبنية التحتية بعيداً عن الخط الساحلي بدل مقاومة التآكل",
      "زراعة الأشجار لإيقاف التآكل"
    ],
    correct: 2
  },
  {
    q: "ما الجزيرة أو المنطقة التي يذكرها بيرد كمثال على الجزر المهدّدة بارتفاع مستوى البحر؟",
    options: [
      "جزيرة صقلية وسردينيا",
      "جزر البليار في إسبانيا",
      "جزر المالديف وتوفالو",
      "جزيرة مدغشقر وسريلانكا"
    ],
    correct: 2
  }
];

export function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const getScoreMessage = () => {
    if (score >= 18) return "ممتاز! أنت خبير في الجيومورفولوجيا الساحلية";
    if (score >= 14) return "جيد جداً! إلمام واسع بمحتوى الكتاب";
    if (score >= 10) return "جيد! راجع الفصول التي أخطأت فيها";
    return "يحتاج مراجعة! تصفّح فصول الكتاب أعلاه وأعد الاختبار";
  };

  const progress = ((currentQ + (showResults ? 1 : 0)) / questions.length) * 100;

  return (
    <section id="quiz" className="py-24 bg-card/30 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            اختبر معلوماتك
          </h2>
          <p className="text-lg text-muted-foreground">
            20 سؤالاً من محتوى كتاب إريك بيرد
          </p>
        </motion.div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
          {/* Progress bar */}
          <div className="w-full bg-background h-2">
            <motion.div 
              className="bg-primary h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6 text-sm font-medium text-muted-foreground border-b border-border pb-4">
                    <span>السؤال {currentQ + 1} من {questions.length}</span>
                    <span>النتيجة: {score}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
                    {questions[currentQ].q}
                  </h3>

                  <div className="space-y-3">
                    {questions[currentQ].options.map((opt, i) => {
                      const isCorrect = i === questions[currentQ].correct;
                      const isSelected = selectedOption === i;
                      
                      let btnClass = "bg-background border-border hover:border-primary/50 text-gray-200";
                      
                      if (isAnswered) {
                        if (isCorrect) {
                          btnClass = "bg-green-500/20 border-green-500 text-white";
                        } else if (isSelected) {
                          btnClass = "bg-red-500/20 border-red-500 text-white";
                        } else {
                          btnClass = "bg-background/50 border-border/50 text-gray-500 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelect(i)}
                          disabled={isAnswered}
                          className={cn(
                            "w-full text-right p-4 rounded-xl border-2 transition-all flex items-center justify-between group",
                            btnClass
                          )}
                        >
                          <span className="text-base md:text-lg">{opt}</span>
                          {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />}
                          {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 flex justify-end"
                    >
                      <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {currentQ === questions.length - 1 ? 'إظهار النتيجة' : 'السؤال التالي'}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-12 h-12 text-primary" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-2">اكتمل الاختبار!</h3>
                  <div className="text-5xl font-bold text-primary mb-6" dir="ltr">
                    {score} <span className="text-2xl text-muted-foreground">/ {questions.length}</span>
                  </div>
                  
                  <p className="text-xl text-white mb-2">
                    {Math.round((score / questions.length) * 100)}%
                  </p>
                  
                  <p className="text-muted-foreground mb-10 text-lg">
                    {getScoreMessage()}
                  </p>

                  <button
                    onClick={restartQuiz}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-card border border-border text-white font-bold rounded-lg hover:bg-muted transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>أعد الاختبار</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
