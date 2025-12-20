import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { User, UserManager, WebStorageStateStore } from "oidc-client-ts";

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
    groups: ["admin"],
  },
  expires_at: Math.floor(Date.now() / 1000) + 3600,
} as unknown as User;

const OIDC_AUTHORITY =
  import.meta.env.VITE_OIDC_AUTHORITY || "https://auth.example.com/application/o/your-app";
const OIDC_CLIENT_ID =
  import.meta.env.VITE_OIDC_CLIENT_ID || "your-client-id";
const OIDC_REDIRECT_URI =
  import.meta.env.VITE_OIDC_REDIRECT_URI || "http://localhost:3000/callback";
const OIDC_POST_LOGOUT_REDIRECT_URI =
  import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI ||
  "http://localhost:3000/";

const userManager = new UserManager({
  authority: OIDC_AUTHORITY,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: OIDC_REDIRECT_URI,
  post_logout_redirect_uri: OIDC_POST_LOGOUT_REDIRECT_URI,
  scope: "openid profile email",
  response_type: "code",
  response_mode: "query",
  loadUserInfo: true,
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

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
      const u = await userManager.getUser();
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

  const login = () => {
    if (AUTH_BYPASS) {
      setAuthenticated(true);
    } else {
      userManager.signinRedirect();
    }
  };

  const logout = () => {
    if (AUTH_BYPASS) {
      setAuthenticated(false);
    } else {
      userManager.signoutRedirect();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        login,
        logout,
        userManager,
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
