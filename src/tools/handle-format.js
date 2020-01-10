import { Text, Transforms } from 'slate';
import isActiveFormat from './is-format-active';

const defaultOptions = { match: n => Text.isText(n), split: true };

export const applyFormat = (editor, formatSetting, options) => {
  Transforms.setNodes(editor, { [formatSetting.name]: formatSetting }, Object.assign(defaultOptions, options));
};

export const removeFormat = (editor, formatSetting, options) => {
  Transforms.setNodes(editor, { [formatSetting.name]: null }, Object.assign(defaultOptions, options));
};

export const toggleFormat = (editor, formatSetting, options) => {
  return isActiveFormat(editor, formatSetting.name)
    ? removeFormat(editor, formatSetting, options)
    : applyFormat(editor, formatSetting, options);
};
