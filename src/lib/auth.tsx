import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { User, UserManager } from "oidc-client-ts";
import { createZitadelAuth, type ZitadelConfig } from "@zitadel/react";

type AuthContextType = {
  authenticated: boolean | null;
  user: User | null;
  login: () => void;
  logout: () => void;
  userManager: UserManager;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === "true" || false;

const fakeUser: User = {
  id_token: "fake-token",
  access_token: "fake-access",
  profile: {
    sub: "123",
    name: "Dev User",
    email: "dev@example.com",
    email_verified: true,
    "urn:zitadel:iam:org:project:roles": ["admin"],
  },
  expires_at: Math.floor(Date.now() / 1000) + 3600,
} as unknown as User;

const VITE_ZITADEL_AUTHORITY =
  import.meta.env.VITE_ZITADEL_AUTHORITY ||
  "https://your-instance.zitadel.cloud";
const ZITADEL_CLIENT_ID =
  import.meta.env.VITE_ZITADEL_CLIENT_ID || "your-client-id";
const ZITADEL_REDIRECT_URI =
  import.meta.env.VITE_ZITADEL_REDIRECT_URI || "http://localhost:3000/callback";
const ZITADEL_POST_LOGOUT_REDIRECT_URI =
  import.meta.env.VITE_ZITADEL_POST_LOGOUT_REDIRECT_URI ||
  "http://localhost:3000/";

const zitadelConfig: ZitadelConfig = {
  authority: VITE_ZITADEL_AUTHORITY,
  client_id: ZITADEL_CLIENT_ID,
  redirect_uri: ZITADEL_REDIRECT_URI,
  post_logout_redirect_uri: ZITADEL_POST_LOGOUT_REDIRECT_URI,
  scope: "openid profile email",
  response_type: "code",
  response_mode: "query", // PKCE is handled automatically by @zitadel/react
  loadUserInfo: true,
  monitorSession: true,
  automaticSilentRenew: true,
};

const zitadel = createZitadelAuth(zitadelConfig);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    console.log("refreshUser called, AUTH_BYPASS:", AUTH_BYPASS);
    if (AUTH_BYPASS) {
      console.log("Using fake user for development");
      setAuthenticated(true);
      setUser(fakeUser);
      return;
    }

    try {
      const u = await zitadel.userManager.getUser();
      if (u && !u.expired) {
        setAuthenticated(true);
        setUser(u);
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      setAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = () =>
    AUTH_BYPASS ? setAuthenticated(true) : zitadel.authorize();
  const logout = () =>
    AUTH_BYPASS ? setAuthenticated(false) : zitadel.signout();

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        login,
        logout,
        userManager: zitadel.userManager,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return ctx;
}
