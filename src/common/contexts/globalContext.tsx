import React, { FC, createContext, useState } from 'react';
import { Themes } from '../constants/global';

const GlobalContext = createContext({});

const initialState = {
  theme: Themes.light,
};

const GlobalContextProvider: FC = ({ children }) => {

  return (
    <GlobalContext.Provider value={initialState}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };