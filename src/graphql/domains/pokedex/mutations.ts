import { gql } from "@apollo/client";

export const CAPTURE_POKEMON = gql`
mutation CapturePokemon($pokemonID: Int!) {
  capturePokemon(captureData: {pokemonId: $pokemonID}) {
    capturedAt
    cleanliness
    crieUrl
    energy
    experience
    happiness
    hunger
    hp
    id
    lastCleaned
    isStarter
    lastFed
    lastPlayed
    level
    name
    pokemonId
    nickname
    spriteUrl
    region
    userId
    types {
      name
      url
    }
  }
}
`;
