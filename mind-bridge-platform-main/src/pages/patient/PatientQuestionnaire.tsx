import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Como você tem se sentido na maior parte dos dias?",
    options: [
      { text: "Meio para baixo", emoji: "😔", score: 1 },
      { text: "Neutro", emoji: "😐", score: 2 },
      { text: "Muito bem", emoji: "😊", score: 3 }
    ]
  },
  {
    id: 2,
    question: "Com que frequência você se sente ansioso(a)?",
    options: [
      { text: "Sempre", emoji: "😰", score: 1 },
      { text: "Às vezes", emoji: "😐", score: 2 },
      { text: "Raramente", emoji: "😌", score: 3 }
    ]
  },
  {
    id: 3,
    question: "Como está a qualidade do seu sono?",
    options: [
      { text: "Ruim", emoji: "😴", score: 1 },
      { text: "Regular", emoji: "😐", score: 2 },
      { text: "Muito boa", emoji: "😊", score: 3 }
    ]
  },
  {
    id: 4,
    question: "Você tem se sentido motivado(a) ultimamente?",
    options: [
      { text: "Nada motivado", emoji: "😞", score: 1 },
      { text: "Um pouco", emoji: "😐", score: 2 },
      { text: "Muito motivado", emoji: "😃", score: 3 }
    ]
  },
  {
    id: 5,
    question: "Como você avalia seu nível de estresse?",
    options: [
      { text: "Muito alto", emoji: "😣", score: 1 },
      { text: "Moderado", emoji: "😐", score: 2 },
      { text: "Baixo", emoji: "😌", score: 3 }
    ]
  }
];

const PatientQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getTotalScore = () => {
    return answers.reduce((sum, score) => sum + score, 0);
  };

  const getScoreMessage = (score: number) => {
    if (score <= 8) {
      return {
        title: "Precisa de atenção",
        message: "Recomendamos conversar com seu psicólogo sobre como você tem se sentido.",
        color: "text-red-600"
      };
    } else if (score <= 12) {
      return {
        title: "Estado moderado",
        message: "Você está em um estado emocional equilibrado, continue cuidando de si.",
        color: "text-yellow-600"
      };
    } else {
      return {
        title: "Estado muito bom!",
        message: "Parabéns! Você está em um excelente estado emocional.",
        color: "text-green-600"
      };
    }
  };

  if (showResults) {
    const totalScore = getTotalScore();
    const result = getScoreMessage(totalScore);

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="max-w-sm mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Resultado</h1>
            <div className="text-6xl font-bold text-primary mb-4">{totalScore}/15</div>
            <h2 className={`text-xl font-semibold mb-2 ${result.color}`}>{result.title}</h2>
            <p className="text-muted-foreground">{result.message}</p>
          </div>

          <Button
            variant="psychologist"
            className="w-full h-12"
            onClick={() => navigate("/patient/dashboard")}
          >
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between pt-12 pb-8 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/patient/dashboard")}
          className="text-foreground"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">Questionário do Psicólogo</h1>
        <div className="w-10" />
      </div>

      {/* Progress */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Pergunta {currentQuestion + 1} de {questions.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="px-6">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-medium text-foreground mb-8 text-center leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Card 
                key={index}
                className="p-4 cursor-pointer hover:bg-primary/5 border-2 border-border hover:border-primary/20 transition-all"
                onClick={() => handleAnswer(option.score)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">{option.text}</span>
                  <span className="text-2xl">{option.emoji}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQuestionnaire;