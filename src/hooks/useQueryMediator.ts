import { useQuery as useApolloQuery, QueryResult } from "@apollo/client/react";
import { DocumentNode } from "@apollo/client";
import { useEffect } from "react";
import { useAuthErrorHandler } from "./useAuthErrorHandler";

interface QueryMediatorOptions {
  onError?: (error: unknown) => void;
  onCompleted?: (data: unknown) => void;
  skip?: boolean;
  fetchPolicy?: "cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby";
  notifyOnNetworkStatusChange?: boolean;
  variables?: Record<string, unknown>;
}

export function useQueryMediator(
  query: DocumentNode,
  options: QueryMediatorOptions = {}
): QueryResult<unknown, Record<string, unknown>> {
  const { onError, onCompleted, skip, fetchPolicy, notifyOnNetworkStatusChange, variables } = options;
  const { showAuthErrorDialog } = useAuthErrorHandler();

  const result = useApolloQuery(query, {
    skip,
    fetchPolicy,
    notifyOnNetworkStatusChange,
    variables,
    errorPolicy: "all",
  });

  useEffect(() => {
    if (result.error) {
      const errorMessage = result.error.message || '';
      const isAuthError = errorMessage.includes("Authentication required") ||
        errorMessage.includes("Unauthorized") ||
        errorMessage.includes("401");

      if (isAuthError) {
        showAuthErrorDialog();
      } else if (onError) {
        onError(result.error);
      }
    }
  }, [result.error, showAuthErrorDialog, onError]);

  useEffect(() => {
    if (result.data && onCompleted) {
      onCompleted(result.data);
    }
  }, [result.data, onCompleted]);

  return result;
}
