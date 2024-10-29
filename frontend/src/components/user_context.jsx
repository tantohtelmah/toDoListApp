import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {console.log(JSON.stringify(user))}
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };