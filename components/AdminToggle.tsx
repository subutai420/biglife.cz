import { Button } from './ui/button';
import { Settings, Eye } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export function AdminToggle() {
  const { isAdminMode, setIsAdminMode } = useAdmin();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsAdminMode(!isAdminMode)}
        variant={isAdminMode ? "default" : "outline"}
        size="lg"
        className="shadow-lg"
      >
        {isAdminMode ? (
          <>
            <Eye className="w-4 h-4 mr-2" />
            Zobrazit web
          </>
        ) : (
          <>
            <Settings className="w-4 h-4 mr-2" />
            Admin panel
          </>
        )}
      </Button>
    </div>
  );
}