import React, { createContext, useContext } from 'react';

export const FormatSettingsContext = createContext([]);

export const useFormatSettingsContext = () => {
  return useContext(FormatSettingsContext);
};

export default props => {
  const { formatSettings } = props;
  return <FormatSettingsContext.Provider value={formatSettings}>{props.children}</FormatSettingsContext.Provider>;
};
