import { gql } from "@apollo/client";

export const MY_POKEDEX = gql`
query MyPokedex {
  myPokedex {
    pokemonId
    name
    hp
    crieUrl
    spriteUrl
    types {
      name
      url
    }
  }
}
`;

export const STARTER_POKEMONS = gql`
query StarterPokemons($region: String! = "kanto") {
  starterPokemons(region: $region) {
    pokemonId
    name
    hp
    types {
      name
    }
    spriteUrl
    crieUrl
  }
}
`;

export const RANDOM_POKEMON = gql`
query RandomPokemon($region: String! = "kanto") {
  randomPokemon(region: $region) {
    crieUrl
    name
    hp
    pokemonId
    types {
      name
      url
    }
    spriteUrl
  }
}
`;
