import { gql } from "@apollo/client";

export const ME = gql`
query Me {
  me {
    createdAt
    currentRegion
    currentPokemon
    email
    experience
    id
    level
    updatedAt
    username
    regions {
      pokemonIds
      regionName
      starterPokemonId
      pokemonCount
      unlocked
      unlockedAt
    }
  }
}
`;