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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {aboutText}
          </p>
        </motion.div>

        {/* Company Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => (
            <Card key={index} className="card-hover h-full group">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-center mb-12">Náš tým</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="card-hover h-full group overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto relative mb-4">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover shadow-lg"
                    />
                  </div>
                  
                  <h4 className="mb-1 text-gray-900">{member.name}</h4>
                  <p className="text-blue-600 mb-3 font-medium">{member.position}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-center mb-8 text-gray-900">Firemní údaje</h3>
          
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            <div className="space-y-2">
              <p className="text-gray-700"><strong className="text-gray-900">Název:</strong> {contactInfo.companyName}</p>
              <p className="text-gray-700"><strong className="text-gray-900">IČO:</strong> {contactInfo.ico}</p>
              <p className="text-gray-700"><strong className="text-gray-900">DIČ:</strong> {contactInfo.dic}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-700"><strong className="text-gray-900">Sídlo:</strong> {contactInfo.address}</p>
              <p className="text-sm text-gray-600 mt-3">
                <strong className="text-gray-800">Zápis:</strong> {contactInfo.registration}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}