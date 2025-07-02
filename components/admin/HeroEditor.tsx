import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Save, RotateCcw } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { toast } from 'sonner@2.0.3';

export function HeroEditor() {
  const { content, updateContent } = useAdmin();
  const [formData, setFormData] = useState(content.hero);

  const handleSave = () => {
    updateContent({ hero: formData });
    toast.success('Hlavní sekce byla úspěšně uložena!');
  };

  const handleReset = () => {
    setFormData(content.hero);
    toast.info('Změny byly zrušeny');
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editace hlavní sekce (Hero)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Hlavní nadpis</Label>
          <Textarea
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Hlavní nadpis stránky"
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Podnadpis</Label>
          <Textarea
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            placeholder="Popis pod hlavním nadpisem"
            className="mt-1"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ctaPrimary">Primární tlačítko</Label>
            <Input
              id="ctaPrimary"
              value={formData.ctaPrimary}
              onChange={(e) => handleChange('ctaPrimary', e.target.value)}
              placeholder="Text prvního tlačítka"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="ctaSecondary">Sekundární tlačítko</Label>
            <Input
              id="ctaSecondary"
              value={formData.ctaSecondary}
              onChange={(e) => handleChange('ctaSecondary', e.target.value)}
              placeholder="Text druhého tlačítka"
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