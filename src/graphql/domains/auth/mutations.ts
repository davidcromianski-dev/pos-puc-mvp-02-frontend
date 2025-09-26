import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation Login(
  $username: String!, 
  $password: String!
) {
  login(loginData: {username: $username, password: $password}) {
    accessToken
    user {
      id
      username
      email
      level
      experience
      currentRegion
      currentPokemon
      createdAt
      updatedAt
      regions {
        regionName
        pokemonIds
        starterPokemonId
        pokemonCount
        unlocked
        unlockedAt
      }
    }
  }
}
`;

export const REGISTER = gql`
mutation Register(
  $username: String! = "ash",
  $password: String! = "pikachu",
  $email: String! = "ash@mail.com"
) {
  register(
    userData: {username: $username, password: $password, email: $email}
  ) {
    accessToken
    user {
      id
      username
      email
      level
      experience
      currentRegion
      currentPokemon
      createdAt
      updatedAt
      regions {
        regionName
        pokemonIds
        starterPokemonId
        pokemonCount
        unlocked
        unlockedAt
      }
    }
  }
}
`;
