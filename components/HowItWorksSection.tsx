import { Phone, FileText, CreditCard, Home, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function HowItWorksSection() {
  const steps = [
    {
      icon: Phone,
      title: 'Kontakt a konzultace',
      description: 'Kontaktujte nás prostřednictvím formuláře nebo telefonu. Během konzultace vám vysvětlíme celý proces a zodpovíme všechny vaše otázky.'
    },
    {
      icon: FileText,
      title: 'Podpis smlouvy',
      description: 'Podepíšeme smlouvu o půjčce, která garantuje váš výnos 6% ročně. Smlouva obsahuje všechny podmínky a garance pro maximální transparentnost.'
    },
    {
      icon: CreditCard,
      title: 'Vaše investice',
      description: 'Převedete investiční částku (minimálně 50 000 Kč) na náš účet. Všechny převody jsou zabezpečené a dokumentované.'
    },
    {
      icon: Home,
      title: 'Akvizice nemovitosti',
      description: 'Naší odborní pracovníci aktivně vyhledávají a nakupují byty 2+1 a 3+1 v atraktivních lokalitách s vysokým potenciálem pronájmu.'
    },
    {
      icon: Users,
      title: 'Pronájem a generování zisku',
      description: 'Zajistíme pronájem bytu bonitním nájemcům - firmám i jednotlivcům. Pravidelný příjem z pronájmu generuje zisk pro investory.'
    },
    {
      icon: TrendingUp,
      title: 'Výplata úroků',
      description: 'Každý měsíc vám vyplácíme vaši část z generovaného zisku. Výplaty probíhají pravidelně a transparentně.'
    },
    {
      icon: ArrowLeft,
      title: 'Výběr investice',
      description: 'Kdykoli můžete investici ukončit s 2měsíční výpovědní lhůtou. Získáte zpět celou investovanou částku včetně poměrné části úroků.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="jak-to-funguje" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6">Jak to funguje</h2>
          
          {/* Visually separated intro texts */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Investování s námi je jednoduché a transparentní
              </h3>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                Detailní a transparentní popis celého procesu investování krok za krokem.
              </p>
              <p className="text-xl font-medium text-blue-900 mt-2">
                Stačí tři kroky k vašemu pasivnímu příjmu.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Compact desktop grid layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 card-hover group border border-gray-100"
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  {/* Step number badge */}
                  <motion.div 
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-sm font-semibold px-2 py-1 rounded-full shadow-md"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-700 transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
            <TrendingUp className="h-4 w-4" />
            Začněte investovat ještě dnes a zajistěte si pasivní příjem
          </div>
        </motion.div>
      </div>
    </section>
  );
}