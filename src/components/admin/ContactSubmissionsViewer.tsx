import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Trash2, Mail, Phone, User, MessageSquare, Clock, ExternalLink } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'failed';
}

export function ContactSubmissionsViewer() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    try {
      const saved = localStorage.getItem('contact_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sort by timestamp (newest first)
        parsed.sort((a: FormSubmission, b: FormSubmission) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setSubmissions(parsed);
      }
    } catch (error) {
      console.error('Failed to load submissions:', error);
      toast.error('Nepodařilo se načíst zprávy');
    }
  };

  const deleteSubmission = (id: string) => {
    try {
      const filtered = submissions.filter(sub => sub.id !== id);
      setSubmissions(filtered);
      localStorage.setItem('contact_submissions', JSON.stringify(filtered));
      toast.success('Zpráva byla smazána');
    } catch (error) {
      console.error('Failed to delete submission:', error);
      toast.error('Nepodařilo se smazat zprávu');
    }
  };

  const clearAllSubmissions = () => {
    if (confirm('Opravdu chcete smazat všechny zprávy?')) {
      try {
        localStorage.removeItem('contact_submissions');
        setSubmissions([]);
        toast.success('Všechny zprávy byly smazány');
      } catch (error) {
        console.error('Failed to clear submissions:', error);
        toast.error('Nepodařilo se smazat zprávy');
      }
    }
  };

  const forwardToEmail = (submission: FormSubmission) => {
    const subject = encodeURIComponent(`Přeposílaná zpráva z Biglife od ${submission.name}`);
    const body = encodeURIComponent(`
Přeposílaná zpráva z kontaktního formuláře:

Jméno: ${submission.name}
Email: ${submission.email}
Telefon: ${submission.phone || 'Not provided'}
Datum: ${submission.timestamp}

Zpráva:
${submission.message || 'No message provided'}

---
Tato zpráva byla přeposílána z admin panelu Biglife.
    `);
    
    const mailtoLink = `mailto:dan.bubak@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Kontaktní zprávy</h2>
          <p className="text-gray-600">
            Zobrazeno {submissions.length} zpráv z kontaktního formuláře
          </p>
        </div>
        {submissions.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={clearAllSubmissions}
            className="ml-4"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Smazat vše
          </Button>
        )}
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg mb-2">Žádné zprávy</h3>
            <p className="text-gray-600">
              Zatím nebyly odeslány žádné zprávy z kontaktního formuláře.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{submission.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{submission.timestamp}</span>
                        </div>
                        <Badge 
                          variant={submission.status === 'sent' ? 'default' : 'destructive'}
                        >
                          {submission.status === 'sent' ? 'Odesláno' : 'Chyba'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => forwardToEmail(submission)}
                      title="Přeposlat email"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Přeposlat
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteSubmission(submission.id)}
                      title="Smazat zprávu"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a 
                      href={`mailto:${submission.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {submission.email}
                    </a>
                  </div>
                  {submission.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a 
                        href={`tel:${submission.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {submission.phone}
                      </a>
                    </div>
                  )}
                </div>
                
                {submission.message && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Zpráva:</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="whitespace-pre-wrap">{submission.message}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}