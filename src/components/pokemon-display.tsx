"use client";

import { useCurrentPokemon } from "../features/pokemon/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Cat, Heart, Zap, Star } from "lucide-react";
import Image from "next/image";

export function PokemonDisplay() {
  const { 
    pokemonName, 
    pokemonNickname, 
    pokemonLevel,
    pokemonHp,
    pokemonExperience,
    pokemonEnergy,
    pokemonHappiness,
    pokemonTypes,
    pokemonSpriteUrl,
    isLoading 
  } = useCurrentPokemon();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!pokemonName) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cat className="h-5 w-5 text-gray-400" />
            Nenhum Pokemon
          </CardTitle>
          <CardDescription>
            Você ainda não tem um Pokemon selecionado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Selecione um Pokemon para ver os detalhes aqui.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cat className="h-5 w-5 text-purple-500" />
          {pokemonNickname || pokemonName}
        </CardTitle>
        <CardDescription>
          Nível {pokemonLevel} • {pokemonTypes.map(t => t.name).join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pokemonSpriteUrl && (
            <div className="flex justify-center">
              <Image 
                src={pokemonSpriteUrl} 
                alt={pokemonName} 
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>HP: {pokemonHp}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>XP: {pokemonExperience}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <span>Energia: {pokemonEnergy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-pink-500" />
              <span>Felicidade: {pokemonHappiness}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
