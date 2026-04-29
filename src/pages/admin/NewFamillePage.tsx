import { useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import QuestionnaireStep from "./nouvelle-famille/QuestionnaireStep";
import FamilleFormStep   from "./nouvelle-famille/FamilleFormStep";

// Re-exports pour les pages qui importent depuis ce fichier
export {
  PRIME_ENFANT, PRIME_ADULTE, PRIME_ADULTE_AGE, TAUX_TAXE,
  TYPE_LABELS, TYPE_PRICES, TYPE_COLORS,
  GARANTIES_CNART, REAJUSTEMENT_SP, DUREES,
  typeFromDate, calcDecompte, getGarantiesCNART, newBeneficiaire,
} from "./nouvelle-famille/types";
export type { TypeAssure, Beneficiaire } from "./nouvelle-famille/types";

export default function NewFamillePage() {
  const [searchParams]  = useSearchParams();
  const isEditing       = searchParams.has("id");

  const [questStep,    setQuestStep]    = useState<"questionnaire" | "form">(isEditing ? "form" : "questionnaire");
  const [questAnswers, setQuestAnswers] = useState<Record<string, string>>({});

  useLayoutEffect(() => {
    document.querySelector("main")?.scrollTo(0, 0);
  }, [questStep]);

  if (questStep === "questionnaire") {
    return (
      <QuestionnaireStep
        answers={questAnswers}
        onChange={setQuestAnswers}
        onContinue={() => setQuestStep("form")}
      />
    );
  }

  return (
    <FamilleFormStep
      questAnswers={questAnswers}
      onBack={() => setQuestStep("questionnaire")}
    />
  );
}
