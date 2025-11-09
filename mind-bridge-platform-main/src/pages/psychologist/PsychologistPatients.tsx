import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MoreVertical, BarChart3, Calendar, Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PsychologistPatients = () => {
  const navigate = useNavigate();

  const patients = [
    { id: 1, name: "Carlos", age: "19 anos" },
    { id: 2, name: "Kaique", age: "21 anos" },
    { id: 3, name: "Kaique", age: "18 anos" },
    { id: 4, name: "Kaique", age: "23 anos" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/psychologist/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Meus pacientes</h1>
            <p className="text-sm text-muted-foreground">Sessões</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4 pb-24">
        {patients.map((patient) => (
          <Card key={patient.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">{patient.age}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary"
                onClick={() => navigate(`/psychologist/patient/${patient.id}`)}
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        ))}
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
          <Button variant="ghost" size="icon" className="text-primary">
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

export default PsychologistPatients;