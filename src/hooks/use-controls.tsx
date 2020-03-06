import React, { createContext, useContext, ReactNode } from 'react';
import { Node } from 'slate';
import { useSlate } from 'slate-react';
import { getCurrentBlocks, getCurrentFormats } from '@finxos/tools';

export const ControlsContext = createContext({
  containerDom: null,
  editorDom: null,
  lastSelection: null,
  selectedBlocks: [],
  currentFormats: {},
} as {
  containerDom: null | HTMLElement;
  editorDom: null | HTMLElement;
  lastSelection: null | Range;
  selectedBlocks: Node[];
  currentFormats: { [key: string]: any };
});

export const useControls = () => {
  return useContext(ControlsContext);
};

export const ControlsProvider = (props: { container: any; lastSelection: any; children: ReactNode }) => {
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
