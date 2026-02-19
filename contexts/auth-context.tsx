"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearStoredToken,
  setStoredToken,
  getStoredToken,
  apiGetMe,
  apiLogin,
  apiRegister,
  type UserProfile,
  type RegisterPayload,
} from "@/lib/api-client";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const t = getStoredToken();
    if (!t) {
      setTokenState(null);
      setUser(null);
      return;
    }
    setTokenState(t);
    try {
      const profile = await apiGetMe();
      setUser(profile);
    } catch {
      clearStoredToken();
      setTokenState(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const storedToken = getStoredToken();
    if (!storedToken) {
      setTokenState(null);
      setUser(null);
      setIsLoading(false);
      return;
    }
    setTokenState(storedToken);
    apiGetMe()
      .then((profile) => {
        if (profile === null) {
          clearStoredToken();
          setTokenState(null);
          setUser(null);
        } else {
          setUser(profile);
        }
      })
      .catch(() => {
        clearStoredToken();
        setTokenState(null);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!token || user !== null || isLoading) return;
    let cancelled = false;
    apiGetMe().then(
      (profile) => {
        if (cancelled) return;
        if (profile === null) {
          clearStoredToken();
          setTokenState(null);
          setUser(null);
        } else {
          setUser(profile);
        }
      },
      () => {
        if (!cancelled) {
          clearStoredToken();
          setTokenState(null);
          setUser(null);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, [token, user, isLoading]);

  const login = useCallback(async (email: string, password: string) => {
    const { access_token } = await apiLogin(email, password);
    setStoredToken(access_token);
    setTokenState(access_token);
    const profile = await apiGetMe();
    setUser(profile ?? null);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const { access_token } = await apiRegister(payload);
    setStoredToken(access_token);
    setTokenState(access_token);

    let profile: UserProfile | null = null;
    try {
      profile = await apiGetMe();
    } catch {
      await new Promise((r) => setTimeout(r, 400));
      try {
        profile = await apiGetMe();
      } catch {
        setUser(null);
        return;
      }
    }
    setUser(profile ?? null);
  }, []);

  const logout = useCallback(() => {
    clearStoredToken();
    setTokenState(null);
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
