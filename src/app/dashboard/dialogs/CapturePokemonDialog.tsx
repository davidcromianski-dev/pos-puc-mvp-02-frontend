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
import { RandomPokemon } from "../../../graphql/domains/pokemon/types";

interface CapturePokemonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isCapturing?: boolean;
  randomPokemon?: RandomPokemon | null;
}

export const CapturePokemonDialog = ({
  isOpen,
  onConfirm,
  onClose,
  isCapturing = false,
  randomPokemon,
}: CapturePokemonDialogProps) => {

  // @todo Ajustar caso nao consiga capturar o pokemon. Dar 3 chances de capturar. Após, se nao conseguir, mostra que o pokemon escapou.
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            {randomPokemon?.name ? `Você encontrou um(a) ${randomPokemon.name} selvagem!` : "Pokémon selvagem encontrado!"}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex items-center justify-center">
            {randomPokemon?.spriteUrl && (
              <Image
                src={randomPokemon.spriteUrl}
                alt={randomPokemon.name || "Pokémon selvagem"}
                width={200}
                height={200}
                unoptimized
                style={{ height: "200px", width: "200px" }}
              />
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
          >
            Desistir
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
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
