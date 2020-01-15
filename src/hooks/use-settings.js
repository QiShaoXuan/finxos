import React, { createContext, useContext } from 'react';

export const SettingsContext = createContext({});

export const useSettings = () => {
  return useContext(SettingsContext);
};

export default props => {
  return <SettingsContext.Provider value={props.settings}>{props.children}</SettingsContext.Provider>;
};
