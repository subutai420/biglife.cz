import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image: string;
}

export interface Property {
  id: string;
  type: string;
  location: string;
  description: string;
  image: string;
  status: 'Pronajato' | 'Akvizice' | 'Připravujeme';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  highlightText: string;
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
  mission: { title: string; description: string };
  experience: { title: string; description: string };
  trust: { title: string; description: string };
  transparency: { title: string; description: string };
}

export interface ContentState {
  teamMembers: TeamMember[];
  properties: Property[];
  faqs: FAQ[];
  heroContent: HeroContent;
  aboutText: string;
  contactInfo: ContactInfo;
  companyValues: CompanyValues;
}

interface AdminContextType {
  isAdminMode: boolean;
  toggleAdminMode: (password?: string) => boolean;
  content: ContentState;
  updateContent: (newContent: Partial<ContentState>) => void;
}

const defaultContent: ContentState = {
  teamMembers: [
    {
      id: '1',
      name: 'Ing. Pavel Novák',
      position: 'Ředitel společnosti',
      description: 'S více než 15 lety zkušeností v realitním sektoru vede naši společnost k úspěchu.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2', 
      name: 'Mgr. Jana Svobodová',
      position: 'Investiční poradkyně',
      description: 'Specialistka na investiční strategie s certifikací pro finanční poradenství.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Bc. Martin Procházka', 
      position: 'Správce nemovitostí',
      description: 'Zajišťuje profesionální správu našeho portfolia nemovitostí a vztahy s nájemci.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ],
  properties: [
    {
      id: '1',
      type: 'Byt 2+1',
      location: 'Praha 6 - Dejvice',
      description: 'Moderní byt v klidné části Dejvic, výborná dostupnost do centra.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      status: 'Pronajato'
    },
    {
      id: '2', 
      type: 'Byt 3+1',
      location: 'Brno - Žabovřesky',
      description: 'Prostorný byt s balkonem, ideální pro rodiny.',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      status: 'Akvizice'
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'Jaká je minimální výše investice?',
      answer: 'Minimální investice činí 50 000 Kč. Tato částka nám umožňuje efektivně spravovat vaše prostředky a zajistit slíbený výnos.'
    },
    {
      id: '2',
      question: 'Jak často dostávám výnosy z investice?',
      answer: 'Výnosy vyplácíme každý měsíc na váš účet. První výplata proběhne měsíc po úspěšném investování vaších prostředků.'
    },
    {
      id: '3',
      question: 'Mohu svou investici předčasně ukončit?',
      answer: 'Ano, investici můžete ukončit s dvouměsíční výpovědní lhůtou. Po uplynutí této lhůty vám vrátíme celou investovanou částku včetně poměrné části úroků.'
    }
  ],
  heroContent: {
    title: 'Investice do nemovitostí s garantovaným výnosem',
    subtitle: '6% ročně',
    description: 'Necháte své peníze vydělávat prostřednictvím investic do nemovitostí. Bezpečné, transparentní a ziskové.',
    ctaText: 'Chci investovat',
    highlightText: 'Garantované výnosy'
  },
  aboutText: 'Jsme specializovaná firma zaměřená na investice do nemovitostí s dlouhodobou tradicí a prokázanými výsledky. Naše mise je jednoduchá - pomoci našim klientům zhodnotit jejich úspory prostřednictvím bezpečných a výnosných investic do realitního trhu.',
  contactInfo: {
    phone: '+420 123 456 789',
    email: 'dan.bubak@gmail.com',
    address: 'Václavské náměstí 123, 110 00 Praha 1',
    companyName: 'Biglife Investment s.r.o.',
    ico: '12345678',
    dic: 'CZ12345678',
    registration: 'Zapsána v obchodním rejstříku vedeném Městským soudem v Praze, oddíl C, vložka 12345'
  },
  companyValues: {
    mission: {
      title: 'Naše mise',
      description: 'Poskytovat bezpečné a výnosné investiční příležitosti v oblasti nemovitostí.'
    },
    experience: {
      title: 'Zkušenosti',
      description: 'Více než 10 let zkušeností na realitním trhu a stovky spokojených investorů.'
    },
    trust: {
      title: 'Důvěra',
      description: 'Budujeme dlouhodobé vztahy založené na transparentnosti a dodržování závazků.'
    },
    transparency: {
      title: 'Transparentnost',
      description: 'Poskytujeme jasné informace o investicích a pravidelné reporty o výnosech.'
    }
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [content, setContent] = useState<ContentState>(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('biglife_content');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setContent({ ...defaultContent, ...parsedContent });
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  // Save content to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('biglife_content', JSON.stringify(content));
  }, [content]);

  const toggleAdminMode = (password?: string): boolean => {
    if (!isAdminMode) {
      // Entering admin mode - check password
      if (password === 'admin123') {
        setIsAdminMode(true);
        return true;
      }
      return false;
    } else {
      // Exiting admin mode - no password needed
      setIsAdminMode(false);
      return true;
    }
  };

  const updateContent = (newContent: Partial<ContentState>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  return (
    <AdminContext.Provider value={{
      isAdminMode,
      toggleAdminMode,
      content,
      updateContent
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