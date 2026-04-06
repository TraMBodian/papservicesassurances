import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  language?: string;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour! Je suis votre assistant virtuel. Je peux vous aider en Français, Wolof, Pulaar, Sérère. Comment puis-je vous aider?",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("fr");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const responses: Record<string, Record<string, string>> = {
    fr: {
      assurance: "Notre assurance santé couvre les consultations, médicaments, hospitalisations et analyses médicales.",
      prix: "Les cotisations varient selon le type de contrat: Individuel (25 000 FCFA/mois), Famille (50 000 FCFA/mois), Groupe (sur devis).",
      inscription: "Pour vous inscrire, cliquez sur 'Commencer' et remplissez le formulaire. Un conseiller vous contactera sous 24h.",
      remboursement: "Les remboursements sont effectués sous 48h après validation de votre dossier.",
      couverture: "Nous couvrons: consultations (100%), médicaments (80%), hospitalisation (90%), analyses (100%), chirurgie (85%).",
      documents: "Documents nécessaires: carte d'identité, photo, justificatif de domicile, certificat médical.",
      urgence: "En cas d'urgence, appelez le 15 ou rendez-vous à l'hôpital le plus proche. Votre carte d'assuré suffit.",
      pharmacie: "Nos pharmacies partenaires sont disponibles 24/7. Présentez votre carte d'assuré pour bénéficier de la couverture.",
      medecin: "Nous collaborons avec plus de 500 médecins et cliniques. Consultez la liste sur notre site ou appelez-nous.",
      beneficiaire: "Vous pouvez ajouter jusqu'à 5 bénéficiaires (conjoint, enfants). Chaque bénéficiaire est couvert à 100%.",
      resiliation: "La résiliation est possible à tout moment avec un préavis de 30 jours. Aucun frais de résiliation.",
      renouvellement: "Le renouvellement est automatique. Vous recevrez une notification 1 mois avant l'échéance.",
      sinistre: "Pour déclarer un sinistre: connectez-vous, allez dans 'Sinistres', cliquez sur 'Nouveau sinistre' et joignez vos documents.",
      delai: "Délais de traitement: Consultation (immédiat), Médicaments (24h), Hospitalisation (48h), Chirurgie (72h).",
      partenaire: "Nos partenaires: Hôpital Principal, Clinique Pasteur, Pharmacie Centrale, Laboratoire Biolab, et 200+ autres.",
      contact: "Contactez-nous: Tél: +221 33 123 45 67, Email: contact@asc.sn, WhatsApp: +221 77 123 45 67.",
      horaire: "Service client disponible: Lun-Ven 8h-18h, Sam 9h-13h. Urgences 24/7.",
      carte: "Votre carte d'assuré arrive sous 5 jours ouvrables. En attendant, utilisez votre numéro d'assuré.",
      famille: "Contrat Famille: couvre 2 adultes + 3 enfants. Tarif dégressif à partir du 3ème enfant.",
      groupe: "Contrat Groupe (entreprises): à partir de 10 employés. Tarifs préférentiels et gestion simplifiée.",
      maternite: "Maternité couverte à 100%: consultations prénatales, accouchement, césarienne, soins post-nataux.",
      dentaire: "Soins dentaires couverts à 70%: détartrage, plombages, extractions. Prothèses sur devis.",
      optique: "Optique: lunettes remboursées à 50% (max 50 000 FCFA/an). Lentilles non couvertes.",
      chronique: "Maladies chroniques (diabète, hypertension): couverture à 100% incluant médicaments et suivi.",
      default: "Je peux vous renseigner sur: assurance, prix, inscription, remboursements, couverture, documents, urgences, pharmacies, médecins, bénéficiaires, résiliation, sinistres, partenaires, contact, horaires, cartes, maternité, dentaire, optique, maladies chroniques."
    },
    wo: {
      assurance: "Suñu asiraans bi dafa jëkk consultation, médicament, hôpital ak analyse yi.",
      prix: "Cotisation bi: Individuel (25 000 FCFA/weer), Famille (50 000 FCFA/weer).",
      inscription: "Ngir di bind, bësal ci 'Commencer' te fey formulaire bi.",
      remboursement: "Remboursement bi dañuy def ci 48h.",
      couverture: "Dañu jëkk: consultation (100%), médicament (80%), hôpital (90%), analyse (100%).",
      urgence: "Ci urgence, woote 15 walla dem ci hôpital bu gën jëgël. Carte assuré bi dafa am solo.",
      pharmacie: "Pharmacie yu ñu liggéey ak dañu am 24/7. Wone sa carte assuré ngir am couverture.",
      medecin: "Dañu liggéey ak 500+ médecin ak clinique. Gis liste bi ci site bu ñu walla woote.",
      contact: "Woote ñu: Tél: +221 33 123 45 67, Email: contact@asc.sn, WhatsApp: +221 77 123 45 67.",
      default: "Man mën nga joxe ci: assurance, prix, inscription, remboursement, couverture, urgence, pharmacie, médecin, contact."
    },
    ff: {
      assurance: "Asiraans men ɗum waɗi consultation, médicament, hôpital e analyse.",
      prix: "Cotisation: Individuel (25 000 FCFA/lewru), Famille (50 000 FCFA/lewru).",
      inscription: "Ngam winnditde, dobo 'Commencer' tee timmin formulaire.",
      remboursement: "Remboursement waɗɗaa e 48h.",
      couverture: "Min waɗi: consultation (100%), médicament (80%), hôpital (90%), analyse (100%).",
      urgence: "E urgence, noddu 15 walla yah e hôpital ɓurngu. Carte assuré maa tan.",
      pharmacie: "Pharmacie amen goɗɗe ɗum am 24/7. Hollu carte assuré maa ngam heɓde couverture.",
      medecin: "Min golli e 500+ médecin e clinique. Yiy liste e site men walla noddu.",
      contact: "Noddu men: Tél: +221 33 123 45 67, Email: contact@asc.sn, WhatsApp: +221 77 123 45 67.",
      default: "Mi waawi jalɗinde ma e: assurance, prix, inscription, remboursement, couverture, urgence, pharmacie, médecin, contact."
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user"
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = "";

      const keywords: Record<string, string[]> = {
        assurance: ["assurance", "couverture", "couvre"],
        prix: ["prix", "cotisation", "coût", "tarif", "payer"],
        inscription: ["inscription", "inscrire", "bind", "adhérer", "souscrire"],
        remboursement: ["remboursement", "rembourser", "paiement"],
        couverture: ["couvert", "pourcentage", "taux", "combien"],
        documents: ["document", "papier", "pièce", "fournir"],
        urgence: ["urgence", "urgent", "grave", "accident"],
        pharmacie: ["pharmacie", "médicament", "ordonnance"],
        medecin: ["médecin", "docteur", "clinique", "hôpital", "partenaire", "collaboration"],
        beneficiaire: ["bénéficiaire", "famille", "enfant", "conjoint", "ajouter"],
        resiliation: ["résilier", "annuler", "arrêter", "stopper"],
        renouvellement: ["renouveler", "renouvellement", "reconduire"],
        sinistre: ["sinistre", "déclarer", "dossier", "réclamation"],
        delai: ["délai", "combien de temps", "durée", "attendre"],
        partenaire: ["partenaire", "agence", "liste", "où"],
        contact: ["contact", "appeler", "téléphone", "email", "joindre"],
        horaire: ["horaire", "ouvert", "disponible", "quand"],
        carte: ["carte", "recevoir", "délai carte"],
        famille: ["famille", "familial"],
        groupe: ["groupe", "entreprise", "employé"],
        maternite: ["maternité", "grossesse", "accouchement", "enceinte"],
        dentaire: ["dentaire", "dent", "dentiste"],
        optique: ["optique", "lunette", "vue", "ophtalmologue"],
        chronique: ["chronique", "diabète", "hypertension", "maladie"]
      };

      for (const [key, words] of Object.entries(keywords)) {
        if (words.some(word => lowerInput.includes(word))) {
          response = responses[language][key] || responses[language].default;
          break;
        }
      }

      if (!response) {
        response = responses[language].default;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        language
      };

      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'fr' ? 'fr-FR' : language === 'wo' ? 'wo-SN' : 'ff-SN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Erreur de reconnaissance vocale. Veuillez réessayer.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'fr' ? 'fr-FR' : language === 'wo' ? 'wo-SN' : 'ff-SN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Votre navigateur ne supporte pas la synthèse vocale.");
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 animate-pulse"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div>
              <h3 className="font-bold">Assistant IA Multilingue</h3>
              <p className="text-xs opacity-90">Disponible 24/7</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 bg-gray-50 border-b flex gap-2">
            <Button
              size="sm"
              variant={language === "fr" ? "default" : "outline"}
              onClick={() => setLanguage("fr")}
            >
              Français
            </Button>
            <Button
              size="sm"
              variant={language === "wo" ? "default" : "outline"}
              onClick={() => setLanguage("wo")}
            >
              Wolof
            </Button>
            <Button
              size="sm"
              variant={language === "ff" ? "default" : "outline"}
              onClick={() => setLanguage("ff")}
            >
              Pulaar
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  {msg.sender === "bot" && (
                    <button
                      onClick={() => handleTextToSpeech(msg.text)}
                      className="mt-2 text-xs flex items-center gap-1 hover:underline"
                    >
                      <Volume2 className="w-3 h-3" /> Écouter
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t flex gap-2">
            <button
              onClick={handleVoiceInput}
              className={`p-2 rounded-lg ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200'} hover:bg-gray-300 transition-colors`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Tapez votre message..."
              className="flex-1"
            />
            <Button onClick={handleSend} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};
