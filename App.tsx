import { AdminProvider, useAdmin } from './contexts/AdminContext';
import { AdminPanel } from './components/admin/AdminPanel';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { InvestorsSection } from './components/InvestorsSection';
import { PropertiesSection } from './components/PropertiesSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { isAdminMode } = useAdmin();

  if (isAdminMode) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <InvestorsSection />
      <PropertiesSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
      <Toaster />
    </AdminProvider>
  );
}