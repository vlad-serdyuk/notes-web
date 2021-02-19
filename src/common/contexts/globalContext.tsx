import React, { FC, createContext, useCallback, useEffect, useState } from 'react';
import { Themes, THEME_STORAGE_KEY } from 'app/constants/global';
import { getItem, setItem, setStorage } from '../services/ClientStorage';

interface IContextState {
  theme: Themes;
  switchTheme: () => void;
}

const contextState: IContextState = {
  theme: Themes.light,
  switchTheme: () => null,
};

setStorage(localStorage);

const GlobalContext = createContext(contextState);

const GlobalContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(Themes.light);

  useEffect(() => {
    (async () => {
      const savedTheme = await getItem(THEME_STORAGE_KEY);
      setTheme(savedTheme as Themes);
    })();
  }, []);

  const switchTheme = useCallback(() => {
    const selectedTheme = (theme === Themes.light) ? Themes.dark : Themes.light;
    setTheme(selectedTheme);
    setItem(THEME_STORAGE_KEY, selectedTheme);
  }, [theme, setTheme]);

  return (
    <GlobalContext.Provider value={{ theme, switchTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };