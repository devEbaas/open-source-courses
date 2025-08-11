import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, RegisterError } from "../services/registerService";
import { useAuth } from "@/app/context/AuthContext";
import type { IFormData } from "../props.interface";

export const useRegister = () => {
  const router = useRouter();
  const { setUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: IFormData & { confirmPassword?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const created = await registerUser(data);
      setUser(created);
      router.push("/courses");
    } catch (e: any) {
      console.error("Error registering user:", e);
      if (e instanceof RegisterError && e.status === 409) {
        setError(e.message);
      } else {
        setError("Ha ocurrido un error al registrar al usuario");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) router.push("/courses");
  }, [user, router]);

  return { onSubmit, isLoading, error };
};