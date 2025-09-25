import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LOGIN, REGISTER } from "../../graphql/domains/auth/mutations";
import { ME } from "../../graphql/domains/user/queries";
import type { 
  LoginVariables, 
  RegisterVariables, 
  LoginData, 
  RegisterData 
} from "../../graphql/domains/auth/types";
import type { MeData } from "../../graphql/domains/user/types";

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: meData, loading: meLoading, error: meError, refetch } = useQuery<MeData>(ME, {
    errorPolicy: "all",
    skip: typeof window === "undefined",
    onCompleted: (data) => {
      if (data?.me) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.log("ME query error:", error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  });

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

  const [loginMutation, { loading: loginLoading, error: loginError }] = useMutation<
    LoginData,
    LoginVariables
  >(LOGIN, {
    onCompleted: async (data) => {
      if (data?.login?.accessToken) {
        setToken(data.login.accessToken);
        setIsAuthenticated(true);
        setIsLoading(false);
        try {
          await refetch();
        } catch (error) {
          console.error("Error refetching user data:", error);
        }
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    }
  });

  const [registerMutation, { loading: registerLoading, error: registerError }] = useMutation<
    RegisterData,
    RegisterVariables
  >(REGISTER, {
    onCompleted: async (data) => {
      if (data?.register?.accessToken) {
        setToken(data.register.accessToken);
        setIsAuthenticated(true);
        setIsLoading(false);
        try {
          await refetch();
        } catch (error) {
          console.error("Error refetching user data:", error);
        }
        router.push("/dashboard"); // Redirect directly to dashboard
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
    }
  });

  const login = async (username: string, password: string) => {
    try {
      await loginMutation({
        variables: { username, password }
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (username: string, password: string, email: string) => {
    try {
      await registerMutation({
        variables: { username, password, email }
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }
    
    const token = localStorage.getItem("token") || 
      document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];

    if (token && !meData) {
      refetch();
    }
    setIsLoading(false);
  }, [meData, refetch]);

  return {
    user: meData?.me,
    isAuthenticated,
    isLoading: isLoading || meLoading,
    login,
    register,
    logout,
    loginLoading,
    registerLoading,
    loginError,
    registerError,
    meError
  };
};
