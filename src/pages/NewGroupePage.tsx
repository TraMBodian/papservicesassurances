import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function NewGroupePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    entreprise: "",
    secteur: "",
    employes: "",
    dateDebut: "",
    dateFin: "",
    prime: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Groupe créé avec succès");
    navigate("/maladie-groupe");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/maladie-groupe")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Nouveau Groupe</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Entreprise</Label>
              <Input
                required
                value={formData.entreprise}
                onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                placeholder="Nom de l'entreprise"
              />
            </div>

            <div>
              <Label>Secteur d'activité</Label>
              <Input
                required
                value={formData.secteur}
                onChange={(e) => setFormData({ ...formData, secteur: e.target.value })}
                placeholder="Ex: Télécommunications, Finance..."
              />
            </div>

            <div>
              <Label>Nombre d'employés</Label>
              <Input
                required
                type="number"
                value={formData.employes}
                onChange={(e) => setFormData({ ...formData, employes: e.target.value })}
                placeholder="450"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date début</Label>
                <Input
                  required
                  type="date"
                  value={formData.dateDebut}
                  onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                />
              </div>
              <div>
                <Label>Date fin</Label>
                <Input
                  required
                  type="date"
                  value={formData.dateFin}
                  onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Prime annuelle (FCFA)</Label>
              <Input
                required
                type="number"
                value={formData.prime}
                onChange={(e) => setFormData({ ...formData, prime: e.target.value })}
                placeholder="45000000"
              />
            </div>

            <Button type="submit" className="w-full btn-ripple bg-gradient-to-r from-blue-600 to-purple-600">
              Créer le groupe
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
