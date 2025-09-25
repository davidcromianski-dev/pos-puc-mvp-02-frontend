import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
query GetAllUsers {
  getAllUsers {
      active
      createdAt
      currentPokemon
      currentRegion
      deactivationDate
      email
      experience
      id
      level
      regions {
        pokemonCount
        pokemonIds
        starterPokemonId
        unlocked
        unlockedAt
        regionName
      }
      role
      updatedAt
      username
  }
}
`;