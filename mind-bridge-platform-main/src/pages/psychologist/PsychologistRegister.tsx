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
import {
  ArrowLeft,
  User,
  Mail,
  CreditCard,
  Calendar,
  Lock,
  MapPin,
  Building,
} from "lucide-react"
import brainLogo from "@/assets/brain-logo.png"
import { checkUserAlreadyExists, registerUser } from "@/lib/utils"
import bcrypt from "bcryptjs"

type FormData = {
  firstName: string
  lastName: string
  email: string
  crp: string
  birthDate: string
  gender: string
  insurance: string
  password: string
  address: string
  neighborhood: string
  city: string
  role: "psychologist"
}

const PsychologistRegister = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    crp: "",
    birthDate: "",
    gender: "",
    insurance: "",
    password: "",
    address: "",
    neighborhood: "",
    city: "",
    role: "psychologist",
  })

  const navigate = useNavigate()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async () => {
    // validação simples — ajuste conforme necessidade
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      console.log("Preencha os campos obrigatórios")
      return
    }

    try {
      const userExists = await checkUserAlreadyExists(formData.email)
      if (userExists) {
        console.log("Usuário já cadastrado")
        return
      }

      // Hash da senha
      const hashedPwd = await bcrypt.hash(formData.password, 10)

      const payload = {
        ...formData,
        password: hashedPwd,
      }

      const wasRegistered = await registerUser(payload)
      console.log("Cadastrado:", wasRegistered)

      navigate("/psychologist/login")
    } catch (err) {
      console.error("Erro ao cadastrar:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between pt-12 pb-8 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/psychologist/login")}
          className="text-foreground"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <div className="flex flex-col items-center">
          <img src={brainLogo} alt="PsicoAjuda" className="w-12 h-12 mb-2" />
          <span className="text-sm text-muted-foreground">PsicoAjuda</span>
        </div>

        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        <div className="max-w-sm mx-auto">
          <h1 className="text-xl font-bold text-foreground mb-8">Cadastre-se abaixo</h1>

          <div className="space-y-4 mb-8">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome:</label>
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

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sobrenome:</label>
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email:</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
                <Input
                  type="email"
                  placeholder="carlos.silva@exemplo.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-12 h-12 border-border"
                />
              </div>
            </div>

            {/* CRP */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">CRP:</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
                <Input
                  type="text"
                  placeholder="06/123456"
                  value={formData.crp}
                  onChange={(e) => handleInputChange("crp", e.target.value)}
                  className="pl-12 h-12 border-border"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Data de Nascimento:</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="pl-12 h-12 border-border"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sexo:</label>
              <Select onValueChange={(value) => handleInputChange("gender", value)}>
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

            {/* Insurance */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Convênio:</label>
              <Select onValueChange={(value) => handleInputChange("insurance", value)}>
                <SelectTrigger className="h-12 border-border">
                  <SelectValue placeholder="Unimed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unimed">Unimed</SelectItem>
                  <SelectItem value="amil">Amil</SelectItem>
                  <SelectItem value="sulamerica">SulAmérica</SelectItem>
                  <SelectItem value="particular">Particular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Senha:</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-12 h-12 border-border"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Endereço:</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rua Exemplo, 123"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="pl-12 h-12 border-border"
                />
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bairro:</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Centro"
                  value={formData.neighborhood}
                  onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                  className="pl-12 h-12 border-border"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cidade:</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-gray h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Sorocaba"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="pl-12 h-12 border-border"
                />
              </div>
            </div>
          </div>

          <Button variant="psychologist" className="w-full h-12" onClick={handleRegister}>
            CADASTRAR
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PsychologistRegister
