"use client";

import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import Image from "next/image";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "ash",
    password: "pikachu",
    email: "ash@mail.com"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, register, loginLoading, registerLoading, loginError, registerError } = useAuthContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Usuário é obrigatório";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = "Email é obrigatório";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email é inválido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await login(formData.username, formData.password);
      } else {
        await register(formData.username, formData.password, formData.email);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", password: "", email: "" });
    setErrors({});
  };

  const isLoading = loginLoading || registerLoading;
  const authError = loginError || registerError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md relative">
        <Image
          priority
          src="/assets/images/pokemon/pikachu.png"
          alt="Pikachu"
          className="absolute margin-auto top-0"
          width={500}
          height={500}
          style={{ 
            width: "auto", 
            height: "auto", 
            filter: "drop-shadow(-6px 10px 0px #cecece)",
            top: "-50%",
            left: "-10%",
          }}
        />
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            POKÉMON MVP
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Digite suas credenciais para acessar sua conta"
              : "Preencha o formulário abaixo para criar uma nova conta"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                Usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Digite seu usuário"
                  className={`pl-10 ${errors.username ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Digite seu email"
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha"
                  className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {authError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {authError.message || "Autenticação falhou. Por favor, tente novamente."}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? (isLogin ? "Entrando..." : "Criando conta...")
                : (isLogin ? "Entrar" : "Criar conta")
              }
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                disabled={isLoading}
              >
                {isLogin ? "Criar conta" : "Entrar"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
