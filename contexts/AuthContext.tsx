
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (username: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, use a secure password hashing library like bcrypt.js
// For simulation, we'll store passwords plaintext in localStorage (VERY INSECURE)
const FAKE_USERS_DB_KEY = 'floraModernUsers';
const CURRENT_USER_KEY = 'floraModernCurrentUser';

const getStoredUsers = (): User[] => {
  const usersJson = localStorage.getItem(FAKE_USERS_DB_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

const getStoredCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredCurrentUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = getStoredUsers();
    // In real app, server would validate password hash
    const foundUser = users.find(user => user.email === email && (localStorage.getItem(`pass_${user.id}`) === pass));
    
    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const register = async (username: string, email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    let users = getStoredUsers();
    if (users.some(user => user.email === email)) {
      setLoading(false);
      alert('User with this email already exists.');
      return false; 
    }

    const newUser: User = { id: Date.now().toString(), username, email };
    users.push(newUser);
    localStorage.setItem(FAKE_USERS_DB_KEY, JSON.stringify(users));
    // VERY INSECURE: Storing password directly. For demo only.
    localStorage.setItem(`pass_${newUser.id}`, pass); 
    
    // Auto-login after registration
    setCurrentUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
