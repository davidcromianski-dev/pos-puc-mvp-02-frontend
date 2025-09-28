import { useMutation as useApolloMutation, MutationHookOptions, MutationTuple } from "@apollo/client/react";
import { OperationVariables, DocumentNode } from "@apollo/client";
import { useEffect } from "react";
import { useAuthErrorHandler } from "./useAuthErrorHandler";

interface MutationMediatorOptions<TData, TVariables extends OperationVariables = OperationVariables> extends Omit<MutationHookOptions<TData, TVariables>, 'onError' | 'onCompleted'> {
  onError?: (error: unknown) => void;
  onCompleted?: (data: TData) => void;
}

export function useMutationMediator<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  mutation: DocumentNode,
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

  return [mutationFunction, result];
}
