import { api } from "@/app/api";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error en loginService:', error);
    throw error;
  }
};

export const userInfoService = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error en userInfoService:', error);
    throw error;
  }
};
