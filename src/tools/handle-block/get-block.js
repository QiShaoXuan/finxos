import { Node } from 'slate';

export default (editor, path) => {
  return Node.get(editor, path);
};
