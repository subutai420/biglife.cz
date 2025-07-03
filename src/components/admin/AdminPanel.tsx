import { useAdmin } from '../../contexts/AdminContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Settings, Users, Building, MessageSquare, Mail } from 'lucide-react';

export function AdminPanel() {
  const { setIsAdminMode } = useAdmin();

  const handleExit = () => {
    setIsAdminMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <Button onClick={handleExit} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na web
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Obsah webu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Upravit texty, nadpisy a obsah stránek</p>
              <Button className="mt-4 w-full" disabled>
                Spravovat obsah
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Tým
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Spravovat členy týmu a jejich profily</p>
              <Button className="mt-4 w-full" disabled>
                Spravovat tým
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Nemovitosti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Přidat a upravit nemovitosti v portfoliu</p>
              <Button className="mt-4 w-full" disabled>
                Spravovat nemovitosti
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                FAQ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Upravit často kladené otázky</p>
              <Button className="mt-4 w-full" disabled>
                Spravovat FAQ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Kontaktní formulář
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Zobrazit odeslané zprávy</p>
              <Button className="mt-4 w-full" disabled>
                Spravovat zprávy
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800">
            <strong>Demo režim:</strong> Toto je zjednodušená verze admin panelu pro build testing. 
            Plná funkcionalita bude dostupná po dokončení migrace.
          </p>
        </div>
      </div>
    </div>
  );
}