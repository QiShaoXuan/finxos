export default (editor, blocks) => {
  const { isVoid } = editor;
  editor.isVoid = element => {
    const block = blocks.find(v => v.name === element.type);
    return !!block.isVoid;
  };
  return editor;
};
