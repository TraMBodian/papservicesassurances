import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import RegistrationManagementPage from "./pages/RegistrationManagementPage";
import AssuresPage from "./pages/AssuresPage";
import AssureDetailsPage from "./pages/AssureDetailsPage";
import NewAssurePage from "./pages/NewAssurePage";
import PolicesPage from "./pages/PolicesPage";
import NewPolicePage from "./pages/NewPolicePage";
import SinistresPage from "./pages/SinistresPage";
import SinistreDetailsPage from "./pages/SinistreDetailsPage";
import RemboursementsPage from "./pages/RemboursementsPage";
import PrestatairesPage from "./pages/PrestatairesPage";
import NewPrestatairePage from "./pages/NewPrestatairePage";
import CartesPage from "./pages/CartesPage";
import ConsultationsPage from "./pages/ConsultationsPage";
import NewConsultationPage from "./pages/NewConsultationPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import NewPrescriptionPage from "./pages/NewPrescriptionPage";
import PrescriptionDetailsPage from "./pages/PrescriptionDetailsPage";
import MaladieGroupePage from "./pages/MaladieGroupePage";
import NewGroupePage from "./pages/NewGroupePage";
import MaladieFamillePage from "./pages/MaladieFamillePage";
import NewFamillePage from "./pages/NewFamillePage";
import AdminProfilePage from "./pages/AdminProfilePage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/registrations" element={<RegistrationManagementPage />} />
          <Route path="/assures" element={<AssuresPage />} />
          <Route path="/assures/new" element={<NewAssurePage />} />
          <Route path="/assures/:id" element={<AssureDetailsPage />} />
          <Route path="/polices" element={<PolicesPage />} />
          <Route path="/polices/new" element={<NewPolicePage />} />
          <Route path="/maladie-famille" element={<MaladieFamillePage />} />
          <Route path="/maladie-famille/new" element={<NewFamillePage />} />
          <Route path="/maladie-groupe" element={<MaladieGroupePage />} />
          <Route path="/maladie-groupe/new" element={<NewGroupePage />} />
          <Route path="/sinistres" element={<SinistresPage />} />
          <Route path="/sinistres/:id" element={<SinistreDetailsPage />} />
          <Route path="/remboursements" element={<RemboursementsPage />} />
          <Route path="/prestataires" element={<PrestatairesPage />} />
          <Route path="/prestataires/new" element={<NewPrestatairePage />} />
          <Route path="/cartes" element={<CartesPage />} />
          <Route path="/consultations" element={<ConsultationsPage />} />
          <Route path="/consultations/new" element={<NewConsultationPage />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/prescriptions/new" element={<NewPrescriptionPage />} />
          <Route path="/prescriptions/:id" element={<PrescriptionDetailsPage />} />
          <Route path="/profile" element={<AdminProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
