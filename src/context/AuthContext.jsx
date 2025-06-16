import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/axiosConfig';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      console.log('Fetched user data:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
        
          const payload = token.split('.')[1];
          const decoded = JSON.parse(atob(payload));
          console.log('Decoded token payload:', decoded); 
          
         
          const userData = await fetchUserData(decoded.id);
          if (userData) {
            console.log('Setting user data from database:', userData);
            setUser(userData);
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (token) => {
    try {
      localStorage.setItem('token', token);
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      console.log('Login decoded token:', decoded); // Debug log
      
      // Fetch complete user data from database
      const userData = await fetchUserData(decoded.id);
      if (userData) {
        console.log('Setting user data on login:', userData); // Debug log
        setUser(userData);
        navigate('/');
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error in login:', error);
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 