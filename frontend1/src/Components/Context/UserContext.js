import React, { createContext, useState, useContext, useEffect } from "react";

// Create UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Load user data from localStorage on initialization
  const initialUser = JSON.parse(localStorage.getItem("user")) || {
    name: "",
    role: "",
    roomId: null,
  };

  const [user, setUser] = useState(initialUser);

  // Sync user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
