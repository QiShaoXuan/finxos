import { Editor } from 'slate';

export default (editor: Editor, settings: { [key: string]: any }) => {
  editor.settings = settings;

  return editor;
};
