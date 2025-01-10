import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode

// Create the UserContext
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
          const token = localStorage.getItem("user");
          if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
          } else {
            console.warn("No token found in localStorage");
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          setUser(null);
        }
      }, []);
    
      const login = (token) => {
        localStorage.setItem("user", token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      };
    
      const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
      };

    return (
        <UserContext.Provider value={{ user,login,logout }}>
            {children}
        </UserContext.Provider>
    );
};
