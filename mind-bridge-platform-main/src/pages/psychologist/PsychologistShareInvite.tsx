import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Copy, User, BarChart3, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import brainLogo from "@/assets/brain-logo.png";
import { toast } from "@/hooks/use-toast";

const PsychologistShareInvite = () => {
  const navigate = useNavigate();
  const inviteLink = "https://ajudapsico.app.link/ue6...";
  const accessCode = "UpAU-821w";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Convite PsicoAjuda',
        text: `Código de acesso: ${accessCode}`,
        url: inviteLink,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      toast({
        title: "Compartilhar",
        description: "Use o link e código para compartilhar o convite.",
      });
    }
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
              onClick={() => navigate('/psychologist/generate-invite')}
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
      <div className="px-6 space-y-8 pb-24">
        {/* Copy Link Section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Copiar Link</h2>
          <Card className="p-4 bg-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground truncate flex-1">
                {inviteLink}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyLink}
                className="ml-2 flex-shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Access Code Section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Código de Acesso</h2>
          <Card className="p-8 bg-card">
            <div className="text-center">
              <span className="text-3xl font-bold text-foreground">
                {accessCode}
              </span>
            </div>
          </Card>
        </div>

        {/* Share Button */}
        <div className="pt-4">
          <Button 
            onClick={handleShare}
            className="w-full bg-psychologist hover:bg-psychologist/90 text-white py-3 rounded-full text-base font-medium"
          >
            Compartilhar
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

export default PsychologistShareInvite;