import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";

const PsychologistLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login logic
    navigate("/psychologist/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-12 pb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-foreground"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="flex flex-col items-center">
          <img 
            src={brainLogo} 
            alt="PsicoAjuda" 
            className="w-12 h-12 mb-2"
          />
          <span className="text-sm text-muted-foreground">PsicoAjuda</span>
        </div>
        
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-foreground mb-8">Bem-vindo Psicólogo!</h1>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 border-border"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 h-12 border-border"
            />
          </div>

          <div className="text-right">
            <Link 
              to="/psychologist/forgot-password" 
              className="text-primary text-sm hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>

        <Button
          variant="psychologist"
          className="w-full h-12 mb-4"
          onClick={handleLogin}
        >
          ENTRAR
        </Button>

        <div className="text-center">
          <Link 
            to="/psychologist/register" 
            className="text-primary text-sm hover:underline"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PsychologistLogin;