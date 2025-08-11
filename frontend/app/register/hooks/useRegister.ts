import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/registerService";
import { IFormData } from "../props.interface";
import { useAuth } from "@/app/context/AuthContext";

export const useRegister = () => { 
  const router = useRouter();
  const { setUser, user } = useAuth();
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveUser = async () => {
    setIsLoading(true);
    try {
      console.log("Registering user:", formData);
      const user = await registerUser(formData);
      setUser(user);
      router.push("/");
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Ha ocurrido un error al registrar al usuario");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveUser();
  };

  const validateSession = async () => {
    if (user?.id) {
      router.push("/courses");
    }
  };

  useEffect(() => {
    validateSession();
  }, [user]);

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};