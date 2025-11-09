import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Calendar, Home, MessageCircle, User, Download, MoreHorizontal } from "lucide-react";

const PatientDocuments = () => {
  const navigate = useNavigate();

  const documents = [
    {
      id: 1,
      type: "Atestado",
      psychologist: "Psicóloga Joana",
      date: "27 de Junho - 8:30",
      color: "bg-primary",
      status: "completed"
    },
    {
      id: 2,
      type: "Laudo Psicológico",
      psychologist: "Psicóloga Ana",
      date: "22 de Junho - 8:30",
      color: "bg-yellow-500",
      status: "in-progress"
    },
    {
      id: 3,
      type: "Atestado",
      psychologist: "Psicóloga Joana",
      date: "11 de Junho - 8:30",
      color: "bg-primary",
      status: "completed"
    },
    {
      id: 4,
      type: "Atestado",
      psychologist: "Psicóloga Ana",
      date: "02 de Junho - 8:30",
      color: "bg-yellow-500",
      status: "in-progress"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/patient/profile")}
            className="mr-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Meus documentos</h1>
        </div>
      </div>

      {/* Documents List */}
      <div className="px-6 space-y-4 pb-24">
        {documents.map((doc) => (
          <Card key={doc.id} className="relative overflow-hidden">
            {/* Colored corner indicator */}
            <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] ${doc.color}`} />
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">{doc.type}</h3>
                <p className="text-sm text-muted-foreground mb-2">{doc.psychologist}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{doc.date}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  
                  {doc.status === "in-progress" && (
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/patient/dashboard")}>
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/patient/calendar")}>
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientDocuments;