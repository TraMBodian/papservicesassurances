import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NewPolicePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assurePrincipal: "",
    type: "Individuel",
    montantCotisation: "",
    dateDebut: "",
    dateFin: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Police créée avec succès !");
    navigate('/polices');
  };

  return (
    <AppLayout title="Nouvelle police">
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-2xl space-y-6">
          <Button variant="ghost" onClick={() => navigate('/polices')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Button>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="assurePrincipal">Assuré principal</Label>
                <Input
                  id="assurePrincipal"
                  value={formData.assurePrincipal}
                  onChange={(e) => setFormData({...formData, assurePrincipal: e.target.value})}
                  required
                  className="mt-2"
                  placeholder="Nom de l'assuré"
                />
              </div>

              <div>
                <Label htmlFor="type">Type de police</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full mt-2 px-3 py-2 border border-input rounded-lg bg-background"
                >
                  <option value="Individuel">Individuel</option>
                  <option value="Famille">Famille</option>
                  <option value="Groupe">Groupe</option>
                </select>
              </div>

              <div>
                <Label htmlFor="montantCotisation">Montant de la cotisation</Label>
                <Input
                  id="montantCotisation"
                  value={formData.montantCotisation}
                  onChange={(e) => setFormData({...formData, montantCotisation: e.target.value})}
                  required
                  className="mt-2"
                  placeholder="Ex: 50 000 FCFA"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateDebut">Date de début</Label>
                  <Input
                    id="dateDebut"
                    type="date"
                    value={formData.dateDebut}
                    onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="dateFin">Date de fin</Label>
                  <Input
                    id="dateFin"
                    type="date"
                    value={formData.dateFin}
                    onChange={(e) => setFormData({...formData, dateFin: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                Créer la police
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
