import { Element } from 'slate';
import { ReactEditor } from 'slate-react';

export const isHighestBlock = (editor: any, block: Element) => {
  const path = ReactEditor.findPath(editor, block);
  return path.length === 1;
};
