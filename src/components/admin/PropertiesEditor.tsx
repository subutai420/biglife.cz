import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useAdmin, Property } from '../../contexts/AdminContext';
import { toast } from 'sonner@2.0.3';

export function PropertiesEditor() {
  const { content, addProperty, updateProperty, deleteProperty } = useAdmin();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Property, 'id'>>({
    image: '',
    location: '',
    type: '',
    status: 'Připravujeme',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      image: '',
      location: '',
      type: '',
      status: 'Připravujeme',
      description: ''
    });
    setEditingProperty(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (property: Property) => {
    setFormData({
      image: property.image,
      location: property.location,
      type: property.type,
      status: property.status,
      description: property.description
    });
    setEditingProperty(property);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProperty) {
      updateProperty(editingProperty.id, formData);
      toast.success('Nemovitost byla úspěšně upravena!');
    } else {
      addProperty(formData);
      toast.success('Nemovitost byla úspěšně přidána!');
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Opravdu chcete smazat tuto nemovitost?')) {
      deleteProperty(id);
      toast.success('Nemovitost byla smazána!');
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'Pronajato': return 'bg-green-100 text-green-800';
      case 'Akvizice': return 'bg-orange-100 text-orange-800';
      case 'Připravujeme': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Správa nemovitostí</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  Přidat nemovitost
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingProperty ? 'Upravit nemovitost' : 'Přidat nemovitost'}
                  </DialogTitle>
                  <DialogDescription>
                    Vyplňte informace o nemovitosti včetně lokality, typu a popisu.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="property-image">URL obrázku</Label>
                    <Input
                      id="property-image"
                      value={formData.image}
                      onChange={(e) => handleChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="property-location">Lokalita</Label>
                      <Input
                        id="property-location"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="Praha, Brno, ..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="property-type">Typ bytu</Label>
                      <Input
                        id="property-type"
                        value={formData.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                        placeholder="Byt 2+1, Byt 3+1, ..."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="property-status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value: Property['status']) => handleChange('status', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Připravujeme">Připravujeme</SelectItem>
                        <SelectItem value="Akvizice">Akvizice</SelectItem>
                        <SelectItem value="Pronajato">Pronajato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="property-description">Popis</Label>
                    <Textarea
                      id="property-description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Popis nemovitosti..."
                      className="mt-1"
                      rows={3}
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
          <div className="grid gap-4">
            {content.properties.map((property) => (
              <Card key={property.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={property.image}
                      alt={property.type}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{property.type} - {property.location}</h3>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(property.status)} mt-1`}>
                            {property.status}
                          </span>
                          <p className="text-gray-600 text-sm mt-2">{property.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(property)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
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