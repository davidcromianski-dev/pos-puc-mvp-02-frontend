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
  onCancel: () => void;
  onConfirm: (pokemonId: string) => void;
}

export const ReleasePokemonDialog = ({
  showConfirmation,
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
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(showConfirmation)}
            className="flex items-center gap-2 bg-red-700"
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
