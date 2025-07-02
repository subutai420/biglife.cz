import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Home, Info, Building, Users, HelpCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#jak-to-funguje', label: 'Jak to funguje', icon: Info },
    { href: '#pro-investory', label: 'Pro investory', icon: Home },
    { href: '#nemovitosti', label: 'Nemovitosti', icon: Building },
    { href: '#o-nas', label: 'O nás', icon: Users },
    { href: '#faq', label: 'FAQ', icon: HelpCircle },
    { href: '#kontakt', label: 'Kontakt', icon: Phone },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glass-effect backdrop-blur-md border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Biglife</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 px-3 py-2 rounded-lg font-medium"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-white/20">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavClick(item.href)}
                      className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 px-4 py-3 rounded-lg font-medium"
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}