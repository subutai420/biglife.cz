import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Building2 } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#uvod', label: 'Úvod' },
    { href: '#jak-to-funguje', label: 'Jak to funguje' },
    { href: '#pro-investory', label: 'Pro investory' },
    { href: '#nemovitosti', label: 'Naše nemovitosti' },
    { href: '#o-nas', label: 'O nás' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-black/5">
          <div className="flex justify-between items-center h-16 px-6">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                {/* Logo Icon Placeholder */}
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-primary">Biglife</h2>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-primary hover:bg-gray-100/60 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <Button className="bg-primary hover:bg-primary/90 shadow-sm" asChild>
                <a href="#kontakt">Stát se investorem</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100/60"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50">
              <div className="px-6 pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-primary hover:bg-gray-100/60 block px-3 py-2 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90" asChild>
                  <a href="#kontakt">Stát se investorem</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}