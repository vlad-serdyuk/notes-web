import React, { FC, createContext, useCallback, useState } from 'react';
import { Themes } from '../constants/global';

interface IContextState {
  theme: Themes;
  switchTheme: () => void;
}

const contextState: IContextState = {
  theme: Themes.light,
  switchTheme: () => null,
};

const GlobalContext = createContext(contextState);

const GlobalContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(Themes.light);

  const switchTheme = useCallback(() => {
    setTheme(theme === Themes.light ? Themes.dark : Themes.light);
  }, [theme, setTheme])

  return (
    <GlobalContext.Provider value={{ theme, switchTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };