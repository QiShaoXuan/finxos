export const setSelection = (editor, containerRef, selection) => {
  return new Promise(resolve => {
    if (!selection) {
      return console.error('no selection');
    }
    setTimeout(() => {
      if (!containerRef.current) {
        return console.error('no container ref');
      }
      if (!editor.selection) {
        containerRef.current.querySelector('[contenteditable=true]').focus();
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
