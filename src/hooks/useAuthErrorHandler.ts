import { useAuthError } from "../contexts/AuthErrorContext";

export function useAuthErrorHandler() {
  const { showAuthError, setShowAuthError } = useAuthError();

  const showAuthErrorDialog = () => {
    console.log("Showing auth error dialog");
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
