import React, { createContext, useContext } from 'react';

export const BlockSettingsContext = createContext([]);

export const useBlockSettingsContext = () => {
  return useContext(BlockSettingsContext);
};

export default props => {
  const { blockSettings } = props;
  return <BlockSettingsContext.Provider value={blockSettings}>{props.children}</BlockSettingsContext.Provider>;
};
