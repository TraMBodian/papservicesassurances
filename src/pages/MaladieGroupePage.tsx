import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Building2, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const mockGroupes = [
  {
    id: 1,
    entreprise: "Sonatel SA",
    secteur: "Télécommunications",
    employes: 450,
    assures: 1350,
    debut: "2024-01-01",
    fin: "2024-12-31",
    prime: "45000000",
    statut: "Actif"
  },
  {
    id: 2,
    entreprise: "Banque Atlantique",
    secteur: "Finance",
    employes: 280,
    assures: 840,
    debut: "2024-03-01",
    fin: "2025-02-28",
    prime: "28000000",
    statut: "Actif"
  },
  {
    id: 3,
    entreprise: "Sénégalaise de l'Automobile",
    secteur: "Automobile",
    employes: 120,
    assures: 360,
    debut: "2023-06-01",
    fin: "2024-05-31",
    prime: "12000000",
    statut: "Expiré"
  }
];

export default function MaladieGroupePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = mockGroupes.filter(g =>
    g.entreprise.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Maladie Groupe</h1>
            <p className="text-muted-foreground">Gestion des polices pour entreprises</p>
          </div>
          <Button className="btn-ripple bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => navigate("/maladie-groupe/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Groupe
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entreprises</p>
                <p className="text-2xl font-bold">{mockGroupes.length}</p>
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
                <p className="text-2xl font-bold">{mockGroupes.filter(g => g.statut === "Actif").length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Assurés</p>
                <p className="text-2xl font-bold">{mockGroupes.reduce((sum, g) => sum + g.assures, 0)}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher une entreprise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filtered.map((groupe, i) => (
            <motion.div
              key={groupe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                    <Building2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{groupe.entreprise}</h3>
                      <Badge variant={groupe.statut === "Actif" ? "default" : "secondary"}>
                        {groupe.statut}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{groupe.secteur}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Employés</p>
                        <p className="font-semibold">{groupe.employes}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Assurés</p>
                        <p className="font-semibold">{groupe.assures}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Prime annuelle</p>
                        <p className="font-semibold">{parseInt(groupe.prime).toLocaleString()} FCFA</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Période</p>
                        <p className="font-semibold text-sm">{new Date(groupe.debut).getFullYear()}</p>
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
