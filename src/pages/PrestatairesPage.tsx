import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { mockPrestataires } from "@/data/mockData";

const specialiteColors: Record<string, string> = {
  "Médecin Généraliste": "bg-primary/10 text-primary",
  Pharmacie: "bg-success/10 text-success",
  Clinique: "bg-info/10 text-info",
  Gynécologue: "bg-secondary/10 text-secondary-foreground",
  Laboratoire: "bg-warning/10 text-warning",
  Ophtalmologue: "bg-accent/10 text-accent-foreground",
};

export default function PrestatairesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = mockPrestataires.filter(
    (p) =>
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.specialite.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout title="Gestion des Prestataires">
      <div className="space-y-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md w-full">
            <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border border-input bg-card text-sm">
              <Search size={16} className="text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un prestataire..."
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <button onClick={() => navigate('/prestataires/new')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus size={16} />
            Nouveau prestataire
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((prest, i) => (
            <motion.div
              key={prest.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm">
                    {prest.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{prest.nom}</p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-0.5 font-medium ${specialiteColors[prest.specialite] || "bg-muted text-muted-foreground"}`}>
                      {prest.specialite}
                    </span>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full mt-2 ${prest.statut === "Actif" ? "bg-success" : "bg-muted-foreground"}`} />
              </div>
              <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone size={13} />
                  <span>{prest.telephone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} />
                  <span className="truncate">{prest.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} />
                  <span>{prest.adresse}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
