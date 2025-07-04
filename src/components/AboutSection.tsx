import { Card, CardContent } from './ui/card';
import { Building, Users, Award, Target } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAdmin } from '../contexts/AdminContext';
import { motion } from 'framer-motion';

export function AboutSection() {
  const { content } = useAdmin();
  const { teamMembers, aboutText, companyValues, contactInfo } = content;

  const values = [
    {
      icon: Target,
      title: companyValues.mission.title,
      description: companyValues.mission.description
    },
    {
      icon: Building,
      title: companyValues.experience.title,
      description: companyValues.experience.description
    },
    {
      icon: Users,
      title: companyValues.trust.title,
      description: companyValues.trust.description
    },
    {
      icon: Award,
      title: companyValues.transparency.title,
      description: companyValues.transparency.description
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="o-nas" className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6">O nás</h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {aboutText}
          </motion.p>
        </motion.div>

        {/* Company Values */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="card-hover h-full group">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <value.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="mb-3 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center mb-12">Náš tým</h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={member.id} variants={cardVariants}>
                <Card className="card-hover h-full group overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="relative mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-24 h-24 mx-auto relative">
                        <ImageWithFallback
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>
                    
                    <motion.h4 
                      className="mb-1 text-gray-900 group-hover:text-blue-700 transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {member.name}
                    </motion.h4>
                    
                    <motion.p 
                      className="text-blue-600 mb-3 font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {member.position}
                    </motion.p>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {member.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Company Info */}
        <motion.div 
          className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-8 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3 
            className="text-center mb-8 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Firemní údaje
          </motion.h3>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gray-700"><strong className="text-gray-900">Název:</strong> {contactInfo.companyName}</p>
              <p className="text-gray-700"><strong className="text-gray-900">IČO:</strong> {contactInfo.ico}</p>
              <p className="text-gray-700"><strong className="text-gray-900">DIČ:</strong> {contactInfo.dic}</p>
            </motion.div>
            
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-700"><strong className="text-gray-900">Sídlo:</strong> {contactInfo.address}</p>
              <p className="text-sm text-gray-600 mt-3">
                <strong className="text-gray-800">Zápis:</strong> {contactInfo.registration}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}