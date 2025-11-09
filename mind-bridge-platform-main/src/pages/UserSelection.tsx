import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import brainLogo from "@/assets/brain-logo.png"

const UserSelection = () => {
	const [selectedType, setSelectedType] = useState<
		"psychologist" | "patient" | null
	>(null)
	const navigate = useNavigate()

	const handleContinue = () => {
		if (selectedType) {
			navigate(`/${selectedType}/login`)
		}
	}

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
			<div className="w-full max-w-sm mx-auto">
				{/* Logo */}
				<div className="text-center mb-12">
					<img
						src={brainLogo}
						alt="PsicoAjuda"
						className="w-16 h-16 mx-auto mb-4"
					/>
					<h1 className="text-xl font-medium text-foreground">PsicoAjuda</h1>
				</div>

				{/* User Type Selection */}
				<div className="space-y-4 mb-16">
					<Button
						variant={
							selectedType === "psychologist"
								? "selection-psychologist"
								: "outline"
						}
						className="w-full h-14 text-left justify-start"
						onClick={() => setSelectedType("psychologist")}
					>
						<div className="flex items-center gap-3">
							<span className="text-2xl">🧠</span>
							<span>Sou psicólogo(a)</span>
						</div>
					</Button>

					<Button
						variant={
							selectedType === "patient" ? "selection-patient" : "outline"
						}
						className="w-full h-14 text-left justify-start"
						onClick={() => setSelectedType("patient")}
					>
						<div className="flex items-center gap-3">
							<span className="text-2xl">👤</span>
							<span>Sou paciente</span>
						</div>
					</Button>
				</div>

				{/* Continue Button */}
				<Button
					variant="psychologist"
					className="w-full h-12 text-white font-medium"
					onClick={handleContinue}
					disabled={!selectedType}
				>
					CONTINUAR
				</Button>
			</div>
		</div>
	)
}

export default UserSelection
