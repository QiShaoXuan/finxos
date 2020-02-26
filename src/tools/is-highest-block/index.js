import { ReactEditor } from 'slate-react';

export default (editor, block) => {
  const path = ReactEditor.findPath(editor, block);
  return path.length === 1;
};
