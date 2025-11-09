import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MoreVertical, BarChart3, Calendar, Users, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const PatientConsultations = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();

  // Mock consultation data - in real app would fetch based on patientId
  const consultations = [
    { id: 1, date: "15 de Junho - 8:30" },
    { id: 2, date: "12 de Junho - 12:30" },
    { id: 3, date: "01 de Junho - 17:30" },
    { id: 4, date: "05 de Junho - 16:30" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/psychologist/patient/${patientId}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Consultas Realizadas</h1>
            <p className="text-sm text-muted-foreground">Sessões</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4 pb-24">
        {consultations.map((consultation) => (
          <Card key={consultation.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{consultation.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-primary">
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

export default PatientConsultations;