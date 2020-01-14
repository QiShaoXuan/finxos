import React, { createContext, useCallback, useContext, useMemo, memo } from 'react';
import { useSlate } from 'slate-react';

export const ControlsContext = createContext();

export const useControlsContext = () => {
  return useContext(ControlsContext);
};

export default props => {
  const { container, lastSelection } = props;

  return (
    <ControlsContext.Provider
      value={{
        containerDom: container.current,
        editorDom: container.current ? container.current.querySelector('[contenteditable=true]') : container.current,
        lastSelection,
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
};
