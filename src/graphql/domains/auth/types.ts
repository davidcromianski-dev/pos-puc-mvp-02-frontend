export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        username: string;
        email: string;
        level: number;
        experience: number;
        currentRegion: string;
        currentPokemon: string;
        createdAt: string;
        updatedAt: string;
        regions: {
            regionName: string;
            pokemonIds: string[];
            starterPokemonId: string;
            pokemonCount: number;
            unlocked: boolean;
            unlockedAt?: string;
        }[];
    };
}

export interface LoginVariables {
    username: string;
    password: string;
}

export interface RegisterVariables {
    username: string;
    password: string;
    email: string;
}

export interface LoginData {
    login: AuthResponse;
}

export interface RegisterData {
    register: AuthResponse;
}