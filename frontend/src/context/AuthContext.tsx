import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any;
  token: string | null;
  logIn: (credentials: any) => Promise<void>;
  logOut: () => void;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Check for authentication status from localStorage
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));  // Parse the stored user data
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        // If no user data, check the server (you can skip this if you want to rely on `localStorage` only)
        try {
          const response = await axios.get('http://localhost:5000/protected', {
            withCredentials: true,
          });
          if (response.data.authenticated) {
            setToken(response.data.token);
            setUser(response.data.user);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }
    };
    checkAuth();
  }, []);

  const logIn = async (credentials: any) => {
    try {
      const response = await axios.post('http://localhost:5000/login', credentials, {
        withCredentials: true,
      });
      const { token, user } = response.data.data;

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      // Save user data and token to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logOut = () => {
    axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(() => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        // Remove user data from localStorage on logout
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, token, logIn, logOut, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn('useAuth called outside of AuthProvider');
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      logIn: async () => {},
      logOut: () => {},
      setUser: () => {},
    };
  }
  return context;
};
