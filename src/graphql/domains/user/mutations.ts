import { gql } from "@apollo/client";

export const CHOOSE_STARTER = gql`
mutation ChooseStarter($pokemonId: String!, $region: String!) {
  chooseStarter(starterData: {pokemonId: $pokemonId, region: $region}) {
    id
    username
    regions {
      pokemonIds
      starterPokemonId
    }
    currentRegion
  }
}
`;

export const SELECT_POKEMON = gql`
mutation SelectPokemon($pokemonId: String!) {
  selectPokemon(pokemonData: {pokemonId: $pokemonId}) {
    active
    createdAt
    currentPokemon
    currentRegion
    deactivationDate
    email
    experience
    id
    level
    role
    updatedAt
    username
    regions {
      pokemonCount
      pokemonIds
      regionName
      starterPokemonId
      unlocked
      unlockedAt
    }
  }
}
`;