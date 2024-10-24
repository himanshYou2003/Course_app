import React, { createContext, useState } from "react";

export const Context = createContext({
  // isUser: false,
  // isAdmin: false,
  isLoggedIn: false,
  changeLoggedIn: () => {},
  // toggleUser: () => {}
});

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeLoggedIn = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Context.Provider value={{ isLoggedIn, changeLoggedIn }}>
      {children}
    </Context.Provider>
  );
};
