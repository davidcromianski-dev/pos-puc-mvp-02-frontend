"use client";

import { ApolloProvider } from "@apollo/client/react";
import { AuthErrorProvider } from "../contexts/AuthErrorContext";
import { AuthProvider } from "../contexts/AuthContext";
import client from "../graphql/client";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthErrorProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </AuthErrorProvider>
    </ApolloProvider>
  );
}
