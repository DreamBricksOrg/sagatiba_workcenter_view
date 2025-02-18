import { IUser } from '@/types/IUser';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface IAppContext {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const USER_KEY = 'username';

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (user: IUser) => {
    setUser(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  useEffect(() => {
    const session = localStorage.getItem(USER_KEY);
    if (session) {
      setUser(JSON.parse(session));
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
