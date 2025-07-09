import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Save, RotateCcw } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { toast } from 'sonner@2.0.3';

export function ContactEditor() {
  const { content, updateContent } = useAdmin();
  const [formData, setFormData] = useState(content.contactInfo);

  const handleSave = () => {
    updateContent({ contactInfo: formData });
    toast.success('Kontaktní informace byly úspěšně uloženy!');
  };

  const handleReset = () => {
    setFormData(content.contactInfo);
    toast.info('Změny byly zrušeny');
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editace kontaktních informací</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+420 777 123 456"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="info@example.com"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Adresa</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Ulice, město, PSČ"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Název společnosti</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Název s.r.o."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="ico">IČO</Label>
            <Input
              id="ico"
              value={formData.ico}
              onChange={(e) => handleChange('ico', e.target.value)}
              placeholder="12345678"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dic">DIČ</Label>
            <Input
              id="dic"
              value={formData.dic}
              onChange={(e) => handleChange('dic', e.target.value)}
              placeholder="CZ12345678"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="registration">Zápis v OR</Label>
            <Input
              id="registration"
              value={formData.registration}
              onChange={(e) => handleChange('registration', e.target.value)}
              placeholder="OR Městský soud..."
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Uložit změny
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Zrušit změny
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}