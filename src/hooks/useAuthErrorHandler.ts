import { useAuthError } from "../contexts/AuthErrorContext";

export function useAuthErrorHandler() {
  const { showAuthError, setShowAuthError } = useAuthError();

  const showAuthErrorDialog = () => {
    setShowAuthError(true);
  };

  const hideAuthErrorDialog = () => {
    setShowAuthError(false);
  };

  return {
    showAuthError,
    showAuthErrorDialog,
    hideAuthErrorDialog,
  };
}
