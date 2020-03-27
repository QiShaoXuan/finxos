import React, { createContext, useContext, ReactNode } from 'react';
import { Range, NodeEntry } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import { getCurrentFormats } from '@finxos/tools';
import { getSelected } from '@finxos/hooks/utils';
import { BlockSetting } from '@finxos/blocks';

export const ControlsContext = createContext({
  selectedNodes: [],
  selectedBlocks: [],
  selectedTexts: [],
  selectedBlockSettings: [],
  currentFormats: {},
  showBlockList: false,
  showToolBar: false,
  showEditBar: false,
} as {
  selectedNodes: NodeEntry[];
  selectedBlocks: NodeEntry[];
  selectedTexts: NodeEntry[];
  selectedBlockSettings: BlockSetting[];
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

  const { selectedNodes, selectedBlocks, selectedTexts, selectedBlockSettings } = getSelected(editor);

  return (
    <ControlsContext.Provider
      value={{
        selectedNodes,
        selectedBlocks,
        selectedTexts,
        selectedBlockSettings,
        currentFormats: getCurrentFormats(editor),
        showBlockList: false,
        showToolBar: Boolean(editor.selection && !Range.isCollapsed(editor.selection)),
        showEditBar: false,
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
};
