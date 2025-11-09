import { createContext, useContext, useState, ReactNode } from "react"

export type User = {
	id: number
	first_name: string
	last_name: string
	email: string
	role?: "psychologist" | "patient"
	created_at?: string
	active?: boolean
} | null

type AuthContextType = {
	user: User
	setUser: (user: User) => void
	login: (userData: User) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 🔹 Provedor do contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User>(null)

	const login = (userData: User) => {
		setUser(userData)
		if (userData) localStorage.setItem("user", JSON.stringify(userData))
		console.log("logando usuario: ", JSON.stringify(userData))
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem("user")
		console.log("logout de usuario...")
	}

	return (
		<AuthContext.Provider value={{ user, setUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

// 🔹 Hook customizado para usar o contexto
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error("useAuth must be used within an AuthProvider")
	return context
}
