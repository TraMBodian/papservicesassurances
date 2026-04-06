import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Calendar, User, Stethoscope, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Consultation {
  id: string;
  numero: string;
  assure: string;
  medecin: string;
  specialite: string;
  date: string;
  heure: string;
  motif: string;
  diagnostic: string;
  montant: string;
  statut: "Programmée" | "Effectuée" | "Annulée";
}

const mockConsultations: Consultation[] = [
  { id: "1", numero: "CONS-2024-001", assure: "Moussa Diop", medecin: "Dr. Abdoulaye Diallo", specialite: "Médecin Généraliste", date: "2024-07-20", heure: "09:00", motif: "Contrôle de routine", diagnostic: "État général satisfaisant", montant: "25,000 FCFA", statut: "Effectuée" },
  { id: "2", numero: "CONS-2024-002", assure: "Aminata Fall", medecin: "Dr. Mariama Bâ", specialite: "Gynécologue", date: "2024-07-22", heure: "14:30", motif: "Consultation prénatale", diagnostic: "Grossesse normale - 20 semaines", montant: "35,000 FCFA", statut: "Effectuée" },
  { id: "3", numero: "CONS-2024-003", assure: "Ibrahima Ndiaye", medecin: "Dr. Abdoulaye Diallo", specialite: "Médecin Généraliste", date: "2024-07-25", heure: "10:00", motif: "Fièvre et toux", diagnostic: "En attente", montant: "25,000 FCFA", statut: "Programmée" },
  { id: "4", numero: "CONS-2024-004", assure: "Fatou Sow", medecin: "Dr. Omar Sarr", specialite: "Ophtalmologue", date: "2024-07-23", heure: "15:00", motif: "Contrôle de la vue", diagnostic: "Myopie légère", montant: "30,000 FCFA", statut: "Effectuée" },
  { id: "5", numero: "CONS-2024-005", assure: "Ousmane Ba", medecin: "Dr. Abdoulaye Diallo", specialite: "Médecin Généraliste", date: "2024-07-21", heure: "11:00", motif: "Douleurs abdominales", diagnostic: "Annulée par le patient", montant: "0 FCFA", statut: "Annulée" },
];

const statusConfig = {
  "Programmée": { style: "bg-blue-100 text-blue-700 border-blue-200", icon: Calendar },
  "Effectuée": { style: "bg-green-100 text-green-700 border-green-200", icon: FileText },
  "Annulée": { style: "bg-red-100 text-red-700 border-red-200", icon: FileText }
};

export default function ConsultationsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = mockConsultations.filter(
    (c) =>
      c.numero.toLowerCase().includes(search.toLowerCase()) ||
      c.assure.toLowerCase().includes(search.toLowerCase()) ||
      c.medecin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout title="Suivi des Consultations">
      <div className="space-y-4 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">
                  {mockConsultations.filter(c => c.statut === "Programmée").length}
                </p>
                <p className="text-sm text-blue-700">Programmées</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">
                  {mockConsultations.filter(c => c.statut === "Effectuée").length}
                </p>
                <p className="text-sm text-green-700">Effectuées</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">{mockConsultations.length}</p>
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
                placeholder="Rechercher une consultation..."
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => navigate('/consultations/new')}>
            <Plus size={16} className="mr-2" />
            Nouvelle consultation
          </Button>
        </div>

        {/* Liste des consultations */}
        <div className="space-y-4">
          {filtered.map((consultation, i) => {
            const config = statusConfig[consultation.statut];
            const StatusIcon = config.icon;
            
            return (
              <motion.div
                key={consultation.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {consultation.assure.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{consultation.assure}</p>
                        <p className="text-sm text-muted-foreground font-mono">{consultation.numero}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-medium ${config.style}`}>
                      <StatusIcon size={14} />
                      {consultation.statut}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Stethoscope className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Médecin:</span>
                        <span className="font-medium">{consultation.medecin}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Spécialité:</span>
                        <span className="font-medium">{consultation.specialite}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{consultation.date} à {consultation.heure}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Montant:</span>
                        <span className="font-semibold text-blue-600">{consultation.montant}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Motif de consultation:</p>
                      <p className="text-sm">{consultation.motif}</p>
                    </div>
                    {consultation.diagnostic !== "En attente" && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Diagnostic:</p>
                        <p className="text-sm font-medium">{consultation.diagnostic}</p>
                      </div>
                    )}
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
