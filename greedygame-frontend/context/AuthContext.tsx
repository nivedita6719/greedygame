
'use client'; // Essential: Must be the very first line

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Define a clear type for the user object
type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
};

// Define the type for the context value
type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
};

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const router = useRouter();

  // On initial load, try to get auth data from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to read auth state from localStorage", error);
    } finally {
      setIsLoading(false); // Stop loading once done
    }
  }, []);

  const login = (token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/");
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const value = { user, accessToken, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create the custom hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};