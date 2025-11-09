import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import supabaseClient from "./supabase"
import bcrypt from "bcryptjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkUserAlreadyExists = async (
  email: string
): Promise<boolean> => {
  const { data, error } = await supabaseClient
    .from("users")
    .select("email")
    .eq("email", email)
    .limit(1)

  // ? prevents error in runtime if data is null or undefined
  return (data?.length ?? 0) > 0
}

export const registerUser = async (formData) => {
  formData.gender = formData.gender === "Masculino" ? "M" : "F"

  const { data, error } = await supabaseClient.from("users").insert([
    {
      first_name: formData.firstName,
      last_name: formData.lastName,
      cpf: formData.cpf,
      email: formData.email,
      password: formData.password,
      crp: formData.crp || null,
      birthdate: formData.birthDate,
      gender: formData.gender,
      insurance_fk: formData.insurance || null,
      address: formData.address || null,
      neighborhood: formData.neighborhood || null,
      city: formData.city,
      role: formData.role,
    },
  ])

  if (error) {
    console.error("Error inserting user:", error)
    return null
  }

  return data
}

export const loginUser = async (email: string, password: string, role: "psychologist" | "patient"): Promise<boolean> => {
  // Busca o usuário pelo email
  const { data, error } = await supabaseClient
    .from("users")
    .select("id, first_name, last_name, email, password, gender, insurance_fk")
    .eq("email", email)
    .eq("role", role)
    .single()

  if (error) {
    console.error("Error fetching user:", error)
    return null
  }

  if (!data) {
    console.warn("User not found")
    return null
  }

  const passwordMatch = await bcrypt.compare(password, data.password)

  if (!passwordMatch) {
    console.warn("Invalid password")
    return false
  } else {
    console.info("deu bom")
  }

  // Retorna os dados do usuário sem a senha
  const { password: _, ...userWithoutPassword } = data

  return true
}