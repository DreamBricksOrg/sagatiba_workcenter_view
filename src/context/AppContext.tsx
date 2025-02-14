import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface IAppContext {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const USER_KEY = 'username';

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem(USER_KEY, username);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  useEffect(() => {
    const session = localStorage.getItem(USER_KEY);
    if (session) {
      setUser(session);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
