import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types for all content
export interface Property {
  id: number;
  image: string;
  location: string;
  type: string;
  status: 'Pronajato' | 'Akvizice' | 'Připravujeme';
  description: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  companyName: string;
  ico: string;
  dic: string;
  registration: string;
}

export interface CompanyValues {
  mission: { title: string; description: string; };
  experience: { title: string; description: string; };
  trust: { title: string; description: string; };
  transparency: { title: string; description: string; };
}

export interface WebsiteContent {
  hero: HeroContent;
  properties: Property[];
  teamMembers: TeamMember[];
  faqs: FAQ[];
  contactInfo: ContactInfo;
  companyValues: CompanyValues;
  aboutText: string;
}

interface AdminContextType {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  content: WebsiteContent;
  updateContent: (newContent: Partial<WebsiteContent>) => void;
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: number, property: Partial<Property>) => void;
  deleteProperty: (id: number) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: number, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: number) => void;
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: number, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: number) => void;
}

const defaultContent: WebsiteContent = {
  hero: {
    title: 'Zhodnoťte své peníze o 6 % ročně. Investujte s námi do reálných nemovitostí.',
    subtitle: 'Garantujeme stabilní výnos a bezpečí vaší investice podložené smlouvou. Vaše peníze pracují pro vás.',
    ctaPrimary: 'Zjistit více',
    ctaSecondary: 'Stát se investorem'
  },
  properties: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&h=300&fit=crop',
      location: 'Hradec Králové',
      type: 'Byt 3+1',
      status: 'Pronajato',
      description: 'Moderní byt v klidné lokalitě s výbornou dostupností do centra města.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      location: 'Pardubice',
      type: 'Byt 2+1',
      status: 'Pronajato',
      description: 'Zrekonstruovaný byt blízko centra s velkým balkonem a garážovým stáním.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop',
      location: 'České Budějovice',
      type: 'Byt 3+1',
      status: 'Akvizice',
      description: 'Prostorný byt v nové zástavbě s moderním vybavením a parkováním.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      location: 'Liberec',
      type: 'Byt 2+1',
      status: 'Připravujeme',
      description: 'Investiční příležitost v rostoucí lokalitě s vysokým potenciálem.'
    }
  ],
  teamMembers: [
    {
      id: 1,
      name: 'Petr Svoboda',
      position: 'Jednatel společnosti',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      description: '15 let zkušeností v oblasti nemovitostí a financí. Absolvent VŠE Praha.'
    },
    {
      id: 2,
      name: 'Jana Nováková',
      position: 'Manažerka akvizic',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      description: 'Specialistka na vyhledávání a hodnocení investičních nemovitostí s 10letou praxí.'
    },
    {
      id: 3,
      name: 'Tomáš Procházka',
      position: 'Správce portfolia',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      description: 'Odborník na správu nemovitostí a komunikaci s nájemníky. Certifikovaný realitní makléř.'
    }
  ],
  faqs: [
    {
      id: 1,
      question: 'Jak přesně je moje investice zajištěna?',
      answer: 'Vaše investice je zajištěna smlouvou o půjčce, která je právně závazná a definuje jasné podmínky vrácení vaší investice včetně úroků. Každá smlouva je podložena konkrétní nemovitostí v našem portfoliu.'
    },
    {
      id: 2,
      question: 'Jaká jsou rizika spojená s investicí?',
      answer: 'Hlavní rizika zahrnují pokles cen nemovitostí, prázdnost bytu nebo platební neschopnost společnosti. Tato rizika minimalizujeme pečlivým výběrem nemovitostí, diverzifikací portfolia a udržováním finančních rezerv. Investice není pojištěna státem jako bankovní vklady.'
    },
    {
      id: 3,
      question: 'Musím zisk nějak danit?',
      answer: 'Ano, zisk z investice podléhá dani z příjmů podle platné legislativy. Doporučujeme konzultaci s daňovým poradcem. Na konci roku vám poskytneme potřebné dokumenty pro daňové přiznání.'
    }
  ],
  contactInfo: {
    phone: '+420 777 123 456',
    email: 'info@biglife.cz',
    address: 'Václavské náměstí 1, 110 00 Praha 1',
    companyName: 'Biglife s.r.o.',
    ico: '12345678',
    dic: 'CZ12345678',
    registration: 'OR Městský soud v Praze, oddíl C, vložka 98765'
  },
  companyValues: {
    mission: {
      title: 'Naše mise',
      description: 'Chceme, aby vaše peníze pracovaly pro vás, ne vy pro peníze. Poskytujeme stabilní a transparentní investiční příležitosti.'
    },
    experience: {
      title: 'Zkušenosti',
      description: 'Více než 50 úspěšně realizovaných investic do nemovitostí s celkovou hodnotou přes 100 milionů korun.'
    },
    trust: {
      title: 'Důvěra klientů',
      description: 'Spolupracujeme s více než 200 spokojených investorů, kteří nám důvěřují své úspory.'
    },
    transparency: {
      title: 'Transparentnost',
      description: 'Veškeré investice jsou podložené smlouvami a pravidelně reportujeme o stavu portfolia.'
    }
  },
  aboutText: 'Jsme tým odborníků s dlouholetými zkušenostmi v oblasti nemovitostí a investic. Naším cílem je poskytovat našim klientům stabilní a bezpečné investiční příležitosti.'
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [content, setContent] = useState<WebsiteContent>(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('websiteContent', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: Partial<WebsiteContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = { ...property, id: Date.now() };
    setContent(prev => ({
      ...prev,
      properties: [...prev.properties, newProperty]
    }));
  };

  const updateProperty = (id: number, property: Partial<Property>) => {
    setContent(prev => ({
      ...prev,
      properties: prev.properties.map(p => p.id === id ? { ...p, ...property } : p)
    }));
  };

  const deleteProperty = (id: number) => {
    setContent(prev => ({
      ...prev,
      properties: prev.properties.filter(p => p.id !== id)
    }));
  };

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now() };
    setContent(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember]
    }));
  };

  const updateTeamMember = (id: number, member: Partial<TeamMember>) => {
    setContent(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(m => m.id === id ? { ...m, ...member } : m)
    }));
  };

  const deleteTeamMember = (id: number) => {
    setContent(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m.id !== id)
    }));
  };

  const addFAQ = (faq: Omit<FAQ, 'id'>) => {
    const newFAQ = { ...faq, id: Date.now() };
    setContent(prev => ({
      ...prev,
      faqs: [...prev.faqs, newFAQ]
    }));
  };

  const updateFAQ = (id: number, faq: Partial<FAQ>) => {
    setContent(prev => ({
      ...prev,
      faqs: prev.faqs.map(f => f.id === id ? { ...f, ...faq } : f)
    }));
  };

  const deleteFAQ = (id: number) => {
    setContent(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== id)
    }));
  };

  return (
    <AdminContext.Provider value={{
      isAdminMode,
      setIsAdminMode,
      content,
      updateContent,
      addProperty,
      updateProperty,
      deleteProperty,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addFAQ,
      updateFAQ,
      deleteFAQ
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}