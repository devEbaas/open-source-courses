import { api } from "@/app/api";

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    console.error('Error en registerUser:', error)
    throw error
  }
}
