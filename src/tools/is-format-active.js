import getCurrentFormsts from './get-current-formats';
export default (editor, format) => {
  return !!getCurrentFormsts(editor)[format];
};
