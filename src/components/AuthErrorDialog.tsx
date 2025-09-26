"use client";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useRouter } from "next/navigation";

interface AuthErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthErrorDialog({ open, onOpenChange }: AuthErrorDialogProps) {
  const router = useRouter();

  const handleRedirectToLogin = () => {
    onOpenChange(false);
    router.push("/login");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sua sessão encerrou!</AlertDialogTitle>
          <AlertDialogDescription>
            Sua sessão expirou. Por favor, faça login novamente para continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={handleRedirectToLogin}>
          Ir para Login
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}
