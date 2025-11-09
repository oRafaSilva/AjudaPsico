import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
	ChevronLeft,
	ChevronRight,
	Plus,
	Users,
	Calendar,
	BarChart3,
	User,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import brainLogo from "@/assets/brain-logo.png"
import { useAuth } from "@/contexts/AuthContext"

const PsychologistDashboard = () => {
	const navigate = useNavigate()
	const { user } = useAuth()

	// Data atual
	const [currentDate, setCurrentDate] = useState(new Date())

	const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]
	const months = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	]

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth()
		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0)
		const daysInMonth = lastDay.getDate()
		const startingDayOfWeek = firstDay.getDay()

		const days = []

		// Adiciona espaços vazios até o primeiro dia do mês
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null)
		}

		// Adiciona os dias reais
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(day)
		}

		return days
	}

	const handlePrevMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
		)
	}

	const handleNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
		)
	}

	const today = new Date()
	const isCurrentMonth =
		today.getMonth() === currentDate.getMonth() &&
		today.getFullYear() === currentDate.getFullYear()

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="bg-background pt-12 pb-6 px-6">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-xl font-bold text-foreground">
							Olá, Psicólogo {user.first_name}
						</h1>
						<p className="text-sm text-muted-foreground">
							{today.toLocaleDateString("pt-BR", {
								weekday: "long",
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</p>
					</div>
					<div className="flex items-center gap-4">
						<img src={brainLogo} alt="PsicoAjuda" className="w-8 h-8" />
						<div
							className="w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer"
							onClick={() => navigate("/psychologist/profile")}
						>
							<User className="w-5 h-5 text-primary-foreground" />
						</div>
					</div>
				</div>

				{/* Calendário */}
				<Card className="p-4 bg-primary/10">
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-medium text-foreground">Meu Calendário</h2>
						<div className="flex gap-2">
							<Button variant="ghost" size="icon" onClick={handlePrevMonth}>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="icon" onClick={handleNextMonth}>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<div className="text-center mb-4">
						<h3 className="text-lg font-bold text-foreground">
							{months[currentDate.getMonth()]} {currentDate.getFullYear()}
						</h3>
					</div>

					<div className="grid grid-cols-7 gap-1 mb-2">
						{daysOfWeek.map((day) => (
							<div
								key={day}
								className="text-center text-xs font-medium text-muted-foreground p-2"
							>
								{day}
							</div>
						))}
					</div>

					<div className="grid grid-cols-7 gap-1">
						{getDaysInMonth(currentDate).map((day, index) => (
							<div key={index} className="text-center p-2">
								{day && (
									<span
										className={`text-sm ${
											isCurrentMonth && day === today.getDate()
												? "bg-primary text-primary-foreground rounded-full px-2 py-1"
												: "text-foreground"
										}`}
									>
										{day}
									</span>
								)}
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* Conteúdo principal */}
			<div className="px-6 space-y-6 pb-24">
				{/* Meus pacientes */}
				<Card
					className="p-4 cursor-pointer"
					onClick={() => navigate("/psychologist/patients")}
				>
					<div className="flex items-center justify-between">
						<h3 className="font-medium text-foreground">Meus pacientes</h3>
						<ChevronRight className="h-5 w-5 text-muted-foreground" />
					</div>
				</Card>

				{/* Consultas Marcadas */}
				<Card className="p-4">
					<div className="mb-4">
						<h3 className="font-medium text-foreground">Consultas Marcadas</h3>
						<p className="text-xs text-muted-foreground">Esta semana</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-2xl font-bold text-primary">12</div>
						<div className="text-sm text-foreground">Consultas</div>
					</div>
					<Progress value={75} className="mt-4 h-2" />
				</Card>

				{/* Adicionar novo paciente */}
				<Card className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium text-primary">Adicionar novo paciente</h3>
							<p className="text-xs text-muted-foreground">
								Pacientes com agendas ativas
							</p>
						</div>
						<Button
							size="icon"
							variant="psychologist"
							className="rounded-full"
							onClick={() => navigate("/psychologist/generate-invite")}
						>
							<Plus className="h-5 w-5" />
						</Button>
					</div>
				</Card>

				{/* Sessões */}
				<Card className="p-4">
					<div className="mb-4">
						<div className="text-2xl font-bold text-primary">37</div>
						<div className="text-sm text-foreground">Sessões</div>
						<p className="text-xs text-muted-foreground">Total este mês</p>
					</div>
					<Progress value={60} className="h-2" />
				</Card>
			</div>

			{/* Navegação inferior */}
			<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
				<div className="flex items-center justify-around py-3">
					<Button variant="ghost" size="icon" className="text-primary">
						<BarChart3 className="h-5 w-5" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-muted-foreground"
						onClick={() => navigate("/psychologist/calendar")}
					>
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
	)
}

export default PsychologistDashboard
