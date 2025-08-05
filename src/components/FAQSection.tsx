import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/hooks/useLanguage';

const FAQSection = () => {
  const { language } = useLanguage();

  const faqs = language === 'he' ? [
    {
      question: 'מה זה ADHD?',
      answer: 'ADHD (הפרעת קשב וריכוז) היא הפרעה נוירו-התפתחותית הפוגעת ביכולת הריכוז, הקשב והשליטה בדחפים. ההפרעה מתחילה בגיל הילדות ויכולה להמשיך עד לבגרות.'
    },
    {
      question: 'איך נראה תהליך האבחון?',
      answer: 'תהליך האבחון כולל ראיון מקיף, שאלונים סטנדרטיים, בדיקות קוגניטיביות ולעיתים צילומי מוח. התהליך נמשך כמה פגישות ומבוצע על ידי צוות מקצועי.'
    },
    {
      question: 'האם יש טיפול ב-ADHD?',
      answer: 'כן, קיימים טיפולים יעילים ל-ADHD כולל טיפול תרופתי, טיפול התנהגותי, הדרכת הורים ותמיכה חינוכית. הטיפול מותאם אישית לכל מטופל.'
    },
    {
      question: 'בגיל איזה ניתן לבצע אבחון?',
      answer: 'ניתן לבצע אבחון ADHD החל מגיל 4-5 שנים. עם זאת, במקרים רבים האבחון מתבצע בגיל בית הספר היסודי כאשר הדרישות לריכוז גבוהות יותר.'
    },
    {
      question: 'כמה זמן לוקח האבחון?',
      answer: 'תהליך האבחון נמשך בדרך כלל 2-4 פגישות על פני מספר שבועות. הזמן תלוי במורכבות המקרה ובשיתוף הפעולה של המטופל והמשפחה.'
    }
  ] : [
    {
      question: 'What is ADHD?',
      answer: 'ADHD (Attention Deficit Hyperactivity Disorder) is a neurodevelopmental disorder affecting concentration, attention and impulse control. The disorder begins in childhood and can continue into adulthood.'
    },
    {
      question: 'What does the diagnosis process look like?',
      answer: 'The diagnosis process includes comprehensive interviews, standardized questionnaires, cognitive tests and sometimes brain imaging. The process takes several sessions and is performed by a professional team.'
    },
    {
      question: 'Is there treatment for ADHD?',
      answer: 'Yes, there are effective treatments for ADHD including medication, behavioral therapy, parent training and educational support. Treatment is personalized for each patient.'
    },
    {
      question: 'At what age can diagnosis be performed?',
      answer: 'ADHD diagnosis can be performed from age 4-5 years. However, in many cases diagnosis is made during elementary school age when concentration demands are higher.'
    },
    {
      question: 'How long does the diagnosis take?',
      answer: 'The diagnosis process usually takes 2-4 sessions over several weeks. The time depends on case complexity and cooperation of the patient and family.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {language === 'he' ? 'שאלות נפוצות' : 'Frequently Asked Questions'}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-muted/30 rounded-xl border-0 shadow-elegant px-6 hover-lift"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-foreground">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;