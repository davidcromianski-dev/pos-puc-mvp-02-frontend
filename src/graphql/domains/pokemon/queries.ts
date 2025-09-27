import { gql } from "@apollo/client";

export const MY_POKEMONS = gql`
query MyPokemons {
  myPokemons {
    count
    region
    pokemon {
      capturedAt
      cleanliness
      crieUrl
      energy
      experience
      happiness
      hp
      hunger
      id
      isStarter
      lastCleaned
      lastFed
      lastPlayed
      level
      name
      nickname
      pokemonId
      region
      spriteUrl
      types {
        name
        url
      }
      userId
    }
  }
}
`;

export const MY_CURRENT_POKEMON = gql`
query MyCurrentPokemon {
  myCurrentPokemon {
    capturedAt
    cleanliness
    crieUrl
    energy
    experience
    happiness
    hp
    hunger
    id
    isStarter
    lastCleaned
    lastFed
    lastPlayed
    name
    level
    nickname
    pokemonId
    region
    userId
    spriteUrl
    types {
      name
      url
    }
  }
}
`;