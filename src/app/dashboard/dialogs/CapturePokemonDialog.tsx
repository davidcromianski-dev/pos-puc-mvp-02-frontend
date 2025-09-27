import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import Image from "next/image";

interface CapturePokemonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isCapturing?: boolean;
}

export const CapturePokemonDialog = ({
  isOpen,
  onConfirm,
  isCapturing = false,
  randomPokemon,
}: CapturePokemonDialogProps) => {

  // @todo Ajustar caso nao consiga capturar o pokemon. Dar 3 chances de capturar. Após, se nao conseguir, mostra que o pokemon escapou.
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">Você encontrou um(a) {randomPokemon?.name} selvagem!</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center justify-center">
            <Image src={randomPokemon?.spriteUrl} alt={randomPokemon?.name} width={200} height={200}
              style={{ height: "200px", width: "200px" }} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isCapturing}>
            Desistir
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isCapturing}
            className="flex items-center gap-2"
          >
            {isCapturing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Capturando...
              </>
            ) : (
              "Capturar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
