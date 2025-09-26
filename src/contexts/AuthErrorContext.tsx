"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthErrorContextType {
  showAuthError: boolean;
  setShowAuthError: (show: boolean) => void;
}

const AuthErrorContext = createContext<AuthErrorContextType | undefined>(undefined);

export function AuthErrorProvider({ children }: { children: ReactNode }) {
  const [showAuthError, setShowAuthError] = useState(false);

  return (
    <AuthErrorContext.Provider value={{ showAuthError, setShowAuthError }}>
      {children}
    </AuthErrorContext.Provider>
  );
}

export function useAuthError() {
  const context = useContext(AuthErrorContext);
  if (context === undefined) {
    throw new Error("useAuthError must be used within an AuthErrorProvider");
  }
  return context;
}
