import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit, BarChart3, Calendar, Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PsychologistProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/psychologist/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6 pb-24">
        {/* Profile Picture and Name */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Carlos</h1>
          
          {/* Edit Profile Button */}
          <Button variant="psychologist" className="w-full max-w-sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit profile
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Pacientes</p>
            <p className="text-2xl font-bold text-foreground">29</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Consultas</p>
            <p className="text-2xl font-bold text-foreground">932</p>
          </div>
        </div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Informações</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm text-muted-foreground">Nome:</label>
              <div className="border-b border-border pb-2 mt-1">
                <span className="text-foreground">Carlos</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Data de Nascimento:</label>
              <div className="border-b border-border pb-2 mt-1">
                <span className="text-foreground"></span>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">CRP:</label>
              <div className="border-b border-border pb-2 mt-1">
                <span className="text-foreground"></span>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Convênio:</label>
              <div className="border-b border-border pb-2 mt-1">
                <span className="text-foreground"></span>
              </div>
            </div>
          </div>
        </Card>

        {/* Exit Button */}
        <Button variant="psychologist" className="w-full">
          Sair
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <BarChart3 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PsychologistProfile;