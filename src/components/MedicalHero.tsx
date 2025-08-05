import React from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Calendar, MessageCircle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import professionalHeadshot from '@/assets/professional-headshot.jpg'
import { useLanguage } from '@/hooks/useLanguage'
import EnhancedNavigation from './EnhancedNavigation'

const MedicalHero = () => {
  const { t, language } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-secondary opacity-10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-bounce" />
      </div>
      
      {/* Navigation */}
      <EnhancedNavigation />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className={`text-center ${language === 'he' ? 'lg:text-right' : 'lg:text-left'}`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('hero.title')}
              <br />
              <span className="gradient-text relative">
                {t('hero.clinic')}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
              </span>
            </motion.h1>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="inline-flex items-center bg-gradient-primary rounded-full p-1 mb-6 shadow-glow">
                <div className="bg-background rounded-full px-6 py-3">
                  <span className="text-sm font-semibold">{t('hero.subtitle')}</span>
                </div>
              </div>
            </motion.div>

            <motion.p 
              className="text-xl lg:text-2xl text-muted-foreground mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t('hero.description').split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </motion.p>
            
            <motion.p 
              className="text-lg text-foreground mb-8 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t('hero.step')}
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {t('hero.consultation')}
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className={`flex flex-col sm:flex-row gap-4 ${language === 'he' ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg hover-lift shadow-elegant"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.read_more')}
              </Button>
              <Button 
                variant="default"
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg hover-lift shadow-glow"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.start_diagnosis')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Professional Image */}
          <motion.div 
            className={`flex justify-center ${language === 'he' ? 'lg:justify-start' : 'lg:justify-end'}`}
            initial={{ opacity: 0, x: language === 'he' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <img
                src={professionalHeadshot}
                alt={language === 'he' ? 'רופא מקצועי' : 'Professional Doctor'}
                className="relative w-full max-w-md h-auto object-cover rounded-2xl shadow-strong hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl" />
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full shadow-glow"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full shadow-glow"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Bottom CTA Section */}
      <motion.div 
        className="relative z-10 bg-gradient-primary py-20 mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4" dir={language === 'he' ? 'rtl' : 'ltr'}>
          <motion.h2 
            className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('hero.ready_title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-primary-foreground/90 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('hero.ready_text').split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg hover-lift shadow-elegant"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.contact_now')}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default MedicalHero