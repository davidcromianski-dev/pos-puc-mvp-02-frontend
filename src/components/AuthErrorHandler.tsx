"use client";

import { useEffect } from "react";
import { useAuthError } from "../contexts/AuthErrorContext";
import { AuthErrorDialog } from "./AuthErrorDialog";

export function AuthErrorHandler() {
  const { showAuthError, setShowAuthError } = useAuthError();

  useEffect(() => {
    const handleAuthError = () => {
      setShowAuthError(true);
    };

    window.addEventListener("auth-error", handleAuthError);

    return () => {
      window.removeEventListener("auth-error", handleAuthError);
    };
  }, [setShowAuthError]);

  return (
    <AuthErrorDialog 
      open={showAuthError} 
      onOpenChange={setShowAuthError} 
    />
  );
}
