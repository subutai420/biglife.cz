import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Save, RotateCcw } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { toast } from 'sonner@2.0.3';

export function AboutEditor() {
  const { content, updateContent } = useAdmin();
  const [aboutText, setAboutText] = useState(content.aboutText);
  const [companyValues, setCompanyValues] = useState(content.companyValues);

  const handleSave = () => {
    updateContent({ 
      aboutText,
      companyValues 
    });
    toast.success('Sekce "O nás" byla úspěšně uložena!');
  };

  const handleReset = () => {
    setAboutText(content.aboutText);
    setCompanyValues(content.companyValues);
    toast.info('Změny byly zrušeny');
  };

  const handleValueChange = (
    key: keyof typeof companyValues,
    field: 'title' | 'description',
    value: string
  ) => {
    setCompanyValues(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Úvodní text sekce "O nás"</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="aboutText">Popis společnosti</Label>
            <Textarea
              id="aboutText"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              placeholder="Krátký popis společnosti..."
              className="mt-1"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hodnoty společnosti</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-4">Naše mise</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="mission-title">Název</Label>
                <Input
                  id="mission-title"
                  value={companyValues.mission.title}
                  onChange={(e) => handleValueChange('mission', 'title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mission-desc">Popis</Label>
                <Textarea
                  id="mission-desc"
                  value={companyValues.mission.description}
                  onChange={(e) => handleValueChange('mission', 'description', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Zkušenosti</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="experience-title">Název</Label>
                <Input
                  id="experience-title"
                  value={companyValues.experience.title}
                  onChange={(e) => handleValueChange('experience', 'title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="experience-desc">Popis</Label>
                <Textarea
                  id="experience-desc"
                  value={companyValues.experience.description}
                  onChange={(e) => handleValueChange('experience', 'description', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Důvěra klientů</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="trust-title">Název</Label>
                <Input
                  id="trust-title"
                  value={companyValues.trust.title}
                  onChange={(e) => handleValueChange('trust', 'title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="trust-desc">Popis</Label>
                <Textarea
                  id="trust-desc"
                  value={companyValues.trust.description}
                  onChange={(e) => handleValueChange('trust', 'description', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Transparentnost</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="transparency-title">Název</Label>
                <Input
                  id="transparency-title"
                  value={companyValues.transparency.title}
                  onChange={(e) => handleValueChange('transparency', 'title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="transparency-desc">Popis</Label>
                <Textarea
                  id="transparency-desc"
                  value={companyValues.transparency.description}
                  onChange={(e) => handleValueChange('transparency', 'description', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
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
    </div>
  );
}