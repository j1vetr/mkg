import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { adminApi, type AdminMe } from "./lib/api";

interface AuthState {
  user: AdminMe | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminMe | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const me = await adminApi.me();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const login = async (username: string, password: string) => {
    const me = await adminApi.login(username, password);
    setUser(me);
  };

  const logout = async () => {
    try {
      await adminApi.logout();
    } catch {
      // ignore
    }
    setUser(null);
  };

  return <Ctx.Provider value={{ user, loading, login, logout, refresh }}>{children}</Ctx.Provider>;
}

export function useAdminAuth(): AuthState {
  const v = useContext(Ctx);
  if (!v) throw new Error("AdminAuthProvider missing");
  return v;
}
