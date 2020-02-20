import { Editor } from 'slate';
import isActiveFormat from '../is-format-active';
import { deepClone } from '@finxos/tools';

export const applyFormat = (editor, name, attributes) => {
  Editor.addMark(editor, name, typeof attributes === 'object' ? deepClone(attributes) : true);
};

export const removeFormat = (editor, formatName) => {
  Editor.removeMark(editor, formatName);
};

export const updateFormat = (editor, name, properties, newProperties) => {
  const {
    selection: {
      anchor: { path },
    },
  } = editor;
  editor.apply({
    type: 'set_node',
    path: path,
    properties,
    newProperties: {
      [name]: Object.assign({}, properties, newProperties),
    },
  });
};

export const toggleFormat = (editor, formatSetting) => {
  return isActiveFormat(editor, formatSetting.name)
    ? removeFormat(editor, formatSetting.name)
    : applyFormat(editor, formatSetting.name, formatSetting.attributes);
};
