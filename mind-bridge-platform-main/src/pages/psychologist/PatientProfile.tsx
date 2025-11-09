import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bell, ChevronRight, BarChart3, Calendar as CalendarIcon, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [paymentDate, setPaymentDate] = useState("01/07 - 2025");
  const [paymentValue, setPaymentValue] = useState("R$ 240,00");

  // Mock patient data - in real app would fetch based on patientId
  const patient = {
    name: "Carlos",
    age: "19 Anos",
    username: "@thejohndoe",
    summary: "Nesta semana, Carlos apresentou avanços sutis, mantendo uma postura estável e participativa. Demonstrou maior disposição",
    clinicalNotes: "Carlos é um paciente bastante colaborativo, sempre demonstra bom humor e receptividade durante os atendimentos. Seu comportamento positivo contribui para um ambiente acolhedor e leve"
  };

  const payments = [
    { id: 1, description: "Mensalidade de Março", amount: "R$ 240,00", date: "01/03 - 2025" },
    { id: 2, description: "Mensalidade de Fevereiro", amount: "R$ 240,00", date: "01/03 - 2025" },
    { id: 3, description: "Mensalidade de Janeiro", amount: "R$ 240,00", date: "01/03 - 2025" },
    { id: 4, description: "Mensalidade de Dezembro", amount: "R$ 240,00", date: "01/03 - 2025" },
  ];

  const handleAddPayment = () => {
    // Add payment logic here
    setIsAddPaymentOpen(false);
    setIsPaymentsOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/psychologist/patients')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Sheet open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6">
                  <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-foreground text-center mb-6">
                    Enviar email para relembrar paciente
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">Olá! Tudo bem?</p>
                      <p className="mb-2">Estamos passando para lembrar que sua consulta com o psicólogo está agendada.</p>
                      <p className="mb-2">Caso precise remarcar ou tenha alguma dúvida, estamos à disposição.</p>
                      <p>Até breve!</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto p-6 border-t border-border">
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="psychologist" 
                      className="flex-1"
                      onClick={() => {
                        // Send email logic here
                        setIsNotificationOpen(false);
                      }}
                    >
                      Enviar Email
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Patient Info */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
            <p className="text-muted-foreground">{patient.age}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4 pb-24">
        {/* Patient Summary */}
        <Card className="p-4 relative">
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
          </div>
          <h3 className="font-medium text-foreground mb-2">Resumo do paciente (IA)</h3>
          <p className="text-sm text-muted-foreground pr-12">{patient.summary}</p>
        </Card>

        {/* Clinical Notes */}
        <Card className="p-4">
          <h3 className="font-medium text-foreground mb-2">Anotações clínicas</h3>
          <p className="text-sm text-muted-foreground">{patient.clinicalNotes}</p>
        </Card>

        {/* Payments Section */}
        <Card className="p-4">
          <Sheet open={isPaymentsOpen} onOpenChange={setIsPaymentsOpen}>
            <SheetTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="font-medium text-foreground">Pagamentos</h3>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] p-0">
              <div className="flex flex-col h-full">
                {/* Patient Info Header */}
                <div className="bg-muted/50 p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{patient.name}</h2>
                  <p className="text-muted-foreground">{patient.age}</p>
                  <p className="text-sm text-muted-foreground">{patient.username}</p>
                </div>

                {/* Payments Content */}
                <div className="flex-1 p-6">
                  <div className="text-center mb-6">
                    <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-foreground">Pagamentos</h3>
                  </div>

                  <div className="space-y-3">
                    {payments.map((payment) => (
                      <Card key={payment.id} className="p-4 relative">
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                        <div className="pr-12">
                          <h4 className="font-medium text-foreground">{payment.description}</h4>
                          <p className="text-sm text-muted-foreground">{payment.amount}</p>
                        </div>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                            <CalendarIcon className="w-3 h-3 mr-1" />
                            {payment.date}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="p-6 border-t border-border">
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsPaymentsOpen(false)}
                    >
                      Voltar
                    </Button>
                    <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
                      <DialogTrigger asChild>
                        <Button variant="psychologist" className="flex-1">
                          Novo pagamento
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md p-0">
                        <div className="flex flex-col h-[90vh]">
                          {/* Patient Info Header */}
                          <div className="bg-muted/50 p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-2">
                              <User className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h2 className="text-xl font-bold text-foreground">{patient.name}</h2>
                            <p className="text-muted-foreground">{patient.age}</p>
                            <p className="text-sm text-muted-foreground">{patient.username}</p>
                          </div>

                          {/* Add Payment Content */}
                          <div className="flex-1 p-6">
                            <div className="text-center mb-6">
                              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4"></div>
                              <h3 className="text-lg font-semibold text-foreground">Adicionar pagamento</h3>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Data:
                                </label>
                                <Input
                                  value={paymentDate}
                                  onChange={(e) => setPaymentDate(e.target.value)}
                                  className="w-full"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Valor:
                                </label>
                                <Input
                                  value={paymentValue}
                                  onChange={(e) => setPaymentValue(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Bottom Buttons */}
                          <div className="p-6 border-t border-border">
                            <div className="flex gap-4">
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => setIsAddPaymentOpen(false)}
                              >
                                Voltar
                              </Button>
                              <Button 
                                variant="psychologist" 
                                className="flex-1"
                                onClick={handleAddPayment}
                              >
                                Adicionar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </Card>

        {/* Consultas Realizadas */}
        <Card className="p-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => navigate(`/psychologist/patient/${patientId}/consultations`)}
          >
            <h3 className="font-medium text-foreground">Consultas Realizadas</h3>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <BarChart3 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <CalendarIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;