import { Transforms,Editor } from 'slate'

export default (editor, type, children) => {
  Transforms.setNodes(editor, { type }, { match: n => Editor.isBlock(editor, n) })
}
