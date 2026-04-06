import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/services/apiClient';
import { emailService } from '@/services/emailService';

export type UserRole = 'admin' | 'prestataire' | 'client';

export interface AuthUser {
  id: string;
  email: string;
  role?: UserRole;
  full_name?: string;
  organization?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, role: UserRole, fullName: string, organization?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session on app start
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await apiClient.getCurrentUser();
          setUser(response.user);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string, role: UserRole, fullName: string, organization?: string) => {
    try {
      const response = await apiClient.register({
        email,
        password,
        fullName,
        role,
        organization,
      });

      // Store token
      localStorage.setItem('auth_token', response.token);

      // Send notification email to admin
      await emailService.notifyAdminNewRegistration(
        email,
        fullName,
        role,
        organization
      );

      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password });

      // Store token
      localStorage.setItem('auth_token', response.token);

      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await apiClient.logout();
      localStorage.removeItem('auth_token');
      setUser(null);
    } catch (error) {
      // Even if logout fails, clear local state
      localStorage.removeItem('auth_token');
      setUser(null);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
