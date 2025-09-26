import { useState } from "react";
import { useMutationMediator } from "../../hooks/useMutationMediator";
import { SELECT_POKEMON } from "../../graphql/domains/user/mutations";

export const useSelectPokemon = () => {
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  
  const [selectPokemonMutation, { loading: selectingPokemon }] = useMutationMediator(SELECT_POKEMON);

  const handlePokemonClick = (id: string, currentPokemonId?: string) => {
    if (currentPokemonId === id) {
      return;
    }
    setShowConfirmation(id);
  };

  const confirmPokemonSelection = async (id: string, onSuccess?: () => void) => {
    try {
      await selectPokemonMutation({
        variables: { id: id }
      });
      setShowConfirmation(null);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to select Pokemon:", error);
      setShowConfirmation(null);
    }
  };

  const cancelSelection = () => {
    setShowConfirmation(null);
  };

  return {
    showConfirmation,
    selectingPokemon,
    handlePokemonClick,
    confirmPokemonSelection,
    cancelSelection,
  };
};
