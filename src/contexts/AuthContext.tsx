
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define user role types
export type UserRole = 'admin' | 'vendor' | 'delivery';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=1E40AF&color=fff',
  },
  {
    id: '2',
    name: 'Vendor User',
    email: 'vendor@example.com',
    password: 'vendor123',
    role: 'vendor' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Vendor+User&background=10B981&color=fff',
  },
  {
    id: '3',
    name: 'Delivery User',
    email: 'delivery@example.com',
    password: 'delivery123',
    role: 'delivery' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Delivery+User&background=F59E0B&color=fff',
  },
];

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('groceryDashboardUser');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('groceryDashboardUser');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      // Create a safe user object (no password)
      const safeUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar,
      };

      // Store in localStorage
      localStorage.setItem('groceryDashboardUser', JSON.stringify(safeUser));
      setUser(safeUser);
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${safeUser.name}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }

    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('groceryDashboardUser');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for easy context use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
