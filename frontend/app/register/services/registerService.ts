import { api } from "@/app/api";

export class RegisterError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (err: any) {
    const status = err?.response?.status;
    const backendMsg = err?.response?.data?.error;
    if (status === 409) {
      throw new RegisterError(backendMsg || 'Email ya registrado', 409);
    }
    throw new RegisterError(backendMsg || 'Error registrando usuario', status);
  }
};
