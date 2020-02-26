export default (editor, blocks, formats) => {
  editor.setting = {
    blocks,
    formats,
  };

  return editor;
};
