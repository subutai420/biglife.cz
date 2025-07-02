import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Home, 
  Building, 
  Users, 
  HelpCircle, 
  Phone, 
  Info,
  Eye,
  Save,
  MessageSquare
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { HeroEditor } from './HeroEditor';
import { PropertiesEditor } from './PropertiesEditor';
import { TeamEditor } from './TeamEditor';
import { FAQEditor } from './FAQEditor';
import { ContactEditor } from './ContactEditor';
import { AboutEditor } from './AboutEditor';
import { ContactSubmissionsViewer } from './ContactSubmissionsViewer';

export function AdminPanel() {
  const { setIsAdminMode } = useAdmin();
  const [activeTab, setActiveTab] = useState('hero');

  const tabs = [
    { value: 'hero', label: 'Hlavní stránka', icon: Home },
    { value: 'properties', label: 'Nemovitosti', icon: Building },
    { value: 'team', label: 'Tým', icon: Users },
    { value: 'faq', label: 'FAQ', icon: HelpCircle },
    { value: 'contact', label: 'Kontakt', icon: Phone },
    { value: 'messages', label: 'Zprávy', icon: MessageSquare },
    { value: 'about', label: 'O nás', icon: Info }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-2xl font-bold">Administrace webu</h1>
              <p className="text-gray-600">Správa obsahu a nemovitostí</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsAdminMode(false)}>
                <Eye className="w-4 h-4 mr-2" />
                Zobrazit web
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 h-auto p-1">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="flex flex-col items-center gap-1 py-3"
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-xs">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="hero">
            <HeroEditor />
          </TabsContent>

          <TabsContent value="properties">
            <PropertiesEditor />
          </TabsContent>

          <TabsContent value="team">
            <TeamEditor />
          </TabsContent>

          <TabsContent value="faq">
            <FAQEditor />
          </TabsContent>

          <TabsContent value="contact">
            <ContactEditor />
          </TabsContent>

          <TabsContent value="messages">
            <ContactSubmissionsViewer />
          </TabsContent>

          <TabsContent value="about">
            <AboutEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}