import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "axios";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  token?: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  demoUsers: Omit<AuthUser, "token">[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const DEMO_USERS: Omit<AuthUser, "token">[] = [
  {
    id: "user-1",
    username: "olena",
    email: "eve.holt@reqres.in",
    fullName: "Олена Коваль",
    role: "Головна садівниця",
  },
  {
    id: "user-2",
    username: "maksym",
    email: "eve.holt@reqres.in",
    fullName: "Максим Бондар",
    role: "Помічник у теплиці",
  },
  {
    id: "user-3",
    username: "test",
    email: "eve.holt@reqres.in",
    fullName: "test",
    role: "test",
  },
];

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  demoUsers: [],
  isAuthenticated: false,
  isLoading: false,
  login: () => Promise.resolve({ success: false, error: "Auth context is not ready." }),
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const demoUsers = useMemo(() => DEMO_USERS, []);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      if (response.data.token) {
        const matchedUser = DEMO_USERS.find(
          (user) => user.email.toLowerCase() === email.trim().toLowerCase()
        );

        setCurrentUser({
          id: matchedUser?.id ?? "user-api",
          username: matchedUser?.username ?? email.split("@")[0],
          email: email.trim().toLowerCase(),
          fullName: matchedUser?.fullName ?? email.split("@")[0],
          role: matchedUser?.role ?? "Користувач",
          token: response.data.token,
        });
        return { success: true };
      }

      return { success: false, error: "Не вдалося отримати токен авторизації." };
    } catch (error: unknown) {
      const normalizedEmail = email.trim().toLowerCase();
      if (normalizedEmail === "eve.holt@reqres.in" && password.trim() === "cityslicka") {
        console.warn("ReqRes API недоступне або вимагає ключ. Використовується локальний обхід (fallback) для входу.");
        
        const matchedUser = DEMO_USERS.find(user => user.email === normalizedEmail);
        setCurrentUser({
          id: matchedUser?.id ?? "user-api",
          username: matchedUser?.username ?? "eve",
          email: normalizedEmail,
          fullName: matchedUser?.fullName ?? "Ева Холт",
          role: matchedUser?.role ?? "Користувач",
          token: "QpwL5tke4Pnpja7X4", // Фейковий токен 
        });
        return { success: true };
      }

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          return {
            success: false,
            error: "Невірний email або пароль. Спробуйте: eve.holt@reqres.in / cityslicka",
          };
        }
        return {
          success: false,
          error: "Помилка мережі. Перевірте підключення до інтернету.",
        };
      }
      return {
        success: false,
        error: "Сталася невідома помилка. Спробуйте пізніше.",
      };
    } finally {
      setIsLoading(false);
    }
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
        isLoading,
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
