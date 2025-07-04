import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useAdmin, FAQ } from '../../contexts/AdminContext';
import { toast } from 'sonner@2.0.3';

export function FAQEditor() {
  const { content, addFAQ, updateFAQ, deleteFAQ } = useAdmin();
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<FAQ, 'id'>>({
    question: '',
    answer: ''
  });

  const resetForm = () => {
    setFormData({
      question: '',
      answer: ''
    });
    setEditingFAQ(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setFormData({
      question: faq.question,
      answer: faq.answer
    });
    setEditingFAQ(faq);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingFAQ) {
      updateFAQ(editingFAQ.id, formData);
      toast.success('FAQ byla úspěšně upravena!');
    } else {
      addFAQ(formData);
      toast.success('FAQ byla úspěšně přidána!');
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Opravdu chcete smazat tuto FAQ?')) {
      deleteFAQ(id);
      toast.success('FAQ byla smazána!');
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Správa FAQ</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  Přidat FAQ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingFAQ ? 'Upravit FAQ' : 'Přidat FAQ'}
                  </DialogTitle>
                  <DialogDescription>
                    Vyplňte často kladenou otázku a odpověď na ni.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="faq-question">Otázka</Label>
                    <Textarea
                      id="faq-question"
                      value={formData.question}
                      onChange={(e) => handleChange('question', e.target.value)}
                      placeholder="Často kladená otázka..."
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="faq-answer">Odpověď</Label>
                    <Textarea
                      id="faq-answer"
                      value={formData.answer}
                      onChange={(e) => handleChange('answer', e.target.value)}
                      placeholder="Odpověď na otázku..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Uložit
                    </Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Zrušit
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(faq)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(faq.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}