import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../services/loginService";
import { useAuth } from "@/app/context/AuthContext";

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await loginService(formData.email, formData.password);
      setUser(user);
      router.push("/courses");
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
