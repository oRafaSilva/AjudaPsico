import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus, User, BarChart3, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import brainLogo from "@/assets/brain-logo.png";

const PsychologistCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2020, 5, 10)); // June 10, 2020

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];

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

  const appointmentDays = [4, 17, 22]; // Days with appointments
  const selectedDay = 10;

  const appointments = [
    { id: 1, name: "Carlos", age: "19 anos", time: "01/07/2025 09:30" },
    { id: 2, name: "João", age: "15 anos", time: "01/07/2025 09:30" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/psychologist/dashboard')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar */}
        <Card className="p-6 bg-card">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((day, index) => (
              <div key={index} className="text-center p-2 relative">
                {day && (
                  <>
                    <span className={`text-lg font-medium ${
                      day === selectedDay 
                        ? 'bg-psychologist text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto' 
                        : 'text-foreground'
                    }`}>
                      {day}
                    </span>
                    {appointmentDays.includes(day) && day !== selectedDay && (
                      <div className="w-2 h-2 bg-psychologist rounded-full mx-auto mt-1"></div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Appointments */}
      <div className="px-6 pb-24">
        <h2 className="text-lg font-bold text-foreground mb-4">Consultas Marcadas:</h2>
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-4 bg-gradient-to-r from-card to-psychologist/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{appointment.name}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-20 right-6">
        <Button 
          size="icon" 
          className="w-14 h-14 rounded-full bg-psychologist hover:bg-psychologist/90 text-white shadow-lg"
          onClick={() => navigate('/psychologist/generate-invite')}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <BarChart3 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-psychologist">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PsychologistCalendar;