import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <AboutSection />
        <PortfolioSection />
        <BlogSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Let's Create Something Amazing</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your ideas into exceptional digital experiences? 
              I'm here to help bring your vision to life with clean code and thoughtful design.
            </p>
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2024 Portfolio. Built with React, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
