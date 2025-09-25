export interface PokemonType {
    name: string;
    url: string;
}

export interface Pokemon {
    id: string;
    pokemonId: string;
    name: string;
    nickname?: string;
    level: number;
    hp: number;
    experience: number;
    energy: number;
    happiness: number;
    hunger: number;
    cleanliness: number;
    isStarter: boolean;
    region: string;
    userId: string;
    spriteUrl: string;
    crieUrl: string;
    capturedAt: string;
    lastFed?: string;
    lastPlayed?: string;
    lastCleaned?: string;
    types: PokemonType[];
}

export interface PokedexEntry {
    pokemonId: string;
    name: string;
    hp: number;
    spriteUrl: string;
    crieUrl: string;
    types: PokemonType[];
}

export interface MyPokemonsResponse {
    count: number;
    region: string;
    pokemon: Pokemon;
}

export interface CapturePokemonRequest {
    pokemonId: number;
}

export interface ReleasePokemonRequest {
    pokemonId: string;
}

export interface CapturePokemonResponse {
    capturedAt: string;
    cleanliness: number;
    crieUrl: string;
    energy: number;
    experience: number;
    happiness: number;
    hunger: number;
    hp: number;
    id: string;
    lastCleaned?: string;
    isStarter: boolean;
    lastFed?: string;
    lastPlayed?: string;
    level: number;
    name: string;
    pokemonId: string;
    nickname?: string;
    spriteUrl: string;
    region: string;
    userId: string;
    types: PokemonType[];
}

export interface ReleasePokemonResponse {
    success: boolean;
}

export interface StarterPokemon {
    pokemonId: string;
    name: string;
    hp: number;
    types: {
        name: string;
    }[];
    spriteUrl: string;
    crieUrl: string;
}

export interface RandomPokemon {
    pokemonId: string;
    name: string;
    hp: number;
    types: PokemonType[];
    spriteUrl: string;
    crieUrl: string;
}

export interface CapturePokemonVariables {
    pokemonID: number;
}

export interface ReleasePokemonVariables {
    pokemonID: string;
}

export interface StarterPokemonsVariables {
    region: string;
}

export interface RandomPokemonVariables {
    region: string;
}

export interface MyPokemonsData {
    myPokemons: MyPokemonsResponse[];
}

export interface MyCurrentPokemonData {
    myCurrentPokemon: Pokemon;
}

export interface StarterPokemonsData {
    starterPokemons: StarterPokemon[];
}

export interface RandomPokemonData {
    randomPokemon: RandomPokemon;
}

export interface CapturePokemonData {
    capturePokemon: CapturePokemonResponse;
}

export interface ReleasePokemonData {
    releasePokemon: boolean;
}
