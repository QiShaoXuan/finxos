export default (editor, blocks) => {
  const { isVoid } = editor;
  editor.isVoid = element => {
    if (element.type) {
      const block = blocks.find(v => v.name === element.type);
      return !!block.isVoid;
    }
    return false;
  };
  return editor;
};
