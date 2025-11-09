import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Home, Calendar, MessageCircle, User } from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";
import meditationTip from "@/assets/meditation-tip.png";
import sleepTip from "@/assets/sleep-tip.png";
import supabase from "@/lib/supabase";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 24)); // June 24, 2025

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const dailyProgress = [
    { day: "S", completed: true },
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: false },
    { day: "T", completed: false },
    { day: "F", completed: false },
    { day: "S", completed: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">Olá, Carlos.</h1>
            <p className="text-sm text-muted-foreground">Jun 24th, 2021</p>
          </div>
          <div className="flex items-center gap-4">
            <img 
              src={brainLogo} 
              alt="PsicoAjuda" 
              className="w-8 h-8"
            />
            <div 
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer"
              onClick={() => navigate("/patient/profile")}
            >
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Calendar */}
        <Card className="p-4 bg-primary/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-foreground">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((day, index) => (
              <div key={index} className="text-center p-2">
                {day && (
                  <span className={`text-sm ${day === 24 ? 'bg-primary text-primary-foreground rounded-full px-2 py-1' : 'text-foreground'}`}>
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Questionnaires */}
        <Card className="p-4 cursor-pointer hover:bg-primary/5" onClick={() => navigate("/patient/questionnaire")}>
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Meus questionários</h3>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>

        {/* Daily Progress */}
        <Card className="p-4 cursor-pointer hover:bg-primary/5" onClick={() => navigate("/patient/daily-records")}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-foreground">Seu registro diário</h3>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">Últimos 7 dias</p>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '43%' }}></div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-foreground">3/7</span>
            <span className="text-sm text-muted-foreground">Conquistas</span>
          </div>
          
          <div className="flex gap-1 justify-between">
            {[
              { day: 'S', emoji: '😊', completed: true },
              { day: 'S', emoji: '', completed: false },
              { day: 'M', emoji: '😊', completed: true },
              { day: 'T', emoji: '', completed: false },
              { day: 'W', emoji: '', completed: false },
              { day: 'T', emoji: '😊', completed: true },
              { day: 'F', emoji: '', completed: false },
            ].map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-1 ${
                    day.completed 
                      ? 'border-primary bg-primary/10' 
                      : 'border-muted bg-muted/20'
                  }`}
                >
                  {day.emoji ? (
                    <span className="text-lg">{day.emoji}</span>
                  ) : (
                    <div className={`w-3 h-3 rounded-full ${day.completed ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Psychology Tips */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Dicas do psicólogo(a)</h3>
            <span className="text-sm text-primary">Ver todas</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <img 
                src={meditationTip} 
                alt="Dica de Respiração" 
                className="w-full h-24 object-cover"
              />
              <div className="p-3">
                <p className="text-xs font-medium text-foreground">Dica de Respiração</p>
              </div>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src={sleepTip} 
                alt="Dica de Sono" 
                className="w-full h-24 object-cover"
              />
              <div className="p-3">
                <p className="text-xs font-medium text-foreground">Dica de Sono</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" size="icon" className="text-primary">
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/patient/calendar")}>
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;