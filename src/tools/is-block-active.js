import { Editor } from 'slate';

export default (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
    mode: 'all',
  });

  return !!match;
};
