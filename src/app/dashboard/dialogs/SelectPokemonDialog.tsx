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

interface SelectPokemonDialogProps {
  showConfirmation: string | null;
  selectingPokemon: boolean;
  onCancel: () => void;
  onConfirm: (pokemonId: string) => void;
}

export const SelectPokemonDialog = ({
  showConfirmation,
  selectingPokemon,
  onCancel,
  onConfirm,
}: SelectPokemonDialogProps) => {
  if (!showConfirmation) return null;

  return (
    <AlertDialog open={!!showConfirmation} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Trocar Pokémon Atual?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja trocar seu Pokémon atual?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={selectingPokemon}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(showConfirmation)}
            disabled={selectingPokemon}
            className="flex items-center gap-2"
          >
            {selectingPokemon ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Trocando...
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