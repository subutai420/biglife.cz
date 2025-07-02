import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calculator, Percent, Shield, Building, Banknote, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function InvestorsSection() {
  const [investment, setInvestment] = useState(100000);
  
  const monthlyReturn = (investment * 0.06) / 12;
  const yearlyReturn = investment * 0.06;

  const advantages = [
    {
      icon: Percent,
      title: 'Garantovaný roční výnos 6%',
      description: 'Výrazně vyšší než spořicí účty (0,5-2%) a stabilnější než podílové fondy s nejistým výnosem.'
    },
    {
      icon: Shield,
      title: 'Bezpečnost vaší investice',
      description: 'Každá investice je právně zajištěna smlouvou o půjčce s jasně definovanými právy a povinnostmi.'
    },
    {
      icon: Building,
      title: 'Investice do reálných aktiv',
      description: 'Vaše peníze jdou na nákup konkrétních nemovitostí - hmatatelnější a důvěryhodnější než abstraktní finanční produkty.'
    },
    {
      icon: Clock,
      title: 'Flexibilita a likvidita',
      description: 'Výpovědní lhůta pouze 2 měsíce - získáte své peníze zpět rychleji než u většiny investičních produktů.'
    },
    {
      icon: Banknote,
      title: 'Žádné skryté poplatky',
      description: 'Transparentní podmínky bez skrytých poplatků za správu, vstup nebo výstup z investice.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="pro-investory" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Pro investory</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proč investovat právě s námi? Zde jsou důvody, proč si vybrat naši investiční platformu.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Profit Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="card-hover glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Calculator className="h-5 w-5" />
                  </motion.div>
                  Kalkulačka zisku
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="investment-slider">Výše investice</Label>
                    <motion.span 
                      className="text-lg font-semibold text-blue-600"
                      key={investment}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {investment.toLocaleString('cs-CZ')} Kč
                    </motion.span>
                  </div>
                  <Slider
                    id="investment-slider"
                    min={50000}
                    max={1000000}
                    step={10000}
                    value={[investment]}
                    onValueChange={(value) => setInvestment(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>50 000 Kč</span>
                    <span>1 000 000 Kč</span>
                  </div>
                  <p className="text-sm text-gray-500">Minimální investice: 50 000 Kč</p>
                </div>
                
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 space-y-4 border border-blue-100 animate-pulse-glow"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Měsíční výnos:</span>
                    <motion.span 
                      className="text-lg font-semibold text-blue-600"
                      key={`monthly-${monthlyReturn}`}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {monthlyReturn.toLocaleString('cs-CZ')} Kč
                    </motion.span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Roční výnos:</span>
                    <motion.span 
                      className="text-xl font-bold text-green-600"
                      key={`yearly-${yearlyReturn}`}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {yearlyReturn.toLocaleString('cs-CZ')} Kč
                    </motion.span>
                  </div>
                  <div className="border-t border-blue-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">Celkem za rok:</span>
                      <motion.span 
                        className="text-xl font-bold text-gray-900"
                        key={`total-${investment + yearlyReturn}`}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {(investment + yearlyReturn).toLocaleString('cs-CZ')} Kč
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                    <a href="#kontakt">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Chci investovat
                    </a>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="card-hover glass-effect">
              <CardHeader>
                <CardTitle>Srovnání investičních možností</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Investice</th>
                        <th className="text-right py-2">Výnos</th>
                        <th className="text-right py-2">Riziko</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <motion.tr 
                        className="border-b"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <td className="py-2">Spořicí účet</td>
                        <td className="text-right py-2">0,5-2%</td>
                        <td className="text-right py-2">Nízké</td>
                      </motion.tr>
                      <motion.tr 
                        className="border-b"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <td className="py-2">Podílové fondy</td>
                        <td className="text-right py-2">-5% až +15%</td>
                        <td className="text-right py-2">Střední-vysoké</td>
                      </motion.tr>
                      <motion.tr 
                        className="border-b"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <td className="py-2">Dluhopisy</td>
                        <td className="text-right py-2">2-4%</td>
                        <td className="text-right py-2">Střední</td>
                      </motion.tr>
                      <motion.tr 
                        className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <td className="py-2 font-semibold">Naše platforma</td>
                        <td className="text-right py-2 font-semibold text-green-600">6%</td>
                        <td className="text-right py-2 font-semibold">Nízké</td>
                      </motion.tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Advantages Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {advantages.map((advantage, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="card-hover h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-full flex-shrink-0 shadow-lg"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 10
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <advantage.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="mb-2 text-gray-900">{advantage.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}