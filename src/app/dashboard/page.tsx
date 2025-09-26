"use client";

import { useAuthContext } from "../../contexts/AuthContext";
import { useCurrentPokemon, useMyPokemons } from "../../features/pokemon/hooks";
import { useSelectPokemon } from "../../features/user/hooks";
import { AuthGuard } from "../../components/AuthGuard";
import { Header } from "../../components/Header";
import { PokemonListSkeleton } from "../../components/PokemonListSkeleton";
import { ClientOnly } from "../../lib/client-only";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Pokemon } from "../../graphql/domains/pokemon/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

function DashboardContent() {
  const { user } = useAuthContext();
  const {
    pokemonName,
    pokemonNickname,
    pokemonSpriteUrl,
    pokemonCrieUrl,
    pokemonLevel,
    currentPokemon,
    pokemonTypes,
    pokemonHp,
    pokemonExperience,
    pokemonEnergy,
    pokemonHappiness,
    pokemonHunger,
    pokemonCleanliness,
    refetch: refetchCurrentPokemon
  } = useCurrentPokemon();
  const { myPokemons, isLoading: pokemonsLoading } = useMyPokemons();
  const {
    showConfirmation,
    selectingPokemon,
    handlePokemonClick,
    confirmPokemonSelection,
    cancelSelection
  } = useSelectPokemon();
  const [currentRegionPokemons, setCurrentRegionPokemons] = useState<Pokemon[]>([]);
  const [showPokemonSkeleton, setShowPokemonSkeleton] = useState(true);

  useEffect(() => {
    if (myPokemons?.length > 0) {
      const filteredRegion = myPokemons.find((data) => data.region === user?.currentRegion);
      if (filteredRegion?.pokemon) {
        setTimeout(() => {
          setCurrentRegionPokemons(filteredRegion?.pokemon);
          setShowPokemonSkeleton(false);
        }, 1500);
      }
    } else if (!pokemonsLoading) {
      setShowPokemonSkeleton(false);
    }
  }, [myPokemons, user, pokemonsLoading]);

  const handlePokemonSelection = (pokemonId: string) => {
    handlePokemonClick(pokemonId, currentPokemon?.id);
  };

  const handleConfirmSelection = async (pokemonId: string) => {
    await confirmPokemonSelection(pokemonId, refetchCurrentPokemon);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex">
      <div className="max-w-4xl mx-auto flex-1 flex flex-col">
        <Header showDashboardButton={false} />

        <div className="flex items-center justify-start flex-1 gap-6 flex-col pt-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-5xl font-bold capitalize mb-2">{pokemonName}</p>
            <p className="text-lg text-gray-500">{pokemonNickname}</p>
            <div className="flex gap-2 flex-wrap justify-center items-center pt-4 ">
              {pokemonTypes.map((type) => (
                <Badge key={type.name} variant="outline">{type.name}</Badge>
              ))}
              <Badge variant="default">Nível {pokemonLevel}</Badge>
              <Badge variant="secondary">HP {pokemonHp}</Badge>
              <Badge variant="secondary">Experiência {pokemonExperience}</Badge>
              <Badge variant="secondary">Energia {pokemonEnergy}</Badge>
              <Badge variant="secondary">Felicidade {pokemonHappiness}</Badge>
              <Badge variant="secondary">Fome {pokemonHunger}</Badge>
              <Badge variant="secondary">Limpeza {pokemonCleanliness}</Badge>
            </div>
          </div>

          <div className="flex justify-center items-center w-full h-full">
            {pokemonSpriteUrl && (
              <div className="relative flex flex-col items-center justify-between h-full w-full">
                <Image
                  src={pokemonSpriteUrl}
                  alt={pokemonName}
                  width={250}
                  height={250}
                  className="object-contain cursor-pointer"
                  style={{ width: "250px", height: "250px" }}
                  onClick={() => {
                    const crie = new Audio(pokemonCrieUrl);
                    crie.play();
                  }}
                />
                <div className="flex items-center justify-center">
                  <Button variant="destructive">
                    Abandonar
                  </Button>
                  <Button variant="secondary">
                    Capturar novo
                  </Button>
                </div>
              </div>

            )}
          </div>

          <div className="mt-10">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Seus Pokémons - {user?.currentRegion?.toUpperCase()}
              </h2>
              <p className="text-gray-600 text-sm">
                Clique em um Pokémon para trocá-lo como atual
              </p>
            </div>

            {showPokemonSkeleton ? (
              <PokemonListSkeleton />
            ) : currentRegionPokemons.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4">
                {currentRegionPokemons.map((pokemon) => (
                  <div
                    key={pokemon.id}
                    className={`relative w-15 h-15 rounded-full border-4 cursor-pointer transition-all duration-200 hover:scale-110 ${currentPokemon?.id === pokemon.id
                      ? 'border-yellow-500 bg-yellow-100 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                      }`}
                    onClick={() => handlePokemonSelection(pokemon.id)}
                  >
                    <Image
                      src={pokemon.spriteUrl}
                      alt={pokemon.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-contain p-2"
                    />
                    {currentPokemon?.id === pokemon.id && (
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

        <AlertDialog open={!!showConfirmation} onOpenChange={cancelSelection}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Trocar Pokémon Atual?</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja trocar seu Pokémon atual?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={selectingPokemon}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => showConfirmation && handleConfirmSelection(showConfirmation)}
                disabled={selectingPokemon}
                className="flex items-center gap-2"
              >
                {selectingPokemon ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Trocando...
                  </>
                ) : (
                  "Confirmar"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div >
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
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
    </AuthGuard>
  );
}
