"use client";

import { useAuth } from "../features/auth/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClientOnly } from "../lib/client-only";

function HomeContent() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    
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
    <ClientOnly fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </ClientOnly>
  );
}
