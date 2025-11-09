import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Calendar, Home, MessageCircle, User, Edit } from "lucide-react";

const PatientProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/patient/dashboard")}
            className="mr-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Carlos" />
            <AvatarFallback className="text-lg font-semibold">C</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-foreground mb-6">Carlos</h1>
          
          <div className="w-full space-y-3">
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg font-medium"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit profile
            </Button>
            
            <Button 
              className="w-full bg-blue-500 text-white hover:bg-blue-600 h-12 rounded-lg font-medium"
              onClick={() => navigate("/patient/documents")}
            >
              Meus Documentos
            </Button>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="px-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-6">Informações</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm text-muted-foreground">Nome:</label>
              <div className="border-b border-border pb-2 mt-1">
                <span className="text-foreground">Carlos Santos</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Data de Nascimento:</label>
              <div className="border-b border-border pb-2 mt-1">
                <span className="text-foreground">15/03/1985</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">CPF:</label>
              <div className="border-b border-border pb-2 mt-1">
                <span className="text-foreground">123.456.789-10</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Convênio:</label>
              <div className="border-b border-border pb-2 mt-1">
                <span className="text-foreground">Unimed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 pb-24">
          <Button 
            className="w-32 mx-auto block bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
            onClick={() => navigate("/")}
          >
            Sair
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/patient/dashboard")}>
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/patient/calendar")}>
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;