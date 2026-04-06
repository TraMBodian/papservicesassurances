import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pill, User, Calendar, FileText, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Prescription {
  id: string;
  numero: string;
  assure: string;
  medecin: string;
  date: string;
  medicaments: { nom: string; dosage: string; duree: string }[];
  instructions: string;
  statut: "Active" | "Expirée" | "Utilisée";
  pharmacie?: string;
}

const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    numero: "ORD-2024-001",
    assure: "Moussa Diop",
    medecin: "Dr. Abdoulaye Diallo",
    date: "2024-07-20",
    medicaments: [
      { nom: "Paracétamol 500mg", dosage: "1 comprimé 3x/jour", duree: "5 jours" },
      { nom: "Amoxicilline 1g", dosage: "1 comprimé 2x/jour", duree: "7 jours" }
    ],
    instructions: "À prendre après les repas. Boire beaucoup d'eau.",
    statut: "Active"
  },
  {
    id: "2",
    numero: "ORD-2024-002",
    assure: "Aminata Fall",
    medecin: "Dr. Mariama Bâ",
    date: "2024-07-22",
    medicaments: [
      { nom: "Acide folique 5mg", dosage: "1 comprimé/jour", duree: "30 jours" },
      { nom: "Fer 80mg", dosage: "1 comprimé/jour", duree: "30 jours" }
    ],
    instructions: "Supplémentation prénatale. Prendre le matin à jeun.",
    statut: "Active"
  },
  {
    id: "3",
    numero: "ORD-2024-003",
    assure: "Ibrahima Ndiaye",
    medecin: "Dr. Abdoulaye Diallo",
    date: "2024-07-15",
    medicaments: [
      { nom: "Ibuprofène 400mg", dosage: "1 comprimé 3x/jour", duree: "3 jours" }
    ],
    instructions: "En cas de douleur. Ne pas dépasser 3 jours.",
    statut: "Utilisée",
    pharmacie: "Pharmacie Pasteur"
  },
  {
    id: "4",
    numero: "ORD-2024-004",
    assure: "Fatou Sow",
    medecin: "Dr. Omar Sarr",
    date: "2024-06-20",
    medicaments: [
      { nom: "Collyre hydratant", dosage: "2 gouttes 4x/jour", duree: "14 jours" }
    ],
    instructions: "Pour sécheresse oculaire.",
    statut: "Expirée"
  },
  {
    id: "5",
    numero: "ORD-2024-005",
    assure: "Ousmane Ba",
    medecin: "Dr. Abdoulaye Diallo",
    date: "2024-07-23",
    medicaments: [
      { nom: "Oméprazole 20mg", dosage: "1 comprimé/jour", duree: "30 jours" },
      { nom: "Gaviscon", dosage: "1 sachet après repas", duree: "15 jours" }
    ],
    instructions: "Traitement pour reflux gastrique. Prendre avant le petit-déjeuner.",
    statut: "Active"
  }
];

const statusConfig = {
  "Active": { style: "bg-green-100 text-green-700 border-green-200" },
  "Expirée": { style: "bg-gray-100 text-gray-700 border-gray-200" },
  "Utilisée": { style: "bg-blue-100 text-blue-700 border-blue-200" }
};

export default function PrescriptionsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = mockPrescriptions.filter(
    (p) =>
      p.numero.toLowerCase().includes(search.toLowerCase()) ||
      p.assure.toLowerCase().includes(search.toLowerCase()) ||
      p.medecin.toLowerCase().includes(search.toLowerCase())
  );

  const downloadPrescription = (prescription: Prescription) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 800, 1100);

    ctx.fillStyle = '#2563eb';
    ctx.fillRect(0, 0, 800, 120);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('ORDONNANCE MÉDICALE', 50, 50);
    ctx.font = '18px Arial';
    ctx.fillText('République du Sénégal - Ministère de la Santé', 50, 85);

    ctx.fillStyle = 'black';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`Ordonnance N°: ${prescription.numero}`, 50, 160);
    ctx.fillText(`Date: ${prescription.date}`, 550, 160);
    
    ctx.font = '14px Arial';
    ctx.fillText(`Patient: ${prescription.assure}`, 50, 200);
    ctx.fillText(`Médecin: ${prescription.medecin}`, 50, 230);

    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 260);
    ctx.lineTo(750, 260);
    ctx.stroke();

    ctx.font = 'bold 18px Arial';
    ctx.fillText('MÉDICAMENTS PRESCRITS:', 50, 300);
    
    let yPos = 340;
    ctx.font = '14px Arial';
    prescription.medicaments.forEach((med, idx) => {
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`${idx + 1}. ${med.nom}`, 70, yPos);
      ctx.font = '14px Arial';
      ctx.fillText(`   Dosage: ${med.dosage}`, 70, yPos + 25);
      ctx.fillText(`   Durée: ${med.duree}`, 70, yPos + 50);
      yPos += 90;
    });

    yPos += 20;
    ctx.font = 'bold 16px Arial';
    ctx.fillText('INSTRUCTIONS:', 50, yPos);
    ctx.font = '14px Arial';
    ctx.fillText(prescription.instructions, 70, yPos + 30);

    yPos += 100;
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(450, yPos);
    ctx.lineTo(700, yPos);
    ctx.stroke();
    ctx.font = '12px Arial';
    ctx.fillText('Signature et cachet du médecin', 480, yPos + 20);

    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.fillText('Cette ordonnance est valable 30 jours', 50, 1050);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ordonnance-${prescription.numero}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <AppLayout title="Gestion des Ordonnances">
      <div className="space-y-4 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">
                  {mockPrescriptions.filter(p => p.statut === "Active").length}
                </p>
                <p className="text-sm text-green-700">Actives</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">
                  {mockPrescriptions.filter(p => p.statut === "Utilisée").length}
                </p>
                <p className="text-sm text-blue-700">Utilisées</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">{mockPrescriptions.length}</p>
                <p className="text-sm text-purple-700">Total</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md w-full">
            <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border border-input bg-card text-sm">
              <Search size={16} className="text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une ordonnance..."
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => navigate('/prescriptions/new')}>
            <Plus size={16} className="mr-2" />
            Nouvelle ordonnance
          </Button>
        </div>

        {/* Liste des ordonnances */}
        <div className="space-y-4">
          {filtered.map((prescription, i) => {
            const config = statusConfig[prescription.statut];
            
            return (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{prescription.numero}</p>
                        <p className="text-sm text-muted-foreground">Prescrit le {prescription.date}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-medium ${config.style}`}>
                      {prescription.statut}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Patient:</span>
                      <span className="font-medium">{prescription.assure}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Médecin:</span>
                      <span className="font-medium">{prescription.medecin}</span>
                    </div>
                  </div>

                  {/* Médicaments */}
                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Médicaments prescrits:
                    </p>
                    <div className="space-y-2">
                      {prescription.medicaments.map((med, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-sm">{med.nom}</p>
                          <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                            <span>Dosage: {med.dosage}</span>
                            <span>Durée: {med.duree}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Instructions:</p>
                    <p className="text-sm">{prescription.instructions}</p>
                  </div>

                  {prescription.pharmacie && (
                    <div className="border-t pt-4 mb-4">
                      <p className="text-sm text-muted-foreground">
                        Délivrée par: <span className="font-medium text-foreground">{prescription.pharmacie}</span>
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="border-t pt-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => downloadPrescription(prescription)}>
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/prescriptions/${prescription.id}`)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Détails
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
