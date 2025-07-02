import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { useAdmin } from '../contexts/AdminContext';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, ArrowRight } from 'lucide-react';

export function FAQSection() {
  const { content } = useAdmin();
  const { faqs } = content;

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
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Často kladené dotazy</h2>
          <p className="text-xl text-gray-600">
            Odpovědi na nejčastější otázky našich investorů
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={faq.id} variants={itemVariants}>
                <AccordionItem 
                  value={`item-${faq.id}`}
                  className="bg-white rounded-xl px-6 border-0 shadow-sm hover:shadow-md transition-all duration-300 card-hover overflow-hidden group"
                >
                  <AccordionTrigger className="text-left py-6 hover:no-underline group-hover:text-blue-700 transition-colors duration-300">
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="bg-blue-100 p-2 rounded-full mt-1 group-hover:bg-blue-200 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <MessageCircleQuestion className="h-4 w-4 text-blue-600" />
                      </motion.div>
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600 leading-relaxed ml-11">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="mb-4 text-gray-900">Nenašli jste odpověď na svou otázku?</h3>
            
            <motion.a 
              href="#kontakt" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all duration-300"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Kontaktujte nás přímo
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}