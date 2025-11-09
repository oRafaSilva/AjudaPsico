import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Check } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = () => {
    if (email) {
      setEmailSent(true);
    }
  };

  const handleOpenEmailApp = () => {
    // Mock action to open email app
    console.log("Opening email app...");
  };

  const handleGoBack = () => {
    navigate("/patient/login");
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6 text-white">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Email enviado!</h1>
          <p className="text-white/90 mb-12 leading-relaxed">
            O email com link para recuperação da sua senha foi enviado, confira na caixa de email e também no spam!
          </p>

          <div className="space-y-4">
            <Button
              variant="secondary"
              className="w-full h-12 bg-white text-primary hover:bg-white/90"
              onClick={handleOpenEmailApp}
            >
              Abrir aplicativo do email
            </Button>
            
            <Button
              variant="ghost"
              className="w-full h-12 text-white hover:bg-white/10"
              onClick={handleGoBack}
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col px-6">
      {/* Header */}
      <div className="flex items-center pt-12 pb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoBack}
          className="text-foreground"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Digite seu email</h1>
          <p className="text-muted-foreground">
            Será enviado um email para recuperar sua senha
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
            <Input
              type="email"
              placeholder="Digite o email de cadastro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 border-border"
            />
          </div>
        </div>

        <Button
          variant="psychologist"
          className="w-full h-12"
          onClick={handleSendEmail}
          disabled={!email}
        >
          ENVIAR
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;