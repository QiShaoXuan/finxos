import { Editor } from 'slate';

export default (editor, format, options = {}) => {
  const [match] = Editor.nodes(
    editor,
    Object.assign(
      {
        match: n => n[format] === true,
      },
      options
    )
  );
  return !!match;
};
