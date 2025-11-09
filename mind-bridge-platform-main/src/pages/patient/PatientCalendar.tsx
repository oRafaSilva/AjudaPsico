import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const PatientCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 24)); // June 2025

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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

  const appointments = [
    {
      id: 1,
      date: "17 de Junho • 8:30",
      psychologist: "Psicóloga Joana",
      type: "Consulta Agendada",
      color: "bg-purple-100"
    },
    {
      id: 2,
      date: "22 de Junho • 8:30",
      psychologist: "Psicóloga Ana",
      type: "Consulta Agendada", 
      color: "bg-orange-100"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between pt-12 pb-6 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/patient/dashboard")}
          className="text-foreground"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">Calendário</h1>
        <div className="w-10" />
      </div>

      {/* Calendar */}
      <div className="px-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
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
                  <span className={`text-sm w-8 h-8 flex items-center justify-center rounded-full ${
                    day === 10 ? 'bg-primary text-primary-foreground font-medium' : 
                    day === 17 || day === 22 ? 'bg-primary/20 text-primary font-medium' :
                    'text-foreground hover:bg-muted'
                  }`}>
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Future Appointments */}
      <div className="px-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Consultas Futuras</h3>
        
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-8 rounded-full ${appointment.color}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{appointment.type}</p>
                    <p className="text-sm text-muted-foreground">{appointment.psychologist}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{appointment.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20" />
    </div>
  );
};

export default PatientCalendar;