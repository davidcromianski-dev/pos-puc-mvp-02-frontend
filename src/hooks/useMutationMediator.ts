import { useMutation as useApolloMutation, MutationHookOptions, MutationTuple } from "@apollo/client/react";
import { useEffect } from "react";
import { useAuthErrorHandler } from "./useAuthErrorHandler";

interface MutationMediatorOptions<TData, TVariables> extends Omit<MutationHookOptions<TData, TVariables>, 'onError' | 'onCompleted'> {
  onError?: (error: unknown) => void;
  onCompleted?: (data: TData) => void;
}

export function useMutationMediator<TData = unknown, TVariables = unknown>(
  mutation: unknown,
  options: MutationMediatorOptions<TData, TVariables> = {}
): MutationTuple<TData, TVariables> {
  const { onError, onCompleted, ...apolloOptions } = options;
  const { showAuthErrorDialog } = useAuthErrorHandler();

  const [mutationFunction, result] = useApolloMutation<TData, TVariables>(mutation, {
    ...apolloOptions,
    errorPolicy: "all",
  });

  useEffect(() => {
    if (result.error) {
      console.error("Mutation error:", result.error);

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

  return [mutationFunction, result];
}
