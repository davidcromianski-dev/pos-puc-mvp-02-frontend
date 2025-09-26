import { useMutationMediator } from "../../hooks/useMutationMediator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOGIN, REGISTER } from "../../graphql/domains/auth/mutations";
import type { 
  LoginVariables, 
  RegisterVariables, 
  LoginData, 
  RegisterData 
} from "../../graphql/domains/auth/types";
import type { User } from "../../graphql/domains/user/types";

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    const expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const [loginMutation, { loading: loginLoading, error: loginError }] = useMutationMediator<
    LoginData,
    LoginVariables
  >(LOGIN);

  const [registerMutation, { loading: registerLoading, error: registerError }] = useMutationMediator<
    RegisterData,
    RegisterVariables
  >(REGISTER);

  const login = async (username: string, password: string) => {
    try {
      const result = await loginMutation({
        variables: { username, password }
      });
      
      if (result.data?.login?.accessToken && result.data?.login?.user) {
        setToken(result.data.login.accessToken);
        setUser(result.data.login.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (username: string, password: string, email: string) => {
    try {
      const result = await registerMutation({
        variables: { username, password, email }
      });
      
      if (result.data?.register?.accessToken && result.data?.register?.user) {
        setToken(result.data.register.accessToken);
        setUser(result.data.register.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading,
    login,
    register,
    logout,
    loginLoading,
    registerLoading,
    loginError,
    registerError,
  };
};
