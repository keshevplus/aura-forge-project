import React from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Calendar, MessageCircle } from 'lucide-react'
import professionalHeadshot from '@/assets/professional-headshot.jpg'

const MedicalHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background to-muted/20 overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">K+</span>
            </div>
            <span className="text-xl font-bold">Keshev Plus</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">אודותינו</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">שירותים</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">מה זה ADHD?</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">תהליך האבחון</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">שאלות נפוצות</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">יצירת קשר</a>
            <div className="flex items-center space-x-2 text-primary font-semibold">
              <Phone className="w-4 h-4" />
              <span>055-27-399-27</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right" dir="rtl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              ברוכים הבאים למרפאת
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                "קשב פלוס"
              </span>
            </h1>
            
            <div className="mb-8">
              <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary rounded-full p-1 mb-6">
                <div className="bg-background rounded-full px-6 py-2">
                  <span className="text-sm font-semibold">בילדים • בבני נוער • במבוגרים</span>
                </div>
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-4 leading-relaxed">
              ב"קשב פלוס" תקבלו אבחון מדויק
              <br />
              ותוכנית טיפול אישית
            </p>
            
            <p className="text-lg text-foreground mb-8 font-semibold">
              הצעד הראשון מתחיל כאן
            </p>
            
            <p className="text-muted-foreground mb-8">
              קבעו פגישת ייעוץ - בואו לגלות את הדרך להצלחה
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg"
              >
                קראו עוד עלינו
              </Button>
              <Button 
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
              >
                התחל/י את האבחון עכשיו
              </Button>
            </div>
          </div>

          {/* Professional Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src={professionalHeadshot}
                alt="רופא מקצועי"
                className="w-full max-w-md h-auto object-cover rounded-2xl shadow-strong"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 bg-primary py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4" dir="rtl">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            מוכנים להתחיל?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            פנה/י אלינו היום כדי לקבוע את האבחון שלך ולקחת את הצעד הראשון
            <br />
            לקראת חיים טובים יותר.
          </p>
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg"
          >
            צרו קשר עכשיו
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MedicalHero