export default (editor, editorDom, selection) => {
  return new Promise(resolve => {
    if (!selection) {
      throw Error('no selection');
    }
    setTimeout(() => {
      if (!editorDom && !editor.selection) {
        throw Error('no editor dom to focus');
      }
      if (!editor.selection) {
        editorDom.focus();
      }
      editor.apply({
        type: 'set_selection',
        properties: editor.selection,
        newProperties: selection,
      });
      resolve();
    });
  });
};
