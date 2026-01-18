import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import logo from '@/assets/logo.png'
import doctorHero from '@/assets/doctor-hero.png'
import { useLanguage } from '@/hooks/useLanguage'
import EnhancedNavigation from './EnhancedNavigation'

const MedicalHero = () => {
  const { t, language } = useLanguage();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const typingTexts = language === 'he' 
    ? ['בילדים', 'בבני נוער', 'במבוגרים']
    : ['in Children', 'in Teens', 'in Adults'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [typingTexts.length]);

  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden" dir={language === 'he' ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <EnhancedNavigation />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-0 md:py-0 pt-24">
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          
          {/* Text Content - Left side on RTL */}
          <motion.div 
            className="xl:w-full md:w-2/3 order-1 px-2 sm:px-4 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-2xl md:text-4xl font-bold text-green-800 mb-4 whitespace-pre-line"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {language === 'he' ? 'ברוכים הבאים למרפאת\n"קשב פלוס"' : 'Welcome to\n"Keshev Plus" Clinic'}
            </motion.h1>
            
            {/* Logo */}
            <motion.img
              src={logo}
              alt="קשב פלוס"
              className="w-48 sm:w-64 md:w-72 lg:w-72 mb-2 md:mb-2 drop-shadow-lg mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {/* Typing Animation Text */}
            <motion.p 
              className="flex justify-center text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 flex-wrap text-center leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {language === 'he' ? 'אבחון וטיפול בהפרעות קשב וריכוז ' : 'Diagnosis and Treatment of ADHD '}
              <span className="relative inline-block whitespace-nowrap mx-2">
                {typingTexts.map((text, index) => (
                  <motion.span
                    key={index}
                    className="font-bold text-green-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: currentTextIndex === index ? 1 : 0,
                      y: currentTextIndex === index ? 0 : 10
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      position: index === currentTextIndex ? 'relative' : 'absolute',
                      top: 0,
                      right: language === 'he' ? 0 : 'auto',
                      left: language === 'en' ? 0 : 'auto'
                    }}
                  >
                    {text}
                  </motion.span>
                ))}
              </span>
            </motion.p>

            {/* Description */}
            <motion.p 
              className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {language === 'he' 
                ? 'ב"קשב פלוס" תקבלו אבחון מדויק\nותוכנית טיפול אישית'
                : 'At "Keshev Plus" you will receive accurate diagnosis\nand a personalized treatment plan'}
            </motion.p>

            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 text-gray-600 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {language === 'he' 
                ? 'צעד אחד קטן יכול לשנות את כל התמונה'
                : 'One small step can change the whole picture'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button 
                size="lg" 
                className="bg-green-800 hover:bg-green-900 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {language === 'he' ? 'התחילו אבחון עכשיו' : 'Start Diagnosis Now'}
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-orange-400 hover:bg-orange-500 text-white border-orange-400 hover:border-orange-500 font-semibold px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {language === 'he' ? 'קראו עוד עלינו' : 'Read More About Us'}
              </Button>
            </motion.div>
          </motion.div>

          {/* Doctor Image - Right side on RTL */}
          <motion.div 
            className="md:w-1/3 order-2 flex justify-center"
            initial={{ opacity: 0, x: language === 'he' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src={doctorHero}
              alt={language === 'he' ? 'רופאה מומחית' : 'Expert Doctor'}
              className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-3xl drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA Section - Green Gradient */}
      <motion.div 
        className="relative z-10 bg-gradient-to-r from-green-800 to-green-950 py-16 mt-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center px-4" dir={language === 'he' ? 'rtl' : 'ltr'}>
          <motion.h2 
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {language === 'he' ? 'מוכנים להתחיל?' : 'Ready to Start?'}
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {language === 'he' 
              ? 'צרו קשר עכשיו לקביעת פגישת ייעוץ ראשונית'
              : 'Contact us now to schedule an initial consultation'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg"
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-10 py-6 text-xl rounded-lg shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {language === 'he' ? 'צרו קשר עכשיו' : 'Contact Us Now'}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default MedicalHero
