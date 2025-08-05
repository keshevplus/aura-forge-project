import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ClipboardList, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const ServicesSection = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: Brain,
      title: t('services.diagnosis'),
      description: t('services.diagnosis_desc'),
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: ClipboardList,
      title: t('services.treatment'),
      description: t('services.treatment_desc'),
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Users,
      title: t('services.counseling'),
      description: t('services.counseling_desc'),
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-background" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-lift shadow-elegant border-0 bg-gradient-to-br from-background to-muted/30">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-glow`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-12 gradient-text">
            {language === 'he' ? 'תהליך האבחון' : 'Diagnosis Process'}
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: language === 'he' ? 'יצירת קשר' : 'Contact', desc: language === 'he' ? 'פנייה ראשונית' : 'Initial Contact' },
              { step: '2', title: language === 'he' ? 'הערכה' : 'Assessment', desc: language === 'he' ? 'הערכה מקצועית' : 'Professional Assessment' },
              { step: '3', title: language === 'he' ? 'אבחון' : 'Diagnosis', desc: language === 'he' ? 'אבחון מקיף' : 'Comprehensive Diagnosis' },
              { step: '4', title: language === 'he' ? 'טיפול' : 'Treatment', desc: language === 'he' ? 'תוכנית טיפול' : 'Treatment Plan' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-primary opacity-30" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;