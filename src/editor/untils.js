import { Editor } from 'slate'

export const isActiveBlock = (editor, blockName) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === blockName,
  })
  return !!match
}
export const isActiveFormat = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
  })
  return !!match
}
