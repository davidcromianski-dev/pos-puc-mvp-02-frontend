import { gql } from "@apollo/client";

export const CHOOSE_STARTER = gql`
mutation ChooseStarter($region: String!, $pokemonId: Int!) {
    chooseStarter(starterData: { region: $region, pokemonId: $pokemonId }) {
        id
        username
        email
        role
        active
        deactivationDate
        currentRegion
        currentPokemon
        level
        experience
        createdAt
        updatedAt
        regions {
            regionName
            pokemonIds
            pokemonCount
            starterPokemonId
            unlocked
            unlockedAt
        }
    }
}

`;

export const SELECT_POKEMON = gql`
mutation SelectPokemon($id: String!) {
    selectPokemon(pokemonData: { id: $id }) {
        id
        username
        email
        role
        active
        deactivationDate
        currentRegion
        currentPokemon
        level
        experience
        createdAt
        updatedAt
        regions {
            regionName
            pokemonIds
            pokemonCount
            starterPokemonId
            unlocked
            unlockedAt
        }
    }
}

`;