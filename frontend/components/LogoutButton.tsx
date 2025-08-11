import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { api } from "@/app/api";

export const LogoutButton = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="mt-4 inline-block rounded-md bg-red-600 px-4 py-2.5 font-medium text-white hover:bg-red-700">
      Cerrar Sesión
    </button>
  );
};
