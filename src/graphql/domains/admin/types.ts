export interface AdminUser {
  id: string;
  username: string;
  email: string;
  level: number;
  experience: number;
  currentRegion: string;
  currentPokemon: string;
  active: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  deactivationDate?: string;
  regions: Region[];
}

export interface DeleteUserRequest {
  username: string;
}

export interface DeleteUserResponse {
  success: boolean;
}

export interface DeleteUserVariables {
  username: string;
}

export interface GetAllUsersData {
  getAllUsers: AdminUser[];
}

export interface DeleteUserData {
  deleteUser: boolean;
}
