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

interface ReleasePokemonDialogProps {
  showConfirmation: string | null;
  releasingPokemon: boolean;
  onCancel: () => void;
  onConfirm: (pokemonId: string) => void;
}

export const ReleasePokemonDialog = ({
  showConfirmation,
  releasingPokemon,
  onCancel,
  onConfirm,
}: ReleasePokemonDialogProps) => {
  if (!showConfirmation) return null;

  return (
    <AlertDialog open={!!showConfirmation} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Abandonar Pokémon?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja abandonar seu Pokémon?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={releasingPokemon}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(showConfirmation)}
            disabled={releasingPokemon}
            className="flex items-center gap-2 bg-red-700"
          >
            {releasingPokemon ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Abandonando...
              </>
            ) : (
              "Confirmar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
