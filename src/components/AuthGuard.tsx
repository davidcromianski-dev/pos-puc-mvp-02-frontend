"use client";

import { useAuthError } from "../contexts/AuthErrorContext";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * AuthGuard impede a renderização dos filhos quando há um erro de autenticação.
 */
export function AuthGuard({ children, fallback = null }: AuthGuardProps) {
  const { showAuthError } = useAuthError();

  if (showAuthError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
