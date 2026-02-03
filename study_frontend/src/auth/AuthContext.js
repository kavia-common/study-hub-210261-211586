import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createApiClient } from "../api/client";

const TOKEN_KEY = "studyhub_token_v1";

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** This app supports token-like strings, including "Basic <base64>" for DRF basic auth. */
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(null);

  const getToken = useCallback(() => token, [token]);

  const api = useMemo(() => createApiClient({ baseUrl: "/api", getToken }), [getToken]);

  const persistToken = useCallback((nextToken) => {
    setToken(nextToken);
    if (nextToken) window.localStorage.setItem(TOKEN_KEY, nextToken);
    else window.localStorage.removeItem(TOKEN_KEY);
  }, []);

  // PUBLIC_INTERFACE
  const login = useCallback(
    async ({ username, password }) => {
      /**
       * Current swagger.json indicates Basic auth security scheme.
       * We store a "token" that is actually the full Authorization header value.
       */
      const { token: basicHeader } = await api.loginBasic({ username, password });
      persistToken(basicHeader);

      // Try to fetch profile (may not exist yet). Not fatal.
      try {
        const me = await api.getMe();
        setUser(me || { username });
      } catch {
        setUser({ username });
      }
    },
    [api, persistToken]
  );

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    persistToken("");
    setUser(null);
  }, [persistToken]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthed: Boolean(token),
      api,
      login,
      logout,
      setUser,
    }),
    [token, user, api, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth state and API client. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
