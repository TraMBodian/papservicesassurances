import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: "Succès",
        description: "Connexion réussie! Redirection en cours...",
      });
      // Redirect based on role will be handled by the app routing
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#E8F4F8' }}>
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-gray-600 mt-2">Accédez à votre espace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2"
              disabled={loading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou</span>
          </div>
        </div>

        {/* Sign up options */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 text-center mb-3">Créer un nouveau compte en tant que:</p>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate('/signup?role=admin')}
          >
            Administrateur
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate('/signup?role=prestataire')}
          >
            Prestataire
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate('/signup?role=client')}
          >
            Client
          </Button>
        </div>

        {/* Home button */}
        <div className="mt-6 text-center">
          <button type="button" onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-blue-600">
            Retour à l'accueil
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
