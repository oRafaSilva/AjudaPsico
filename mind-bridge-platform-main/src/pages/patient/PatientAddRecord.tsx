import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const PatientAddRecord = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const currentDate = new Date();
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                     "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
  const formattedDate = `${monthNames[currentDate.getMonth()]}, ${currentDate.getDate()}`;

  const moods = [
    { id: 'bad', emoji: '😔', label: 'Mal' },
    { id: 'anxious', emoji: '😰', label: 'Ansioso' },
    { id: 'neutral', emoji: '😐', label: 'Neutro' },
    { id: 'satisfied', emoji: '😌', label: 'Satisfeito' },
    { id: 'happy', emoji: '😊', label: 'Feliz' }
  ];

  const handleAddRecord = () => {
    if (!selectedMood) {
      toast.error("Por favor, selecione como você está se sentindo hoje.");
      return;
    }

    toast.success("Registro adicionado com sucesso!");
    navigate("/patient/daily-records");
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
              onClick={() => navigate("/patient/daily-records")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Adicionar registro</h1>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        {/* Date */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">{formattedDate}</h2>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-medium text-foreground">Como você está se sentindo hoje?</h3>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Mood Options */}
          <div className="flex justify-between gap-2">
            {moods.map((mood) => (
              <div
                key={mood.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMood(mood.id)}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                    selectedMood === mood.id
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-muted/30'
                  }`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                </div>
                <span className={`text-sm ${
                  selectedMood === mood.id ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {mood.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="fixed bottom-8 left-6 right-6">
        <Button 
          className="w-full h-14 text-lg font-medium"
          onClick={handleAddRecord}
        >
          ADICIONAR
        </Button>
      </div>
    </div>
  );
};

export default PatientAddRecord;