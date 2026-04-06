import { Bell, Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Notification {
  id: string;
  type: "consultation" | "pharmacie" | "remboursement";
  message: string;
  time: string;
  read: boolean;
}

export const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "consultation",
      message: "Nouvelle consultation enregistrée pour Jean Dupont",
      time: "Il y a 5 min",
      read: false
    },
    {
      id: "2",
      type: "pharmacie",
      message: "Achat de médicaments validé - Pharmacie Centrale",
      time: "Il y a 15 min",
      read: false
    },
    {
      id: "3",
      type: "remboursement",
      message: "Remboursement effectué pour Marie Martin - 25 000 FCFA",
      time: "Il y a 1h",
      read: true
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto shadow-xl z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="divide-y">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 hover:bg-muted/50 transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export const sendNotification = (type: "consultation" | "pharmacie", data: any) => {
  // Simulation d'envoi de notification
  console.log(`📢 Notification envoyée:`, {
    type,
    administrateur: "Notification envoyée à l'admin",
    prestataire: `Notification envoyée au prestataire ${data.prestataire}`,
    patient: `Notification envoyée au patient ${data.patient}`,
    message: type === "consultation" 
      ? `Consultation enregistrée pour ${data.patient}`
      : `Achat de médicaments validé pour ${data.patient}`
  });
  
  alert(`✅ Notifications envoyées:\n- Administrateur\n- Prestataire: ${data.prestataire}\n- Patient: ${data.patient}`);
};
