"use client";

import { useAuthContext } from "../../contexts/AuthContext";
import { useCurrentPokemon } from "../../features/pokemon/hooks";
import { AuthGuard } from "../../components/AuthGuard";
import { Header } from "../../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import {
    Cat,
    User,
    Mail,
    Trophy,
    Star,
    MapPin,
    Settings,
    Unlock,
    Lock,
} from "lucide-react";
import Image from "next/image";

function UserContent() {
    const { user, isLoading } = useAuthContext();
    const {
        currentPokemon,
        pokemonName,
        pokemonNickname,
        pokemonLevel,
        pokemonHp,
        pokemonExperience,
        pokemonEnergy,
        pokemonHappiness,
        pokemonTypes,
        pokemonSpriteUrl,
        isLoading: pokemonLoading
    } = useCurrentPokemon();

    if (isLoading || pokemonLoading) {
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Header showUserButton={false} />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-500" />
                                Olá {user?.username}
                            </CardTitle>
                            <CardDescription>
                                Confira abaixo suas informações
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span><strong>Usuário:</strong> {user?.username}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span><strong>Email:</strong> {user?.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span><strong>Nível:</strong> {user?.level}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-4 w-4 text-orange-500" />
                                    <span><strong>Experiência:</strong> {user?.experience}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-green-500" />
                                    <span><strong>Região Atual:</strong> {user?.currentRegion}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Cat className="h-4 w-4 text-purple-500" />
                                    <span><strong>Pokemon Atual:</strong> {pokemonNickname || pokemonName || "Nenhum Pokemon selecionado"}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-green-500" />
                                Regiões de Pokemon
                            </CardTitle>
                            <CardDescription>
                                Suas regiões desbloqueadas
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {user?.regions?.map((region, index) => (
                                    <div key={index} className="p-2 bg-gray-100 rounded flex justify-between items-center">
                                        <p><strong>{region.regionName}</strong></p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-600 px-3 py-1 bg-gray-600 rounded-full text-white font-bold">{region.pokemonCount}</span>
                                            {region.unlocked ? <Unlock className="h-4 w-4 text-green-600" /> : <Lock className="h-4 w-4 text-red-500" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Cat className="h-5 w-5 text-purple-500" />
                                Pokemon Atual
                            </CardTitle>
                            <CardDescription>
                                {pokemonName ? `Detalhes do ${pokemonName}` : "Nenhum Pokemon selecionado"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {currentPokemon ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {pokemonSpriteUrl && (
                                            <Image
                                                src={pokemonSpriteUrl}
                                                alt={pokemonName || "Pokemon"}
                                                width={64}
                                                height={64}
                                                className="object-contain"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {pokemonNickname || pokemonName}
                                            </h3>
                                            <div className="flex gap-1">
                                                {pokemonTypes.map((type, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-200 text-xs rounded"
                                                    >
                                                        {type.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div><strong>Nível:</strong> {pokemonLevel}</div>
                                        <div><strong>HP:</strong> {pokemonHp}</div>
                                        <div><strong>Experiência:</strong> {pokemonExperience}</div>
                                        <div><strong>Energia:</strong> {pokemonEnergy}</div>
                                        <div><strong>Felicidade:</strong> {pokemonHappiness}</div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">Nenhum Pokemon selecionado</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5 text-gray-500" />
                                Informações da Conta
                            </CardTitle>
                            <CardDescription>
                                Veja abaixo suas informações da conta
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p><strong>Membro desde:</strong> {new Date(user?.createdAt || "").toLocaleDateString()}</p>
                                <p><strong>Última atualização:</strong> {new Date(user?.updatedAt || "").toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function UserPage() {
    return (
        <AuthGuard>
            <UserContent />
        </AuthGuard>
    );
}
