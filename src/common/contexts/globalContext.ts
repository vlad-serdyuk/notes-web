import { createContext } from 'react';
import { Themes } from '../constants/global';

const GlobalContext = createContext({
  theme: Themes.light,
});

export { GlobalContext };