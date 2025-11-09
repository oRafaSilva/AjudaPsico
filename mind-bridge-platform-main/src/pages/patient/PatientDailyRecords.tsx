import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, MoreVertical } from "lucide-react";

const PatientDailyRecords = () => {
  const navigate = useNavigate();
  
  const [records] = useState([
    {
      id: 1,
      day: "Segunda-Feira",
      date: "Março, 23",
      emoji: "😊",
      mood: "Feliz"
    },
    {
      id: 2,
      day: "Domingo",
      date: "Março, 22",
      emoji: "😐",
      mood: "Neutro"
    },
    {
      id: 3,
      day: "Sábado",
      date: "Março, 21",
      emoji: "😰",
      mood: "Ansioso"
    },
    {
      id: 4,
      day: "Quinta-Feira",
      date: "Março, 19",
      emoji: "😊",
      mood: "Feliz"
    },
    {
      id: 5,
      day: "Quarta-feira",
      date: "Março, 18",
      emoji: "😐",
      mood: "Neutro"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/patient/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Meus registros</h1>
          </div>
          <Button 
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground"
            onClick={() => navigate("/patient/add-record")}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Records List */}
      <div className="px-6 space-y-4">
        {records.map((record) => (
          <Card key={record.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-muted/30 flex items-center justify-center">
                  <span className="text-2xl">{record.emoji}</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{record.day}</h3>
                  <p className="text-sm text-muted-foreground">{record.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientDailyRecords;