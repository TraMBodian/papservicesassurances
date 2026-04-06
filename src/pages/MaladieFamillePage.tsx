import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, UserCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const mockFamilles = [
  {
    id: 1,
    principal: "Amadou Diallo",
    telephone: "+221 77 123 45 67",
    beneficiaires: ["Fatou Diallo (Épouse)", "Moussa Diallo (Fils)", "Aïcha Diallo (Fille)"],
    dateDebut: "2024-01-15",
    dateFin: "2025-01-14",
    prime: "850000",
    statut: "Actif"
  },
  {
    id: 2,
    principal: "Mariama Sow",
    telephone: "+221 76 234 56 78",
    beneficiaires: ["Ibrahima Sow (Époux)", "Khadija Sow (Fille)"],
    dateDebut: "2024-02-01",
    dateFin: "2025-01-31",
    prime: "650000",
    statut: "Actif"
  },
  {
    id: 3,
    principal: "Ousmane Ndiaye",
    telephone: "+221 78 345 67 89",
    beneficiaires: ["Awa Ndiaye (Épouse)", "Cheikh Ndiaye (Fils)", "Binta Ndiaye (Fille)", "Mamadou Ndiaye (Fils)"],
    dateDebut: "2023-06-01",
    dateFin: "2024-05-31",
    prime: "1200000",
    statut: "Expiré"
  },
  {
    id: 4,
    principal: "Fatou Sarr",
    telephone: "+221 77 456 78 90",
    beneficiaires: ["Abdou Sarr (Époux)", "Yacine Sarr (Fils)"],
    dateDebut: "2024-03-10",
    dateFin: "2025-03-09",
    prime: "720000",
    statut: "Actif"
  }
];

export default function MaladieFamillePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = mockFamilles.filter(f =>
    f.principal.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: mockFamilles.length,
    actifs: mockFamilles.filter(f => f.statut === "Actif").length,
    beneficiaires: mockFamilles.reduce((sum, f) => sum + f.beneficiaires.length + 1, 0)
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Maladie Famille</h1>
            <p className="text-muted-foreground">Gestion des polices familiales</p>
          </div>
          <Button className="btn-ripple bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => navigate("/maladie-famille/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Famille
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Familles</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Actifs</p>
                <p className="text-2xl font-bold">{stats.actifs}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Assurés</p>
                <p className="text-2xl font-bold">{stats.beneficiaires}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un assuré principal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filtered.map((famille, i) => (
            <motion.div
              key={famille.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {famille.principal.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{famille.principal}</h3>
                      <Badge variant={famille.statut === "Actif" ? "default" : "secondary"}>
                        {famille.statut}
                      </Badge>
                      <Badge variant="outline">
                        {famille.beneficiaires.length + 1} personnes
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{famille.telephone}</p>
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Bénéficiaires:</p>
                      <div className="flex flex-wrap gap-2">
                        {famille.beneficiaires.map((ben, idx) => (
                          <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {ben}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Prime annuelle</p>
                        <p className="font-semibold">{parseInt(famille.prime).toLocaleString()} FCFA</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date début</p>
                        <p className="font-semibold">{new Date(famille.dateDebut).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date fin</p>
                        <p className="font-semibold">{new Date(famille.dateFin).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
