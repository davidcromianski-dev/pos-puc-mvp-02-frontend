import { useQueryMediator } from "../../hooks/useQueryMediator";
import { MY_CURRENT_POKEMON, MY_POKEMONS } from "../../graphql/domains/pokemon/queries";
import type { MyCurrentPokemonData, MyPokemonsData, Pokemon } from "../../graphql/domains/pokemon/types";

export const useCurrentPokemon = () => {
  const { data, loading, error, refetch } = useQueryMediator<MyCurrentPokemonData>(MY_CURRENT_POKEMON, {
    skip: typeof window === "undefined",
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
  const { data, loading, error, refetch } = useQueryMediator<MyPokemonsData>(MY_POKEMONS, {
    skip: typeof window === "undefined",
  });
  const totalPokemons = data?.myPokemons.reduce((acc, curr) => acc + curr.count, 0);

  return {
    myPokemons: data?.myPokemons || [],
    totalPokemons: totalPokemons || 0,
    isLoading: loading,
    error,
    refetch
  };
};
