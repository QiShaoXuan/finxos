import React, { createContext, useCallback, useContext, useMemo, memo, useState } from 'react';
import { useSlate } from 'slate-react';
import { getCurrentBlocks, getCurrentFormats } from '@finxos/tools';
export const ControlsContext = createContext();

export const useControls = () => {
  return useContext(ControlsContext);
};

export default props => {
  const editor = useSlate();
  const { container, lastSelection } = props;

  return (
    <ControlsContext.Provider
      value={{
        containerDom: container.current,
        editorDom: container.current ? container.current.querySelector('[contenteditable=true]') : container.current,
        lastSelection,
        selectedBlocks: getCurrentBlocks(editor),
        currentFormats: getCurrentFormats(editor),
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
};
