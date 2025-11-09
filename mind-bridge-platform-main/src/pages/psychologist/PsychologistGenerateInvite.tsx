import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, User, BarChart3, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import brainLogo from "@/assets/brain-logo.png";

const PsychologistGenerateInvite = () => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState("");
  const [description, setDescription] = useState("");

  const handleGenerateInvite = () => {
    // Navigate to share invite screen
    navigate('/psychologist/share-invite');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/psychologist/calendar')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Olá, Psicólogo</h1>
              <p className="text-sm text-muted-foreground">Jun 24th, 2021</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img 
              src={brainLogo} 
              alt="PsicoAjuda" 
              className="w-8 h-8"
            />
            <div 
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/psychologist/profile')}
            >
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6 pb-24">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">Gerar convite para novo paciente</h2>
        </div>

        <div>
          <h3 className="text-base font-medium text-foreground mb-4">Editar</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sessionName" className="text-sm text-muted-foreground">
                Nome da Sessão
              </Label>
              <Input
                id="sessionName"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-psychologist"
                placeholder=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm text-muted-foreground">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-psychologist min-h-[100px] resize-none"
                placeholder=""
              />
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Button 
            onClick={handleGenerateInvite}
            className="w-full bg-psychologist hover:bg-psychologist/90 text-white py-3 rounded-full text-base font-medium"
          >
            Gerar Convite
          </Button>
        </div>
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
          <Button variant="ghost" size="icon" className="text-psychologist">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PsychologistGenerateInvite;