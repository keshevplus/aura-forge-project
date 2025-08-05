import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const EnhancedNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#adhd', label: t('nav.adhd') },
    { href: '#process', label: t('nav.process') },
    { href: '#faq', label: t('nav.faq') },
    { href: '#contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'he' ? 'en' : 'he');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-elegant border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-lg">K+</span>
            </div>
            <span className="text-xl font-bold gradient-text">Keshev Plus</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-all duration-300 relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
            
            {/* Phone */}
            <div className="flex items-center space-x-2 text-primary font-semibold bg-primary/10 px-4 py-2 rounded-full">
              <Phone className="w-4 h-4" />
              <span>055-27-399-27</span>
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hover-lift"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language.toUpperCase()}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hover-lift"
            >
              <Globe className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover-lift"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-background/95 backdrop-blur-md rounded-lg border border-border shadow-elegant"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-right px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex items-center justify-center space-x-2 text-primary font-semibold">
                    <Phone className="w-4 h-4" />
                    <span>055-27-399-27</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default EnhancedNavigation;