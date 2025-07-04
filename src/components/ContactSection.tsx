import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Phone, Mail, MapPin, Send, Loader2, Clock, Building } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { toast } from 'sonner@2.0.3';
import { motion } from 'framer-motion';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'failed';
}

export function ContactSection() {
  const { content } = useAdmin();
  const { contactInfo } = content;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Jméno je povinné';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Jméno musí mít alespoň 2 znaky';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail je povinný';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Neplatný formát e-mailu';
    }

    // Validate phone (optional but if provided, should be valid)
    if (formData.phone.trim()) {
      const phoneRegex = /^(\+420)?[0-9\s]{9,}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Neplatné telefonní číslo';
      }
    }

    // Validate message (optional but if provided, should have minimum length)
    if (formData.message.trim() && formData.message.trim().length < 10) {
      newErrors.message = 'Zpráva musí mít alespoň 10 znaků';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveSubmissionLocally = (submission: FormSubmission) => {
    try {
      const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      existingSubmissions.push(submission);
      localStorage.setItem('contact_submissions', JSON.stringify(existingSubmissions));
    } catch (error) {
      console.error('Failed to save submission locally:', error);
    }
  };

  const sendViaFormspree = async (): Promise<boolean> => {
    try {
      // Using Formspree with dan.bubak@gmail.com
      const response = await fetch('https://formspree.io/f/xpzgorkz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message || 'No message provided',
          _replyto: formData.email,
          _subject: `Nová zpráva z Biglife od ${formData.name}`,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Formspree submission failed:', error);
      return false;
    }
  };

  const sendDirectEmail = async (): Promise<boolean> => {
    try {
      // Create a mailto link that opens the user's email client
      const subject = encodeURIComponent(`Nová zpráva z Biglife od ${formData.name}`);
      const body = encodeURIComponent(`
Ahoj,

Máte novou zprávu z kontaktního formuláře na webu Biglife:

Jméno: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone || 'Not provided'}

Zpráva:
${formData.message || 'No message provided'}

---
Tato zpráva byla odeslána z webu Biglife.
      `);
      
      // Create hidden mailto link and click it
      const mailtoLink = `mailto:dan.bubak@gmail.com?subject=${subject}&body=${body}`;
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Direct email failed:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Prosím opravte chyby ve formuláři');
      return;
    }

    setIsSubmitting(true);
    
    const submission: FormSubmission = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: new Date().toLocaleString('cs-CZ'),
      status: 'failed'
    };

    try {
      // Try Formspree first (most reliable)
      let success = await sendViaFormspree();
      
      if (success) {
        submission.status = 'sent';
        saveSubmissionLocally(submission);
        
        toast.success('Děkujeme za váš zájem! Brzy se vám ozveme.', {
          description: 'Vaše zpráva byla odeslána na dan.bubak@gmail.com'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});
      } else {
        // Fallback to mailto (opens email client)
        await sendDirectEmail();
        submission.status = 'sent';
        saveSubmissionLocally(submission);
        
        toast.success('Email klient byl otevřen', {
          description: 'Dokončete odeslání ve vašem emailovém klientovi'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});
      }
    } catch (error) {
      saveSubmissionLocally(submission);
      toast.error('Nepodařilo se odeslat zprávu automaticky', {
        description: 'Zpráva byla uložena lokálně. Kontaktujte nás prosím přímo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const contactCardsVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
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
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="card-hover glass-effect">
              <CardHeader>
                <CardTitle>Máte zájem o investici?</CardTitle>
                <motion.p 
                  className="text-sm text-green-600"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  ✅ Zprávy jsou odesílány na: dan.bubak@gmail.com
                </motion.p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="name">Jméno a příjmení *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 transition-all duration-200 ${errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <motion.p 
                        className="text-sm text-red-500 mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 transition-all duration-200 ${errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <motion.p 
                        className="text-sm text-red-500 mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`mt-1 transition-all duration-200 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                      placeholder="+420 123 456 789"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <motion.p 
                        className="text-sm text-red-500 mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="message">Vaše zpráva</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Napište nám o své investiční záměry nebo položte otázku..."
                      className={`mt-1 transition-all duration-200 ${errors.message ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <motion.p 
                        className="text-sm text-red-500 mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Odesílání na dan.bubak@gmail.com...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Odeslat zprávu
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            variants={contactCardsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="mb-6">Přímé kontakty</h3>
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-md">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Telefon</p>
                        <a 
                          href={`tel:${contactInfo.phone}`} 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-md">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">E-mail</p>
                        <a 
                          href={`mailto:${contactInfo.email}`} 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-md">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Adresa</p>
                        <p className="text-gray-600">{contactInfo.address}</p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
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
                  <p className="mt-4 text-sm text-gray-500">
                    Doporučujeme si předem domluvit schůzku telefonicky nebo e-mailem.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
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
                    <p className="mt-2 text-sm">
                      {contactInfo.registration}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Email Status Info */}
            <motion.div variants={itemVariants}>
              <Card className="border-green-200 bg-green-50 card-hover">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-green-800">📧 Odesílání emailů</h3>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>✅ Aktivní metody:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Formspree (automatické odesílání)</li>
                      <li>Mailto fallback (otevře email klient)</li>
                      <li>Lokální uložení (admin panel)</li>
                    </ul>
                    <p className="mt-3 text-xs">
                      Všechny zprávy jsou odesílány na <strong>dan.bubak@gmail.com</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}