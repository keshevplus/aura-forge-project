import React from 'react'
import { useAuth } from "@/components/auth/AuthProvider"
import { useLanguage } from "@/hooks/useLanguage"
import AdminLogin from "@/components/auth/AdminLogin"
import AdminDashboard from "@/components/admin/AdminDashboard"
import MedicalHero from "@/components/MedicalHero"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import ADHDInfoSection from "@/components/ADHDInfoSection"
import FAQSection from "@/components/FAQSection"
import ContactSection from "@/components/ContactSection"

const Index = () => {
  const { user, loading, isAdmin } = useAuth()
  const { t, language } = useLanguage()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show admin dashboard if user is logged in and is admin
  if (user && isAdmin) {
    return <AdminDashboard />
  }

  // Show login if user is logged in but not admin
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have admin privileges.</p>
        </div>
      </div>
    )
  }

  // Check if accessing admin route
  if (window.location.pathname === '/admin' || window.location.search.includes('admin')) {
    return <AdminLogin />
  }

  // Show main medical website
  return (
    <div className="min-h-screen">
      <MedicalHero />
      <AboutSection />
      <ServicesSection />
      <ADHDInfoSection />
      <section id="process" className="py-20 bg-muted/30" dir={language === 'he' ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            {language === 'he' ? 'תהליך האבחון המקצועי' : 'Professional Diagnosis Process'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'he' 
              ? 'תהליך מקיף ומקצועי הכולל הערכה רב-תחומית על ידי צוות מומחים'
              : 'Comprehensive and professional process including multidisciplinary assessment by expert team'
            }
          </p>
        </div>
      </section>
      <FAQSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="max-w-6xl mx-auto text-center" dir={language === 'he' ? 'rtl' : 'ltr'}>
          <p className="text-sm opacity-80">{t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  )
}

export default Index
