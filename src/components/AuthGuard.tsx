"use client";

import { useAuthError } from "../contexts/AuthErrorContext";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * AuthGuard component that prevents rendering of children when there's an authentication error.
 * 
 * @example
 * ```tsx
 * // Basic usage - renders nothing when auth error occurs
 * <AuthGuard>
 *   <ProtectedContent />
 * </AuthGuard>
 * 
 * // With custom fallback
 * <AuthGuard fallback={<div>Session expired, redirecting...</div>}>
 *   <ProtectedContent />
 * </AuthGuard>
 * ```
 */
export function AuthGuard({ children, fallback = null }: AuthGuardProps) {
  const { showAuthError } = useAuthError();

  if (showAuthError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
