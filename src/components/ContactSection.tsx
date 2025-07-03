import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Phone, Mail, MapPin, Send, Loader2, Clock, Building } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { motion } from 'framer-motion';

export function ContactSection() {
  const { content } = useAdmin();
  const { contactInfo } = content;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple stub implementation for demo
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Zpráva odeslána (demo)');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="kontakt" className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Kontakt</h2>
          <p className="text-xl text-gray-600">
            Jste připraveni nechat své peníze vydělávat? Kontaktujte nás ještě dnes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="card-hover glass-effect">
              <CardHeader>
                <CardTitle>Máte zájem o investici?</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Jméno a příjmení *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+420 123 456 789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Vaše zpráva</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Napište nám o své investiční záměry nebo položte otázku..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Odesílání...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Odeslat zprávu
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="mb-6">Přímé kontakty</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-md">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Telefon</p>
                      <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:text-blue-800">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-md">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">E-mail</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-800">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-md">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Adresa</p>
                      <p className="text-gray-600">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3>Úřední hodiny</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Pondělí - Pátek:</strong> 9:00 - 17:00</p>
                  <p><strong>Sobota:</strong> 9:00 - 12:00</p>
                  <p><strong>Neděle:</strong> Zavřeno</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h3>Fakturační údaje</h3>
                </div>
                <div className="space-y-1 text-gray-600">
                  <p><strong>{contactInfo.companyName}</strong></p>
                  <p>IČO: {contactInfo.ico}</p>
                  <p>DIČ: {contactInfo.dic}</p>
                  <p>{contactInfo.address}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}