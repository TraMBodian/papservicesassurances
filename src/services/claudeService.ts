const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string;
const API_URL = "https://api.anthropic.com/v1/messages";

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

async function callClaude(
  system: string,
  messages: ClaudeMessage[],
  maxTokens = 1024
): Promise<string> {
  if (!API_KEY) throw new Error("Clé API Anthropic manquante (VITE_ANTHROPIC_API_KEY)");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.error?.message ?? `Erreur API ${res.status}`);
  }

  const data = await res.json();
  return (data.content?.[0]?.text as string) ?? "";
}

// ── Chatbot Conditions Générales ─────────────────────────────────────────────
export async function chatConditionsGenerales(
  question: string,
  history: ClaudeMessage[],
  chapitresTexte: string
): Promise<string> {
  const system = `Tu es l'assistant virtuel d'Assurance Santé Connect, spécialisé dans les conditions générales d'assurance maladie.
Tu réponds uniquement à partir des informations suivantes. Si la réponse n'est pas dans le texte, dis-le clairement.
Réponds en français, de manière concise et professionnelle.

CONTENU DES CONDITIONS GÉNÉRALES :
${chapitresTexte}`;

  return callClaude(system, [...history, { role: "user", content: question }]);
}

// ── Aide à la prescription ────────────────────────────────────────────────────
export async function suggestPrescription(params: {
  medicament: string;
  diagnostic: string;
  age?: string;
}): Promise<string> {
  const system = `Tu es un assistant médical pour un système de gestion d'assurance santé au Sénégal.
Tu fournis des suggestions de posologie et durée de traitement basées sur les pratiques médicales standard.
Réponds toujours en précisant que ces suggestions doivent être validées par un médecin.
Réponds en français, de façon concise et structurée.`;

  const prompt = `Médicament : ${params.medicament}
Diagnostic/Pathologie : ${params.diagnostic}
${params.age ? `Âge du patient : ${params.age}` : ""}

Suggère : posologie recommandée, durée habituelle du traitement, et les précautions principales.`;

  return callClaude(system, [{ role: "user", content: prompt }], 512);
}

// ── Vérification remboursement ────────────────────────────────────────────────
export async function verifyRemboursement(params: {
  acte: string;
  montant: number;
  garanties: Record<string, number>;
  typeAssure: string;
}): Promise<string> {
  const system = `Tu es un expert en remboursement d'assurance santé.
Analyse les demandes de remboursement en vérifiant la couverture et les plafonds.
Réponds en français, de manière structurée avec une décision claire.`;

  const garantiesStr = Object.entries(params.garanties)
    .map(([k, v]) => `${k} : ${v.toLocaleString("fr-FR")} FCFA`)
    .join("\n");

  const prompt = `Acte médical : ${params.acte}
Montant demandé : ${params.montant.toLocaleString("fr-FR")} FCFA
Type d'assuré : ${params.typeAssure}
Garanties disponibles :
${garantiesStr}

Analyse : cet acte est-il couvert ? Quel est le montant remboursable ? Y a-t-il des anomalies ?`;

  return callClaude(system, [{ role: "user", content: prompt }], 512);
}

// ── Résumé sinistre ───────────────────────────────────────────────────────────
export async function analyzeSinistre(params: {
  description: string;
  montant: number;
  historique: string;
}): Promise<string> {
  const system = `Tu es un expert en gestion de sinistres d'assurance santé.
Tu analyses les déclarations de sinistres pour détecter les incohérences et générer un résumé d'instruction.
Réponds en français, avec une évaluation du niveau de risque (Faible/Moyen/Élevé) et une recommandation.`;

  const prompt = `Description du sinistre : ${params.description}
Montant déclaré : ${params.montant.toLocaleString("fr-FR")} FCFA
Historique patient : ${params.historique}

Génère un résumé d'instruction avec : niveau de risque, points d'attention, et recommandation (accepter/investiguer/rejeter).`;

  return callClaude(system, [{ role: "user", content: prompt }], 600);
}
