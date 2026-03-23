import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export interface AuthUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  currentUser: Omit<AuthUser, "password"> | null;
  demoUsers: Omit<AuthUser, "password">[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => LoginResult;
  logout: () => void;
}

const USERS: AuthUser[] = [
  {
    id: "user-1",
    username: "olena",
    password: "garden123",
    fullName: "Олена Коваль",
    role: "Головна садівниця",
  },
  {
    id: "user-2",
    username: "maksym",
    password: "plants456",
    fullName: "Максим Бондар",
    role: "Помічник у теплиці",
  },
];

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  demoUsers: [],
  isAuthenticated: false,
  login: () => ({ success: false, error: "Auth context is not ready." }),
  logout: () => {},
});

function sanitizeUser(user: AuthUser): Omit<AuthUser, "password"> {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Omit<
    AuthUser,
    "password"
  > | null>(null);

  const demoUsers = useMemo(() => USERS.map(sanitizeUser), []);

  const login = (username: string, password: string): LoginResult => {
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const matchedUser = USERS.find(
      (user) =>
        user.username.toLowerCase() === normalizedUsername &&
        user.password === normalizedPassword,
    );

    if (!matchedUser) {
      return {
        success: false,
        error:
          "Невірний логін або пароль. Спробуйте один із тестових акаунтів.",
      };
    }

    setCurrentUser(sanitizeUser(matchedUser));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        demoUsers,
        isAuthenticated: currentUser !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
