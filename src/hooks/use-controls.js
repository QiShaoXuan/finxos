import React, { createContext, useContext } from 'react';

export const ControlsContext = createContext({});

export const useControlsContext = () => {
  return useContext(ControlsContext);
};

export default props => {
  return <ControlsContext.Provider value={props.value}>{props.children}</ControlsContext.Provider>;
};
