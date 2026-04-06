import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Banknote, CheckCircle, Clock, TrendingUp } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";

interface Remboursement {
  id: string;
  numero: string;
  assure: string;
  sinistre: string;
  montantReclame: string;
  montantRembourse: string;
  date: string;
  methode: string;
  statut: "Effectué" | "En cours" | "En attente";
}

const mockRemboursements: Remboursement[] = [
  { id: "1", numero: "REM-2024-001", assure: "Moussa Diop", sinistre: "SIN-2024-001", montantReclame: "25,000 FCFA", montantRembourse: "20,000 FCFA", date: "2024-07-18", methode: "Virement bancaire", statut: "Effectué" },
  { id: "2", numero: "REM-2024-002", assure: "Aminata Fall", sinistre: "SIN-2024-002", montantReclame: "450,000 FCFA", montantRembourse: "405,000 FCFA", date: "2024-07-20", methode: "Virement bancaire", statut: "Effectué" },
  { id: "3", numero: "REM-2024-003", assure: "Ibrahima Ndiaye", sinistre: "SIN-2024-003", montantReclame: "35,000 FCFA", montantRembourse: "28,000 FCFA", date: "2024-07-22", methode: "Mobile Money", statut: "En cours" },
  { id: "4", numero: "REM-2024-004", assure: "Fatou Sow", sinistre: "SIN-2024-004", montantReclame: "85,000 FCFA", montantRembourse: "72,250 FCFA", date: "2024-07-23", methode: "Virement bancaire", statut: "En attente" },
  { id: "5", numero: "REM-2024-005", assure: "Ousmane Ba", sinistre: "SIN-2024-005", montantReclame: "120,000 FCFA", montantRembourse: "108,000 FCFA", date: "2024-07-19", methode: "Chèque", statut: "Effectué" },
];

const statusConfig = {
  "Effectué": { style: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  "En cours": { style: "bg-blue-100 text-blue-700 border-blue-200", icon: Clock },
  "En attente": { style: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock }
};

export default function RemboursementsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockRemboursements.filter(
    (r) =>
      r.numero.toLowerCase().includes(search.toLowerCase()) ||
      r.assure.toLowerCase().includes(search.toLowerCase()) ||
      r.sinistre.toLowerCase().includes(search.toLowerCase())
  );

  const totalRembourse = mockRemboursements
    .filter(r => r.statut === "Effectué")
    .reduce((acc, r) => acc + parseInt(r.montantRembourse.replace(/[^0-9]/g, '')), 0);

  return (
    <AppLayout title="Suivi des Remboursements">
      <div className="space-y-4 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">
                  {mockRemboursements.filter(r => r.statut === "Effectué").length}
                </p>
                <p className="text-sm text-green-700">Effectués</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">
                  {mockRemboursements.filter(r => r.statut === "En cours").length}
                </p>
                <p className="text-sm text-blue-700">En cours</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">{(totalRembourse / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-purple-700">Total remboursé</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recherche */}
        <div className="flex items-center gap-2 max-w-md">
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border border-input bg-card text-sm">
            <Search size={16} className="text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un remboursement..."
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Liste des remboursements */}
        <div className="space-y-4">
          {filtered.map((remb, i) => {
            const config = statusConfig[remb.statut];
            const StatusIcon = config.icon;
            
            return (
              <motion.div
                key={remb.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Banknote className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{remb.assure}</p>
                        <p className="text-sm text-muted-foreground font-mono">{remb.numero}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-medium ${config.style}`}>
                      <StatusIcon size={14} />
                      {remb.statut}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Sinistre lié</p>
                      <p className="font-medium">{remb.sinistre}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date de remboursement</p>
                      <p className="font-medium">{remb.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Méthode</p>
                      <p className="font-medium">{remb.methode}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Montant réclamé</p>
                      <p className="text-lg font-semibold text-gray-600">{remb.montantReclame}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Montant remboursé</p>
                      <p className="text-2xl font-bold text-green-600">{remb.montantRembourse}</p>
                    </div>
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
