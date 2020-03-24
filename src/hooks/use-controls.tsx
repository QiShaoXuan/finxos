import React, { createContext, useContext, ReactNode } from 'react';
import { Node, Range } from 'slate';
import { useSlate } from 'slate-react';
import { getCurrentBlocks, getCurrentFormats } from '@finxos/tools';

export const ControlsContext = createContext({
  currentFormats: {},
  showBlockList: false,
  showToolBar: false,
  showEditBar: false,
} as {
  selectedBlocks: Node[];
  currentFormats: { [key: string]: any };
  showBlockList: boolean;
  showToolBar: boolean;
  showEditBar: boolean;
});

export const useControls = () => {
  return useContext(ControlsContext);
};

export const ControlsProvider = (props: { container: any; lastSelection: any; children: ReactNode }) => {
  const editor = useSlate();
  const showToolBar = Boolean(editor.selection && !Range.isCollapsed(editor.selection));
  // showBlockList, , showEditBar

  return (
    <ControlsContext.Provider
      value={{
        selectedBlocks: [],
        currentFormats: getCurrentFormats(editor),
        showBlockList: false,
        showToolBar,
        showEditBar: false,
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
};
