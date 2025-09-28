import { useQueryMediator } from "../../hooks/useQueryMediator";
import { useMutationMediator } from "../../hooks/useMutationMediator";
import { MY_CURRENT_POKEMON, MY_POKEMONS } from "../../graphql/domains/pokemon/queries";
import { CAPTURE_POKEMON } from "../../graphql/domains/pokedex/mutations";
import { RANDOM_POKEMON, STARTER_POKEMONS } from "../../graphql/domains/pokedex/queries";
import type {
  MyCurrentPokemonData,
  MyPokemonsData,
  Pokemon,
  CapturePokemonData,
  RandomPokemonData,
  StarterPokemonsData,
} from "../../graphql/domains/pokemon/types";

export const useCurrentPokemon = () => {
  const { data, loading, error, refetch } = useQueryMediator<MyCurrentPokemonData>(MY_CURRENT_POKEMON, {
    skip: typeof window === "undefined",
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
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
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  if (!data?.myPokemons) return {
    myPokemons: [],
    totalPokemons: 0,
    isLoading: loading,
    error,
    refetch
  };

  const totalPokemons = data?.myPokemons.reduce((acc, curr) => acc + curr.count, 0);

  return {
    myPokemons: data?.myPokemons || [],
    totalPokemons: totalPokemons || 0,
    isLoading: loading,
    error,
    refetch
  };
};

export const useRandomPokemon = () => {
  const { data, loading, error, refetch } = useQueryMediator<RandomPokemonData>(RANDOM_POKEMON, {
    skip: typeof window === "undefined",
  });

  async function getRandomPokemon() {
    await refetch();
    return data?.randomPokemon || null;
  }

  return {
    getRandomPokemon,
    isLoading: loading,
    error,
    refetch
  };
};

export const useStarterPokemons = () => {
  const { data, loading, error, refetch } = useQueryMediator<StarterPokemonsData>(STARTER_POKEMONS, {
    skip: typeof window === "undefined",
  });

  return {
    starterPokemons: data?.starterPokemons || null,
    isLoading: loading,
    error,
    refetch
  };
};

export const useCapturePokemon = () => {
  const [capturePokemonMutation, { loading, error, refetch }] = useMutationMediator<CapturePokemonData>(CAPTURE_POKEMON, {
    skip: typeof window === "undefined",
  });

  const capturePokemon = async (pokemonID: number) => {
    return await capturePokemonMutation({
      variables: { pokemonID }
    });
  };

  return {
    capturePokemon,
    isLoading: loading,
    error,
    refetch
  };
};