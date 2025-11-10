import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, User, Mail, CreditCard, Calendar, Lock } from "lucide-react"
import brainLogo from "@/assets/brain-logo.png"
import { checkUserAlreadyExists, registerUser } from "@/lib/utils"
import bcrypt from "bcryptjs"

const PatientRegister = () => {
	const [step, setStep] = useState<"session" | "details" | "full-register">(
		"session"
	)
	const [formData, setFormData] = useState({
		sessionCode: "",
		firstName: "",
		lastName: "",
		email: "",
		cpf: "",
		birthDate: "",
		gender: "",
		insurance: "",
		password: "",
    role: "patient",
	})
	const navigate = useNavigate()

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handleSessionSubmit = () => {
		if (formData.sessionCode) {
			setStep("details")
		}
	}

	const handleRegister = async () => {
		const userExists = await checkUserAlreadyExists(formData.email)
		if (userExists) {
			console.log("user already exists")
			return
		}

		// Hashes the pwd
		const hashedPwd = await bcrypt.hash(formData.password, 10)

		const userWasRegistered = registerUser({ ...formData, password: hashedPwd })
		console.log(userWasRegistered)

		navigate("/patient/login")
	}

	if (step === "session") {
		return (
			<div className="min-h-screen bg-background flex flex-col px-6">
				{/* Header */}
				<div className="flex items-center justify-between pt-12 pb-8">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate("/patient/login")}
						className="text-foreground"
					>
						<ArrowLeft className="h-6 w-6" />
					</Button>

					<div className="flex flex-col items-center">
						<img
							src={brainLogo}
							alt="PsicoAjuda"
							className="w-12 h-12 mb-2"
						/>
						<span className="text-sm text-muted-foreground">PsicoAjuda</span>
					</div>

					<div className="w-10" />
				</div>

				{/* Content */}
				<div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
					<h1 className="text-xl font-bold text-foreground mb-8">
						Cadastre-se
					</h1>

					<div className="space-y-4 mb-8">
						<div className="relative">
							<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
							<Input
								type="text"
								placeholder="Código da sessão"
								value={formData.sessionCode}
								onChange={(e) =>
									handleInputChange("sessionCode", e.target.value)
								}
								className="pl-12 h-12 border-border"
							/>
						</div>
					</div>

					<Button
						variant="psychologist"
						className="w-full h-12 mb-4"
						onClick={handleSessionSubmit}
					>
						CADASTRAR
					</Button>

					<div className="text-center">
						<button
							onClick={() => setStep("full-register")}
							className="text-sm text-subtle-gray hover:text-primary cursor-pointer underline"
						>
							Ainda não tenho um código de sessão
						</button>
					</div>
				</div>
			</div>
		)
	}

	if (step === "full-register") {
		return (
			<div className="min-h-screen bg-background">
				{/* Header */}
				<div className="flex items-center justify-between pt-12 pb-8 px-6">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setStep("session")}
						className="text-foreground"
					>
						<ArrowLeft className="h-6 w-6" />
					</Button>

					<div className="flex flex-col items-center">
						<img
							src={brainLogo}
							alt="PsicoAjuda"
							className="w-12 h-12 mb-2"
						/>
						<span className="text-sm text-muted-foreground">PsicoAjuda</span>
					</div>

					<div className="w-10" />
				</div>

				{/* Content */}
				<div className="px-6 pb-6">
					<div className="max-w-sm mx-auto">
						<h1 className="text-xl font-bold text-foreground mb-8">
							Cadastre-se abaixo
						</h1>

						<div className="space-y-4 mb-8">
							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Nome:
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
									<Input
										type="text"
										placeholder="Carlos"
										value={formData.firstName}
										onChange={(e) => handleInputChange("firstName", e.target.value)}
										className="pl-12 h-12 border-border"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Sobrenome:
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
									<Input
										type="text"
										placeholder="Cardoso"
										value={formData.lastName}
										onChange={(e) => handleInputChange("lastName", e.target.value)}
										className="pl-12 h-12 border-border"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Email:
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
									<Input
										type="email"
										placeholder="carlos.silva@fatec.sp.gov.br"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										className="pl-12 h-12 border-border"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									CPF:
								</label>
								<div className="relative">
									<CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
									<Input
										type="text"
										placeholder="123.456.789-10"
										value={formData.cpf}
										onChange={(e) => handleInputChange("cpf", e.target.value)}
										className="pl-12 h-12 border-border"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Data de Nascimento:
								</label>
								<div className="relative">
									<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
									<Input
										type="text"
										placeholder="01/06/2000"
										value={formData.birthDate}
										onChange={(e) =>
											handleInputChange("birthDate", e.target.value)
										}
										className="pl-12 h-12 border-border"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Sexo:
								</label>
								<Select
									onValueChange={(value) => handleInputChange("gender", value)}
								>
									<SelectTrigger className="h-12 border-border">
										<SelectValue placeholder="Masculino" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="masculino">Masculino</SelectItem>
										<SelectItem value="feminino">Feminino</SelectItem>
										<SelectItem value="outro">Outro</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Convênio:
								</label>
								<Select
									onValueChange={(value) =>
										handleInputChange("insurance", value)
									}
								>
									<SelectTrigger className="h-12 border-border">
										<SelectValue placeholder="Unimed" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1">Unimed</SelectItem>
										<SelectItem value="2">Amil</SelectItem>
										<SelectItem value="3">SulAmérica</SelectItem>
										<SelectItem value="4">Particular</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Senha:
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
									<Input
										type="password"
										placeholder="••••••••"
										value={formData.password}
										onChange={(e) =>
											handleInputChange("password", e.target.value)
										}
										className="pl-12 h-12 border-border"
									/>
								</div>
							</div>
						</div>

						<Button
							variant="psychologist"
							className="w-full h-12"
							onClick={handleRegister}
						>
							CADASTRAR
						</Button>
					</div>
				</div>
			</div>
		)
	}

	// This is the "details" step (session code was provided)
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="flex items-center justify-between pt-12 pb-8 px-6">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setStep("session")}
					className="text-foreground"
				>
					<ArrowLeft className="h-6 w-6" />
				</Button>

				<div className="flex flex-col items-center">
					<img
						src={brainLogo}
						alt="PsicoAjuda"
						className="w-12 h-12 mb-2"
					/>
					<span className="text-sm text-muted-foreground">PsicoAjuda</span>
				</div>

				<div className="w-10" />
			</div>

			{/* Content */}
			<div className="px-6 pb-6">
				<div className="max-w-sm mx-auto">
					<h1 className="text-xl font-bold text-foreground mb-8">
						Cadastre-se abaixo
					</h1>

					<div className="space-y-4 mb-8">
						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Nome:
							</label>
							<div className="relative">
								<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
								<Input
									type="text"
									placeholder="Carlos"
									value={formData.firstName}
									onChange={(e) =>
										handleInputChange("firstName", e.target.value)
									}
									className="pl-12 h-12 border-border"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Sobrenome:
							</label>
							<div className="relative">
								<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
								<Input
									type="text"
									placeholder="Cardoso"
									value={formData.lastName}
									onChange={(e) =>
										handleInputChange("lastName", e.target.value)
									}
									className="pl-12 h-12 border-border"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Email:
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
								<Input
									type="email"
									placeholder="carlos.silva@fatec.sp.gov.br"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									className="pl-12 h-12 border-border"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								CPF:
							</label>
							<div className="relative">
								<CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
								<Input
									type="text"
									placeholder="123.456.789-10"
									value={formData.cpf}
									onChange={(e) => handleInputChange("cpf", e.target.value)}
									className="pl-12 h-12 border-border"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Data de Nascimento:
							</label>
							<div className="relative">
								<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
								<Input
									type="date"
									value={formData.birthDate}
									onChange={(e) =>
										handleInputChange("birthDate", e.target.value)
									}
									className="pl-12 h-12 border-border"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Sexo:
							</label>
							<Select
								onValueChange={(value) => handleInputChange("gender", value)}
							>
								<SelectTrigger className="h-12 border-border">
									<SelectValue placeholder="Masculino" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="masculino">Masculino</SelectItem>
									<SelectItem value="feminino">Feminino</SelectItem>
									<SelectItem value="outro">Outro</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Convênio:
							</label>
							<Select
								onValueChange={(value) => handleInputChange("insurance", value)}
							>
								<SelectTrigger className="h-12 border-border">
									<SelectValue placeholder="Unimed" />
								</SelectTrigger>
								<SelectContent>
									<SelectContent>
										<SelectItem value="1">Unimed</SelectItem>
										<SelectItem value="2">Amil</SelectItem>
										<SelectItem value="3">SulAmérica</SelectItem>
										<SelectItem value="4">Particular</SelectItem>
									</SelectContent>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Senha:
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
								<Input
									type="password"
									placeholder="••••••••"
									value={formData.password}
									onChange={(e) =>
										handleInputChange("password", e.target.value)
									}
									className="pl-12 h-12 border-border"
								/>
							</div>
						</div>
					</div>

					<Button
						variant="psychologist"
						className="w-full h-12"
						onClick={handleRegister}
					>
						CADASTRAR
					</Button>
				</div>
			</div>
		</div>
	)
}

export default PatientRegister