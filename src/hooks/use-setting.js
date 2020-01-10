import React, { createContext, useContext } from 'react';

export const SettingContext = createContext({});

export const useSettingContext = () => {
  return useContext(SettingContext);
};

export default props => {
  const { setting } = props;
  return <SettingContext.Provider value={setting}>{props.children}</SettingContext.Provider>;
};
