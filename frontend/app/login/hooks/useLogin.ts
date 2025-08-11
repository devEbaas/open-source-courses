import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../services/loginService";
import { useAuth } from "@/app/context/AuthContext";

export const useLogin = () => {
  const router = useRouter();
  const { setUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const logged = await loginService(data.email, data.password);
      setUser(logged);
      router.push("/courses");
    } catch (e) {
      console.error('Error al iniciar sesión:', e);
      setError('Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) router.push("/courses");
  }, [user, router]);

  return { onSubmit, isLoading, error };
};
