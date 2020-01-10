import { Editor } from 'slate';
import isActiveFormat from './is-format-active';

export const applyFormat = (editor, formatSetting) => {
  Editor.addMark(editor, formatSetting.name, formatSetting);
};

export const removeFormat = (editor, formatSetting) => {
  Editor.removeMark(editor, formatSetting.name, formatSetting);
};

export const toggleFormat = (editor, formatSetting) => {
  return isActiveFormat(editor, formatSetting.name)
    ? removeFormat(editor, formatSetting)
    : applyFormat(editor, formatSetting);
};
