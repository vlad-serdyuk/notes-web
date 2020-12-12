import React, { FC, createContext, useState } from 'react';
import { Themes } from '../constants/global';

const contextState = {
  theme: Themes.light,
  swithTheme: () => {},
};

const GlobalContext = createContext(contextState);

const GlobalContextProvider: FC = ({ children }) => {
  return (
    <GlobalContext.Provider value={contextState}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };