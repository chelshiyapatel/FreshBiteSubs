import React, { createContext, useState, useEffect  } from 'react'; //4

// Here I create the context for authentication
const AuthContext = createContext();

// This AuthProvider component is wrap the part of the app that needs to the authentication state
const AuthProvider = ({ children }) => {
  // Here I create the state t hold the current user, as of now I set it to the null
  const [user, setUser] = useState(() => {
    // Load user from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //4
  useEffect(() => {
    // This below statement save user to localStorage when it changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    // Here I provide the user and setUser to the rest of the app
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };