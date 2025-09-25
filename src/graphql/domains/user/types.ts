export interface PokemonType {
    name: string;
    url: string;
}

export interface UserRegion {
    regionName: string;
    pokemonIds: string[];
    starterPokemonId: string;
    pokemonCount: number;
    unlocked: boolean;
    unlockedAt?: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    level: number;
    experience: number;
    currentRegion: string;
    currentPokemon: string;
    createdAt: string;
    updatedAt: string;
    regions: UserRegion[];
}

export interface ChooseStarterRequest {
    pokemonId: string;
    region: string;
}

export interface SelectPokemonRequest {
    pokemonId: string;
}

export interface ChooseStarterResponse {
    id: string;
    username: string;
    regions: {
        pokemonIds: string[];
        starterPokemonId: string;
    }[];
    currentRegion: string;
}

export interface SelectPokemonResponse {
    active: boolean;
    createdAt: string;
    currentPokemon: string;
    currentRegion: string;
    deactivationDate?: string;
    email: string;
    experience: number;
    id: string;
    level: number;
    role: string;
    updatedAt: string;
    username: string;
    regions: UserRegion[];
}

export interface ChooseStarterVariables {
    pokemonId: string;
    region: string;
}

export interface SelectPokemonVariables {
    pokemonId: string;
}

export interface MeData {
    me: User;
}

export interface ChooseStarterData {
    chooseStarter: ChooseStarterResponse;
}

export interface SelectPokemonData {
    selectPokemon: SelectPokemonResponse;
}
