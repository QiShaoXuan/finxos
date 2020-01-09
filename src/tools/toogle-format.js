import { Text, Transforms } from 'slate';
import isActiveFormat from './is-format-active';

const defaultOptions = { match: n => Text.isText(n), split: true };

export const applyFormat = (editor, format, options) => {
  Transforms.setNodes(editor, { [format]: true }, Object.assign(defaultOptions, options));
};

export const removeFormat = (editor, format, options) => {
  Transforms.setNodes(editor, { [format]: null }, Object.assign(defaultOptions, options));
};

export default (editor, format, options) => {
  return isActiveFormat(editor, format) ? removeFormat(editor, format, options) : applyFormat(editor, format, options);
};
