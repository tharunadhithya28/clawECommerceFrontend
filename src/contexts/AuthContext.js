import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("fetchUser");
        const response = await axios.get('https://clawecommerce.onrender.com//api/users/checkuser',
          {withCredentials: true}
        );
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.error( error);
      }
    };
    fetchUser();
  }, []);

  const login = async ( {email, password} ) => {
    const response = await axios.post('https://clawecommerce.onrender.com//api/users/login', { email, password });
    setUser(response.data);
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
