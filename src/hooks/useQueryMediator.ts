import { useQuery as useApolloQuery, QueryHookOptions, QueryResult } from "@apollo/client/react";
import { useEffect } from "react";
import { useAuthErrorHandler } from "./useAuthErrorHandler";

interface QueryMediatorOptions<TData, TVariables> extends Omit<QueryHookOptions<TData, TVariables>, 'onError' | 'onCompleted'> {
  onError?: (error: unknown) => void;
  onCompleted?: (data: TData) => void;
}

export function useQueryMediator<TData = unknown, TVariables = unknown>(
  query: unknown,
  options: QueryMediatorOptions<TData, TVariables> = {}
): QueryResult<TData, TVariables> {
  const { onError, onCompleted, ...apolloOptions } = options;
  const { showAuthErrorDialog } = useAuthErrorHandler();

  const result = useApolloQuery<TData, TVariables>(query, {
    ...apolloOptions,
    errorPolicy: "all",
  });

  useEffect(() => {
    if (result.error) {
      console.error("Query error:", result.error);

      const isAuthError = result.error.message?.includes("Authentication required") ||
        result.error.message?.includes("Unauthorized") ||
        result.error.graphQLErrors?.some(err =>
          err.message.includes("Authentication required") ||
          err.message.includes("Unauthorized")
        ) ||
        result.error.networkError?.message?.includes("401") ||
        result.error.networkError?.message?.includes("Unauthorized");

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
