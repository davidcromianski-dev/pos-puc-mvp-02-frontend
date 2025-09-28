"use client";

import { useAuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomeContent() {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    //@todo Caso o usuario nao tenha um pokemon inicial na regiao atual, redireciona para a pagina de selecao de pokemon inicial.

    const timeout = setTimeout(() => {
      if (user) {
        router.push("/dashboard");
        return;
      }

      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function Home() {
  return (
    <HomeContent />
  );
}
