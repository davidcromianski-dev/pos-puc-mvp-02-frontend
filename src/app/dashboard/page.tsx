"use client";

import { useAuth } from "../../features/auth/hooks";
import { useCurrentPokemon, useMyPokemons } from "../../features/pokemon/hooks";
import { Button } from "../../components/ui/button";
import { IconButton } from "../../components/ui/icon-button";
import { ClientOnly } from "../../lib/client-only";
import {
  LogOut,
  User,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@apollo/client/react";
import { SELECT_POKEMON } from "../../graphql/domains/user/mutations";
import { useState } from "react";

function DashboardContent() {
  const { user, logout, isLoading } = useAuth();
  const {
    pokemonName,
    pokemonNickname,
    pokemonSpriteUrl,
    pokemonCrieUrl,
    pokemonLevel,
    currentPokemon,
    refetch: refetchCurrentPokemon
  } = useCurrentPokemon();
  const { pokemons, isLoading: pokemonsLoading } = useMyPokemons();
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  const [selectPokemonMutation, { loading: selectingPokemon }] = useMutation(SELECT_POKEMON, {
    onCompleted: () => {
      refetchCurrentPokemon();
      setShowConfirmation(null);
    },
    onError: (error) => {
      console.error("Error selecting Pokemon:", error);
      setShowConfirmation(null);
    }
  });

  const handlePokemonClick = (pokemonId: string) => {
    if (currentPokemon?.pokemonId === pokemonId) {
      return;
    }
    setShowConfirmation(pokemonId);
  };

  const confirmPokemonSelection = async (pokemonId: string) => {
    try {
      await selectPokemonMutation({
        variables: { pokemonId }
      });
    } catch (error) {
      console.error("Failed to select Pokemon:", error);
    }
  };

  if (isLoading || pokemonsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex">
      <div className="max-w-4xl mx-auto flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <Link href="/user">
            <IconButton icon={<User className="h-4 w-4" />} variant="ghost" className="p-4 bg-gray-300 rounded-full" />
          </Link>

          <div className="flex items-center gap-2">
            <Button onClick={logout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-start flex-1 gap-6 flex-col pt-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-5xl font-bold capitalize mb-2">{pokemonName}</p>
            <p className="text-lg text-gray-500">{pokemonNickname}</p>
            <p className="text-lg text-gray-500">Nível {pokemonLevel}</p>
          </div>

          <Image
            src={pokemonSpriteUrl}
            alt={pokemonName}
            width={250}
            height={250}
            className="object-contain cursor-pointer"
            style={{ filter: "drop-shadow(4px 4px 0px #222)" }}
            onClick={() => {
              const crie = new Audio(pokemonCrieUrl);
              crie.play();
            }}
          />

          <div className="mt-10">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Seus Pokémons - {user?.currentRegion?.toUpperCase()}
              </h2>
              <p className="text-gray-600 text-sm">
                Clique em um Pokémon para trocá-lo como atual
              </p>
            </div>

            {pokemons.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4">
                {pokemons.map((pokemon) => (
                  <div
                    key={pokemon.pokemonId}
                    className={`relative w-20 h-20 rounded-full border-4 cursor-pointer transition-all duration-200 hover:scale-110 ${currentPokemon?.pokemonId === pokemon.pokemonId
                        ? 'border-yellow-500 bg-yellow-100 shadow-lg'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                      }`}
                    onClick={() => handlePokemonClick(pokemon.pokemonId)}
                  >
                    <Image
                      src={pokemon.spriteUrl}
                      alt={pokemon.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-contain p-2"
                    />
                    {currentPokemon?.pokemonId === pokemon.pokemonId && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">★</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Você ainda não tem Pokémons nesta região.</p>
              </div>
            )}
          </div>
        </div>



        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <div className="text-center">
                <RotateCcw className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trocar Pokémon Atual?</h3>
                <p className="text-gray-600 mb-6">
                  Tem certeza que deseja trocar seu Pokémon atual?
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmation(null)}
                    disabled={selectingPokemon}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => confirmPokemonSelection(showConfirmation)}
                    disabled={selectingPokemon}
                    className="flex items-center gap-2"
                  >
                    {selectingPokemon ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Trocando...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4" />
                        Confirmar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default function DashboardPage() {
  return (
    <ClientOnly fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </ClientOnly>
  );
}
