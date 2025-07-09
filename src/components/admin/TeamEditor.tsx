import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useAdmin, TeamMember } from '../../contexts/AdminContext';
import { toast } from 'sonner';

export function TeamEditor() {
  const { content, addTeamMember, updateTeamMember, deleteTeamMember } = useAdmin();
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    position: '',
    image: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      image: '',
      description: ''
    });
    setEditingMember(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      image: member.image,
      description: member.description
    });
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingMember) {
      updateTeamMember(editingMember.id, formData);
      toast.success('Člen týmu byl úspěšně upraven!');
    } else {
      addTeamMember(formData);
      toast.success('Člen týmu byl úspěšně přidán!');
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Opravdu chcete smazat tohoto člena týmu?')) {
      deleteTeamMember(id);
      toast.success('Člen týmu byl smazán!');
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
            <CardTitle>Správa týmu</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  Přidat člena týmu
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingMember ? 'Upravit člena týmu' : 'Přidat člena týmu'}
                  </DialogTitle>
                  <DialogDescription>
                    Vyplňte informace o členovi týmu včetně jména, pozice a fotografie.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member-name">Jméno</Label>
                      <Input
                        id="member-name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Jméno a příjmení"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="member-position">Pozice</Label>
                      <Input
                        id="member-position"
                        value={formData.position}
                        onChange={(e) => handleChange('position', e.target.value)}
                        placeholder="Pozice ve firmě"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="member-image">URL fotografie</Label>
                    <Input
                      id="member-image"
                      value={formData.image}
                      onChange={(e) => handleChange('image', e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="member-description">Popis</Label>
                    <Textarea
                      id="member-description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Krátký popis a zkušenosti..."
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
            {content.teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-blue-600 text-sm">{member.position}</p>
                          <p className="text-gray-600 text-sm mt-2">{member.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(member)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(member.id)}
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