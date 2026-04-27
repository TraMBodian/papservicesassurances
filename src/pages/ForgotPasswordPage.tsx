import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BRAND = "#1B5299";
const API   = import.meta.env.VITE_API_BASE_URL || "/api";

type Step = "email" | "otp" | "newpass" | "done";

async function post(url: string, body: object) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await r.json();
  if (!r.ok || json.success === false) throw new Error(json.message || json.data || "Erreur");
  return json;
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step,     setStep]     = useState<Step>("email");
  const [email,    setEmail]    = useState("");
  const [code,     setCode]     = useState("");
  const [pwd,      setPwd]      = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleEmail = async () => {
    if (!email.trim()) return setError("Entrez votre email");
    setError(""); setLoading(true);
    try {
      await post(`${API}/auth/forgot-password`, { email });
      setStep("otp");
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleOtp = async () => {
    if (code.length !== 6) return setError("Le code doit contenir 6 chiffres");
    setError(""); setLoading(true);
    try {
      await post(`${API}/auth/verify-otp`, { email, code });
      setStep("newpass");
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleReset = async () => {
    if (pwd.length < 6) return setError("Mot de passe trop court (min 6 caractères)");
    if (pwd !== confirm) return setError("Les mots de passe ne correspondent pas");
    setError(""); setLoading(true);
    try {
      await post(`${API}/auth/reset-password`, { email, code, newPassword: pwd });
      setStep("done");
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const steps: Step[] = ["email", "otp", "newpass"];
  const stepIdx = steps.indexOf(step);

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #1e3c72, #2a5298)" }}>

      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <button onClick={() => navigate("/login")}
            className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6">
            ← Retour à la connexion
          </button>

          {/* Indicateur d'étape */}
          {step !== "done" && (
            <div className="flex items-center gap-2 mb-6">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < stepIdx ? "bg-green-500 text-white"
                    : i === stepIdx ? "text-white" : "bg-gray-200 text-gray-500"
                  }`} style={i === stepIdx ? { background: BRAND } : {}}>
                    {i < stepIdx ? "✓" : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 w-8 ${i < stepIdx ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Titre */}
          <h1 className="text-2xl font-black text-gray-900 mb-1">
            {step === "email"   && "Mot de passe oublié"}
            {step === "otp"     && "Vérification"}
            {step === "newpass" && "Nouveau mot de passe"}
            {step === "done"    && "Mot de passe réinitialisé !"}
          </h1>
          <p className="text-sm text-gray-500">
            {step === "email"   && "Entrez votre email pour recevoir un code de vérification"}
            {step === "otp"     && `Entrez le code à 6 chiffres envoyé à ${email}`}
            {step === "newpass" && "Choisissez un nouveau mot de passe sécurisé"}
            {step === "done"    && "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe"}
          </p>
        </div>

        <div className="px-8 pb-8 space-y-4">
          {/* Étape 1 — Email */}
          {step === "email" && (
            <>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleEmail()}
                placeholder="votre@email.com" autoFocus
                className="w-full px-4 py-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300" />
              {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              <button onClick={handleEmail} disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${BRAND}, #2a5298)` }}>
                {loading ? "Envoi…" : "Envoyer le code"}
              </button>
            </>
          )}

          {/* Étape 2 — OTP */}
          {step === "otp" && (
            <>
              <p className="text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                Si l'email n'est pas configuré sur le serveur, le code est affiché dans les logs Railway.
              </p>
              <input type="text" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyDown={e => e.key === "Enter" && handleOtp()}
                placeholder="000000" autoFocus maxLength={6}
                className="w-full px-4 py-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 text-center tracking-[0.5em] text-xl font-bold font-mono" />
              {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              <button onClick={handleOtp} disabled={loading || code.length !== 6}
                className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${BRAND}, #2a5298)` }}>
                {loading ? "Vérification…" : "Vérifier le code"}
              </button>
              <button onClick={() => { setStep("email"); setCode(""); }}
                className="w-full text-sm text-gray-400 hover:text-gray-600 py-1">
                Renvoyer le code
              </button>
            </>
          )}

          {/* Étape 3 — Nouveau mot de passe */}
          {step === "newpass" && (
            <>
              <input type="password" value={pwd} onChange={e => setPwd(e.target.value)}
                placeholder="Nouveau mot de passe (min 6 car.)" autoFocus
                className="w-full px-4 py-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300" />
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleReset()}
                placeholder="Confirmer le mot de passe"
                className="w-full px-4 py-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300" />
              {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              <button onClick={handleReset} disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${BRAND}, #2a5298)` }}>
                {loading ? "Enregistrement…" : "Réinitialiser le mot de passe"}
              </button>
            </>
          )}

          {/* Étape 4 — Succès */}
          {step === "done" && (
            <>
              <div className="flex flex-col items-center py-4 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="w-8 h-8">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <button onClick={() => navigate("/login")}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${BRAND}, #2a5298)` }}>
                  Se connecter
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
