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