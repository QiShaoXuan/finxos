import React, { useMemo, useState, useCallback } from 'react'
import { createEditor, Transforms, Editor, Text, Node, Range } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

import { renderElement, renderLeaf, isActiveBlock, isActiveFormat,getCurrentCaretPositionStyle } from './untils'

import BlockSettings from '../blocks'
import FormatSettings from '../formats'

import ToolBar from '../components/toolbar'
import './style.scss'

const defaultInitParams = {
  content: [],
}

export default initParams => {
  const params = Object.assign(defaultInitParams, initParams)

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState(params.content)

  const [toolBarVisible, setToolBarVisible] = useState(false)
  const [toolBarPosition, settoolBarPosition] = useState(null)

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => {
        setValue(value)

        const { selection } = editor
        if (selection) {
          setToolBarVisible(!Range.isCollapsed(selection))
          if (!Range.isCollapsed(selection)) {
            settoolBarPosition(getCurrentCaretPositionStyle())
          }
        }
      }}
    >
      <ToolBar visible={toolBarVisible} position={toolBarPosition}></ToolBar>
      <Editable
        editor={editor}
        renderElement={useCallback(renderElement, [])}
        renderLeaf={useCallback(renderLeaf, [])}
        onKeyDown={event => {
          const renderBlock = BlockSettings.find(v => v.shortcut && v.shortcut(event))
          const renderFormat = FormatSettings.find(v => v.shortcut && v.shortcut(event))
          if (renderBlock && renderFormat) {
            console.error(
              `Shortcut is same in block setting "${renderBlock.name}" and format setting "${renderFormat.name}"`
            )
            return
          }

          // if (renderBlock) {
          //   event.preventDefault()
          //   const isActive = isActiveBlock(editor, renderBlock.name)
          //   Transforms.setNodes(
          //     editor,
          //     { type: isActive ? null : renderBlock.name },
          //     {
          //       match: n => Editor.isBlock(editor, n),
          //     }
          //   )
          // }

          if (renderFormat) {
            event.preventDefault()
            const isActive = isActiveFormat(editor, renderFormat.name)
            Transforms.setNodes(
              editor,
              { [renderFormat.name]: isActive ? null : true },
              { match: n => Text.isText(n), split: true }
            )
          }
        }}
      />
    </Slate>
  )
}
