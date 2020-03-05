import { Editor } from 'slate';
import { deepClone } from '@finxos/tools';

export const getCurrentFormats = (editor: Editor) => {
  return Editor.marks(editor) || {};
};

export const isFormatActive = (editor: Editor, formatName: string) => {
  return Boolean(getCurrentFormats(editor)[formatName]);
};

export const applyFormat = (editor: Editor, name: string, attributes: {} | boolean) => {
  Editor.addMark(editor, name, typeof attributes === 'object' ? deepClone(attributes) : true);
};

export const removeFormat = (editor: Editor, formatName: string) => {
  Editor.removeMark(editor, formatName);
};

export const updateFormat = (editor: Editor, name: string, properties: {}, newProperties: {}) => {
  const { selection } = editor;
  if (!selection) {
    return;
  }

  editor.apply({
    type: 'set_node',
    path: selection.anchor.path,
    properties,
    newProperties: {
      [name]: Object.assign({}, properties, newProperties),
    },
  });
};

export const toggleFormat = (editor: any, formatSetting: { name: string; attributes: {} }) => {
  return isFormatActive(editor, formatSetting.name)
    ? removeFormat(editor, formatSetting.name)
    : applyFormat(editor, formatSetting.name, formatSetting.attributes);
};
