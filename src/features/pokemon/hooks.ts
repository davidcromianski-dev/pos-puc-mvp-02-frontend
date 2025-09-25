import { useQuery } from "@apollo/client/react";
import { MY_CURRENT_POKEMON, MY_POKEMONS } from "../../graphql/domains/pokemon/queries";
import type { MyCurrentPokemonData, MyPokemonsData, Pokemon } from "../../graphql/domains/pokemon/types";

export const useCurrentPokemon = () => {
  const { data, loading, error, refetch } = useQuery<MyCurrentPokemonData>(MY_CURRENT_POKEMON, {
    errorPolicy: "all",
    skip: typeof window === "undefined",
    onError: (error) => {
      console.log("Current Pokemon query error:", error);
    }
  });

  const currentPokemon = data?.myCurrentPokemon as Pokemon;

  return {
    currentPokemon,
    pokemonName: currentPokemon?.name || null,
    pokemonNickname: currentPokemon?.nickname || null,
    pokemonLevel: currentPokemon?.level || 0,
    pokemonHp: currentPokemon?.hp || 0,
    pokemonExperience: currentPokemon?.experience || 0,
    pokemonEnergy: currentPokemon?.energy || 0,
    pokemonHappiness: currentPokemon?.happiness || 0,
    pokemonHunger: currentPokemon?.hunger || 0,
    pokemonCleanliness: currentPokemon?.cleanliness || 0,
    pokemonSpriteUrl: currentPokemon?.spriteUrl || null,
    pokemonCrieUrl: currentPokemon?.crieUrl || null,
    pokemonTypes: currentPokemon?.types || [],
    isStarter: currentPokemon?.isStarter || false,
    region: currentPokemon?.region || null,
    isLoading: loading,
    error,
    refetch
  };
};

export const useMyPokemons = () => {
  const { data, loading, error, refetch } = useQuery<MyPokemonsData>(MY_POKEMONS, {
    errorPolicy: "all",
    skip: typeof window === "undefined",
    onError: (error) => {
      console.log("My Pokemons query error:", error);
    }
  });

  return {
    pokemons: data?.myPokemons || [],
    totalPokemons: data?.myPokemons?.length || 0,
    isLoading: loading,
    error,
    refetch
  };
};
