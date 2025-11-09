import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSelection from "./pages/UserSelection";
import PsychologistRegister from "./pages/psychologist/PsychologistRegister";
import PsychologistDashboard from "./pages/psychologist/PsychologistDashboard";
import PsychologistProfile from "./pages/psychologist/PsychologistProfile";
import PsychologistPatients from "./pages/psychologist/PsychologistPatients";
import PsychologistCalendar from "./pages/psychologist/PsychologistCalendar";
import PsychologistGenerateInvite from "./pages/psychologist/PsychologistGenerateInvite";
import PsychologistShareInvite from "./pages/psychologist/PsychologistShareInvite";
import PsychologistPatientProfile from "./pages/psychologist/PatientProfile";
import PatientConsultations from "./pages/psychologist/PatientConsultations";
import PatientRegister from "./pages/patient/PatientRegister";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientCalendar from "./pages/patient/PatientCalendar";
import PatientQuestionnaire from "./pages/patient/PatientQuestionnaire";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientDocuments from "./pages/patient/PatientDocuments";
import PatientDailyRecords from "./pages/patient/PatientDailyRecords";
import PatientAddRecord from "./pages/patient/PatientAddRecord";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/psychologist/login" element={<Login />} />
          <Route path="/patient/login" element={<Login />} />
          <Route path="/psychologist/register" element={<PsychologistRegister />} />
          <Route path="/psychologist/dashboard" element={<PsychologistDashboard />} />
          <Route path="/psychologist/profile" element={<PsychologistProfile />} />
          <Route path="/psychologist/patients" element={<PsychologistPatients />} />
          <Route path="/psychologist/calendar" element={<PsychologistCalendar />} />
          <Route path="/psychologist/generate-invite" element={<PsychologistGenerateInvite />} />
          <Route path="/psychologist/share-invite" element={<PsychologistShareInvite />} />
          <Route path="/psychologist/patient/:patientId" element={<PsychologistPatientProfile />} />
          <Route path="/psychologist/patient/:patientId/consultations" element={<PatientConsultations />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/calendar" element={<PatientCalendar />} />
        <Route path="/patient/questionnaire" element={<PatientQuestionnaire />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/documents" element={<PatientDocuments />} />
        <Route path="/patient/daily-records" element={<PatientDailyRecords />} />
        <Route path="/patient/add-record" element={<PatientAddRecord />} />
          <Route path="/patient/forgot-password" element={<ForgotPassword />} />
          <Route path="/psychologist/forgot-password" element={<ForgotPassword />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
