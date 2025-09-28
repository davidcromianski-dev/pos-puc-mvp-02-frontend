"use client";

import { useAuthContext } from "../../contexts/AuthContext";
import {
  useCurrentPokemon,
  useMyPokemons,
  useCapturePokemon,
  useRandomPokemon,
} from "../../features/pokemon/hooks";
import { useSelectPokemon, useReleasePokemon } from "../../features/user/hooks";
import { AuthGuard } from "../../components/AuthGuard";
import { Header } from "../../components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Pokemon, RandomPokemon } from "../../graphql/domains/pokemon/types";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Binoculars, DoorOpen, BadgeQuestionMark } from "lucide-react";
import { SelectPokemonDialog } from "./dialogs/SelectPokemonDialog";
import { ReleasePokemonDialog } from "./dialogs/ReleasePokemonDialog";
import { CapturePokemonDialog } from "./dialogs/CapturePokemonDialog";
import { useToast } from "../../contexts/ToastContext";
import { useAuthState } from "../../hooks/useAuthState";

function DashboardContent() {
  const { user } = useAuthContext();
  const { success, error, warning } = useToast();
  useAuthState();
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
    refetch: refetchCurrentPokemon,
  } = useCurrentPokemon();
  const { myPokemons, refetch: refetchMyPokemons } = useMyPokemons();
  const {
    showConfirmation: showSelectConfirmation,
    selectingPokemon,
    handlePokemonSelection,
    confirmPokemonSelection,
    cancelSelection
  } = useSelectPokemon();
  const {
    showConfirmation: showReleaseConfirmation,
    handleReleasePokemonClick,
    cancelReleasePokemon,
    confirmReleasePokemon,
  } = useReleasePokemon();
  const {
    capturePokemon,
  } = useCapturePokemon();
  const { getRandomPokemon } = useRandomPokemon();
  const [randomPokemon, setRandomPokemon] = useState<RandomPokemon | null>(null);

  const [currentRegionPokemons, setCurrentRegionPokemons] = useState<Pokemon[]>([]);
  const [showCaptureDialog, setShowCaptureDialog] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (user && myPokemons?.length > 0) {
      const pokemonsByRegion = myPokemons.find((data: unknown) => {
        const regionData = data as { region?: string };
        return regionData?.region === user?.currentRegion;
      });
      const regionPokemon = pokemonsByRegion as { pokemon?: Pokemon[] };
      setCurrentRegionPokemons(regionPokemon?.pokemon ?? []);
    }
  }, [myPokemons, user]);

  const handlePokemonSelectionClick = (pokemonId: string) => {
    handlePokemonSelection(pokemonId, currentPokemon?.id);
  };

  const handleConfirmSelection = async (pokemonId: string) => {
    await confirmPokemonSelection(pokemonId, refetchCurrentPokemon);
  };

  const handlePokemonReleaseClick = async (pokemonId: string) => {
    await handleReleasePokemonClick(pokemonId);
  };

  const handleConfirmReleasePokemon = async (pokemonId: string) => {
    try {
      const releasedPokemon = currentRegionPokemons.find(pokemon => pokemon.id === pokemonId);

      await confirmReleasePokemon(pokemonId, refetchCurrentPokemon);

      if (releasedPokemon) {
        success(`${releasedPokemon.name} foi abandonado com sucesso!`);
      } else {
        success("Pokémon foi abandonado com sucesso!");
      }

      setCurrentRegionPokemons([]);

      await Promise.all([refetchCurrentPokemon(), refetchMyPokemons()]);
    } catch (err) {
      console.error("Error releasing Pokemon:", err);
      error("Erro ao abandonar Pokémon");
    }
  };

  const handleCapturePokemon = async () => {
    try {
      const pokemon = await getRandomPokemon() as RandomPokemon;
      setRandomPokemon(pokemon);
      setShowCaptureDialog(true);
    } catch (err: unknown) {
      console.error("Error getting random pokemon:", err);
      error("Erro ao buscar Pokémon selvagem");
    }
  };

  const handleConfirmCapture = async () => {
    const { pokemonId, name } = randomPokemon as RandomPokemon;
    if (!pokemonId) {
      error("Pokémon inválido para captura");
      return;
    }

    setIsCapturing(true);

    try {
      const { data } = await capturePokemon(pokemonId);
      if (data?.capturePokemon) {
        success(`${name} foi capturado com sucesso!`);
        setShowCaptureDialog(false);
        setRandomPokemon(null);

        await Promise.all([refetchCurrentPokemon(), refetchMyPokemons()]);
      } else {
        warning(`${name} escapou! Tente novamente.`);
      }
    } catch (err: unknown) {
      console.error("Error capturing pokemon:", err);
      error("Erro ao capturar Pokémon");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleCancelCapture = () => {
    setShowCaptureDialog(false);
    setRandomPokemon(null);
    setIsCapturing(false);
  };

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex">
      <div className="max-w-4xl mx-auto flex-1 flex flex-col">
        <Header showDashboardButton={false} />

        <div className="flex items-center justify-start flex-1 gap-4 flex-col">
          {currentPokemon ? (
            <>
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
                  <Image
                    src={pokemonSpriteUrl}
                    alt={pokemonName || "Pokémon"}
                    width={250}
                    height={250}
                    className="object-contain cursor-pointer"
                    style={{ width: "250px", height: "250px" }}
                    unoptimized
                    onClick={() => {
                      if (pokemonCrieUrl) {
                        const crie = new Audio(pokemonCrieUrl);
                        crie.play();
                      }
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="mt-4 text-gray-600">Você não possui um Pókemon selecionado</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
            {currentPokemon && (
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer capitalize border-red-200 text-red-500"
                onClick={() => handlePokemonReleaseClick(currentPokemon?.id)}
              >
                <DoorOpen className="h-12 w-12" />
                Abandonar {pokemonName}
              </Button>
            )}

            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleCapturePokemon}
            >
              <Binoculars className="h-12 w-12" />
              Capturar novo pokémon
            </Button>
          </div>

          {!currentRegionPokemons?.length ? (
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="mt-4 text-gray-600">Você não possui nenhum Pokémon nessa região</p>
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  Seus Pokémons - {user?.currentRegion?.toUpperCase()}
                </h2>
                <p className="text-gray-600 text-sm">
                  Clique em um Pokémon para trocá-lo como atual
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {currentRegionPokemons.map((pokemon) => (
                  <div
                    key={pokemon.id}
                    className={`relative flex items-center justify-center w-15 h-15 rounded-full border-4 cursor-pointer transition-all duration-200 hover:scale-110 ${currentPokemon?.id === pokemon.id
                      ? 'border-yellow-500 bg-yellow-100 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                      }`}
                    onClick={() => handlePokemonSelectionClick(pokemon.id)}
                  >
                    {pokemon.spriteUrl ? (
                      <Image
                        src={pokemon.spriteUrl}
                        alt={pokemon.name}
                        width={50}
                        height={50}
                        unoptimized
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (<BadgeQuestionMark className="h-9 w-9 text-gray-700" />)}

                    {currentPokemon?.id === pokemon.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">★</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <SelectPokemonDialog
          showConfirmation={showSelectConfirmation}
          selectingPokemon={selectingPokemon}
          onCancel={cancelSelection}
          onConfirm={handleConfirmSelection}
        />

        <ReleasePokemonDialog
          showConfirmation={showReleaseConfirmation}
          onCancel={cancelReleasePokemon}
          onConfirm={handleConfirmReleasePokemon}
        />

        <CapturePokemonDialog
          isOpen={showCaptureDialog}
          onClose={handleCancelCapture}
          onConfirm={handleConfirmCapture}
          isCapturing={isCapturing}
          randomPokemon={randomPokemon}
        />

      </div>
    </div >
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
