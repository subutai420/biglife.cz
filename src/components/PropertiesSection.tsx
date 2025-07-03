import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Home, CheckCircle, Clock, TrendingUp, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAdmin } from '../contexts/AdminContext';
import { motion } from 'framer-motion';

export function PropertiesSection() {
  const { content } = useAdmin();
  const { properties } = content;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pronajato': return 'bg-green-100 text-green-800';
      case 'Akvizice': return 'bg-orange-100 text-orange-800';
      case 'Připravujeme': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { label: 'Celkem nemovitostí', value: properties.length.toString(), icon: Building2 },
    { label: 'Úspěšně pronajato', value: properties.filter(p => p.status === 'Pronajato').length.toString(), icon: CheckCircle },
    { label: 'Průměrná doba pronájmu', value: '14 dní', icon: Clock },
    { label: 'Obsazenost', value: '98%', icon: TrendingUp }
  ];

  return (
    <section id="nemovitosti" className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Naše nemovitosti</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Přehled našeho portfolia nemovitostí, které generují stabilní výnosy pro naše investory.
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center bg-white rounded-xl p-6 shadow-sm card-hover border border-gray-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-3">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {properties.map((property, index) => (
            <Card key={property.id} className="overflow-hidden card-hover h-full group">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={property.image}
                  alt={`${property.type} ${property.location}`}
                  className="w-full h-48 object-cover group-hover:brightness-105 transition-all duration-300"
                />
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {property.status === 'Pronajato' && <CheckCircle className="w-3 h-3 mr-1 inline" />}
                  {property.status === 'Akvizice' && <Clock className="w-3 h-3 mr-1 inline" />}
                  {property.status === 'Připravujeme' && <Clock className="w-3 h-3 mr-1 inline" />}
                  {property.status}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{property.location}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Home className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">{property.type}</span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{property.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-sm font-medium text-green-700">6% p.a. výnos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300">
            <Building2 className="mr-2 h-4 w-4" />
            Zobrazit všechny nemovitosti
          </Button>
        </div>
      </div>
    </section>
  );
}