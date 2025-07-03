import { Building2, Mail, Phone } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export function Footer() {
  const { content } = useAdmin();
  const { contactInfo } = content;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-gray-900" />
              </div>
              <h3>Biglife</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Investujte do nemovitostí s garantovaným výnosem 6% ročně. 
              Bezpečně, transparentně a s minimální investicí 50 000 Kč.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">{contactInfo.email}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4">Rychlé odkazy</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#uvod" className="hover:text-white transition-colors">Úvod</a></li>
              <li><a href="#jak-to-funguje" className="hover:text-white transition-colors">Jak to funguje</a></li>
              <li><a href="#pro-investory" className="hover:text-white transition-colors">Pro investory</a></li>
              <li><a href="#nemovitosti" className="hover:text-white transition-colors">Naše nemovitosti</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4">Informace</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#o-nas" className="hover:text-white transition-colors">O nás</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center md:text-left text-gray-400">
            <p>&copy; 2025 {contactInfo.companyName} Všechna práva vyhrazena.</p>
            <p className="mt-2 text-sm">
              IČO: {contactInfo.ico} | {contactInfo.registration}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}