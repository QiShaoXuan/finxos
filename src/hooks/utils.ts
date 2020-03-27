import { Editor, Element, Text, NodeEntry } from 'slate';
import { BlockSetting } from '@finxos/blocks';

export const getSelected = (editor: Editor) => {
  const {
    settings: { blocks },
  } = editor;

  let selectedNodes: NodeEntry[] = [];
  let selectedBlocks: NodeEntry[] = [];
  let selectedTexts: NodeEntry[] = [];
  let selectedBlockSettings: BlockSetting[] = [];
  if (editor.selection === null) {
    return {
      selectedNodes,
      selectedBlocks,
      selectedTexts,
      selectedBlockSettings,
    };
  }

  selectedNodes = [...Editor.nodes(editor, { at: editor.selection })].slice(1);

  selectedNodes.forEach(v => {
    if (Element.isElement(v[0])) {
      const setting = blocks.find((b: BlockSetting) => b.name === v[0].type);
      if (setting.isInline !== true) {
        selectedBlocks.push(v);
      }
      if (!selectedBlockSettings.some(s => s.name === setting.name)) {
        selectedBlockSettings.push(setting);
      }
    }
    if (Text.isText(v[0])) {
      selectedTexts.push(v);
    }
  });

  return {
    selectedNodes,
    selectedBlocks,
    selectedTexts,
    selectedBlockSettings,
  };
};
