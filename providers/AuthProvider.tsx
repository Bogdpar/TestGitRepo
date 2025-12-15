"use client";
import { createContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const login = useCallback(
    (userData: User) => {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      router.replace("/main");
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    router.replace("/auth");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
