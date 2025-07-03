import { useState } from 'react';
import { Button } from './ui/button';
import { Calculator, Shield, TrendingUp } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { motion } from 'framer-motion';

export function HeroSection() {
  const { content } = useAdmin();
  const { heroContent } = content;

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heroContent.title}
          </motion.h1>
          
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-5xl md:text-6xl font-bold">
              {heroContent.subtitle}
            </span>
            <span className="block text-lg text-gray-600 mt-2">
              {heroContent.highlightText}
            </span>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {heroContent.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg" asChild>
                <a href="#kontakt">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  {heroContent.ctaText}
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 hover:bg-blue-50" asChild>
                <a href="#jak-to-funguje">
                  <Calculator className="mr-2 h-5 w-5" />
                  Jak to funguje
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            {
              icon: Shield,
              title: 'Bezpečné investování',
              description: 'Všechny investice jsou právně zajištěné smlouvou o půjčce'
            },
            {
              icon: TrendingUp,
              title: 'Garantovaný výnos',
              description: 'Pevný výnos 6% ročně bez skrytých poplatků'
            },
            {
              icon: Calculator,
              title: 'Transparentnost',
              description: 'Pravidelné reporty a přehled o vašich investicích'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-2xl p-6 text-center card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}