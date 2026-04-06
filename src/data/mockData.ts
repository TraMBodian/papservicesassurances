import { Assure, Beneficiaire, Police, Prestataire, Sinistre, Consultation, Prescription, StatCard } from "@/types/insurance";

export const mockStats: StatCard[] = [
  { title: "Assurés actifs", value: "2,847", change: "+12%", trend: "up", icon: "users" },
  { title: "Polices en cours", value: "1,234", change: "+8%", trend: "up", icon: "shield" },
  { title: "Sinistres en cours", value: "156", change: "-5%", trend: "down", icon: "file-text" },
  { title: "Montant remboursé", value: "45.2M FCFA", change: "+15%", trend: "up", icon: "banknote" },
];

export const mockAssures: Assure[] = [
  { id: "ASS-001", numero: "ASS-2024-001", nom: "Diop", prenom: "Moussa", dateNaissance: "1985-03-15", sexe: "M", telephone: "+221 77 123 45 67", adresse: "Dakar, Plateau", email: "moussa.diop@email.com", pieceIdentite: "SN-1234567", profession: "Ingénieur", dateSouscription: "2024-01-15", dateDebut: "2024-02-01", dateFin: "2025-01-31", statut: "Actif", type: "famille" },
  { id: "ASS-002", numero: "ASS-2024-002", nom: "Fall", prenom: "Aminata", dateNaissance: "1990-07-22", sexe: "F", telephone: "+221 78 234 56 78", adresse: "Dakar, Almadies", email: "aminata.fall@email.com", pieceIdentite: "SN-2345678", profession: "Médecin", dateSouscription: "2024-02-10", dateDebut: "2024-03-01", dateFin: "2025-02-28", statut: "Actif", type: "famille" },
  { id: "ASS-003", numero: "ASS-2024-003", nom: "Ndiaye", prenom: "Ibrahima", dateNaissance: "1978-11-08", sexe: "M", telephone: "+221 76 345 67 89", adresse: "Thiès, Centre", email: "ibrahima.ndiaye@email.com", pieceIdentite: "SN-3456789", profession: "Comptable", dateSouscription: "2024-03-05", dateDebut: "2024-04-01", dateFin: "2025-03-31", statut: "Actif", type: "groupe" },
  { id: "ASS-004", numero: "ASS-2024-004", nom: "Sow", prenom: "Fatou", dateNaissance: "1992-05-18", sexe: "F", telephone: "+221 77 456 78 90", adresse: "Saint-Louis", email: "fatou.sow@email.com", pieceIdentite: "SN-4567890", profession: "Enseignante", dateSouscription: "2024-01-20", dateDebut: "2024-02-15", dateFin: "2025-02-14", statut: "Suspendu", type: "famille" },
  { id: "ASS-005", numero: "ASS-2024-005", nom: "Ba", prenom: "Ousmane", dateNaissance: "1982-09-30", sexe: "M", telephone: "+221 78 567 89 01", adresse: "Dakar, Parcelles", email: "ousmane.ba@email.com", pieceIdentite: "SN-5678901", profession: "Commercial", dateSouscription: "2024-04-01", dateDebut: "2024-05-01", dateFin: "2025-04-30", statut: "Actif", type: "groupe" },
];

export const mockPolices: Police[] = [
  { id: "POL-001", numero: "POL-2024-001", assurePrincipal: "Moussa Diop", type: "Famille", dateDebut: "2024-02-01", dateFin: "2025-01-31", statut: "Active", montantCotisation: "350,000 FCFA", nbBeneficiaires: 4 },
  { id: "POL-002", numero: "POL-2024-002", assurePrincipal: "Aminata Fall", type: "Famille", dateDebut: "2024-03-01", dateFin: "2025-02-28", statut: "Active", montantCotisation: "280,000 FCFA", nbBeneficiaires: 2 },
  { id: "POL-003", numero: "POL-2024-003", assurePrincipal: "Sonatel SA", type: "Groupe", dateDebut: "2024-01-01", dateFin: "2024-12-31", statut: "Active", montantCotisation: "12,500,000 FCFA", nbBeneficiaires: 250 },
  { id: "POL-004", numero: "POL-2024-004", assurePrincipal: "Fatou Sow", type: "Famille", dateDebut: "2024-02-15", dateFin: "2025-02-14", statut: "Suspendue", montantCotisation: "220,000 FCFA", nbBeneficiaires: 3 },
  { id: "POL-005", numero: "POL-2024-005", assurePrincipal: "CBAO Group", type: "Groupe", dateDebut: "2024-04-01", dateFin: "2025-03-31", statut: "Active", montantCotisation: "8,750,000 FCFA", nbBeneficiaires: 180 },
];

export const mockPrestataires: Prestataire[] = [
  { id: "PRE-001", numero: "PRE-001", nom: "Dr. Abdoulaye Diallo", specialite: "Médecin Généraliste", telephone: "+221 77 111 22 33", email: "dr.diallo@clinic.sn", adresse: "Dakar, Médina", statut: "Actif" },
  { id: "PRE-002", numero: "PRE-002", nom: "Pharmacie Pasteur", specialite: "Pharmacie", telephone: "+221 33 822 44 55", email: "pasteur@pharma.sn", adresse: "Dakar, Plateau", statut: "Actif" },
  { id: "PRE-003", numero: "PRE-003", nom: "Clinique de la Madeleine", specialite: "Clinique", telephone: "+221 33 823 66 77", email: "contact@madeleine.sn", adresse: "Dakar, Madeleine", statut: "Actif" },
  { id: "PRE-004", numero: "PRE-004", nom: "Dr. Mariama Bâ", specialite: "Gynécologue", telephone: "+221 77 222 33 44", email: "dr.ba@sante.sn", adresse: "Dakar, Point E", statut: "Actif" },
  { id: "PRE-005", numero: "PRE-005", nom: "Laboratoire Bio24", specialite: "Laboratoire", telephone: "+221 33 824 88 99", email: "contact@bio24.sn", adresse: "Dakar, Fann", statut: "Inactif" },
];

export const mockSinistres: Sinistre[] = [
  { id: "SIN-001", numero: "SIN-2024-001", assure: "Moussa Diop", type: "Consultation", date: "2024-06-15", montantReclame: "25,000 FCFA", montantValide: "20,000 FCFA", statut: "Payé" },
  { id: "SIN-002", numero: "SIN-2024-002", assure: "Aminata Fall", type: "Hospitalisation", date: "2024-07-02", montantReclame: "450,000 FCFA", montantValide: "405,000 FCFA", statut: "Validé" },
  { id: "SIN-003", numero: "SIN-2024-003", assure: "Ibrahima Ndiaye", type: "Pharmacie", date: "2024-07-10", montantReclame: "35,000 FCFA", montantValide: "", statut: "En attente" },
  { id: "SIN-004", numero: "SIN-2024-004", assure: "Fatou Sow", type: "Analyses", date: "2024-07-12", montantReclame: "85,000 FCFA", montantValide: "72,250 FCFA", statut: "Validé" },
  { id: "SIN-005", numero: "SIN-2024-005", assure: "Ousmane Ba", type: "Consultation", date: "2024-07-15", montantReclame: "15,000 FCFA", montantValide: "", statut: "Rejeté" },
];

export const mockChartData = [
  { mois: "Jan", sinistres: 45, remboursements: 38 },
  { mois: "Fév", sinistres: 52, remboursements: 45 },
  { mois: "Mar", sinistres: 38, remboursements: 35 },
  { mois: "Avr", sinistres: 65, remboursements: 58 },
  { mois: "Mai", sinistres: 48, remboursements: 42 },
  { mois: "Jun", sinistres: 56, remboursements: 50 },
  { mois: "Jul", sinistres: 42, remboursements: 38 },
];

export const mockRecentActivity = [
  { id: 1, action: "Nouvelle police créée", detail: "POL-2024-005 - CBAO Group", time: "Il y a 2h", type: "creation" },
  { id: 2, action: "Sinistre validé", detail: "SIN-2024-002 - Aminata Fall", time: "Il y a 3h", type: "validation" },
  { id: 3, action: "Remboursement effectué", detail: "SIN-2024-001 - 20,000 FCFA", time: "Il y a 5h", type: "payment" },
  { id: 4, action: "Nouvel assuré ajouté", detail: "Ousmane Ba - ASS-2024-005", time: "Il y a 6h", type: "creation" },
  { id: 5, action: "Prescription ajoutée", detail: "Dr. Diallo pour Moussa Diop", time: "Il y a 8h", type: "medical" },
];
