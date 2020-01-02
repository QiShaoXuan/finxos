import React, { useMemo, useState, useCallback } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Transforms, Editor, Text, Node } from 'slate'
import { withHistory } from 'slate-history'

import { isActiveBlock, isActiveFormat } from './untils'
import BlockSettings from '../blocks'
import FormatSettings from '../formats'

import './style.scss'

const defaultInitParams = {
  content: [],
}

export default initParams => {
  const params = Object.assign(defaultInitParams, initParams)

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState(params.content)

  const renderElement = useCallback(props => {
    const {
      element: { type },
    } = props

    const RenderSetting =
      BlockSettings.find(v => {
        return v.name === type
      }) || BlockSettings.find(v => v.name === 'paragraph')

    return <RenderSetting.render {...props} />
  }, [])

  const renderLeaf = useCallback(props => {
    const RenderFormats = FormatSettings.filter(v => props.leaf[v.name])

    return (
      <span {...props.attributes}>
        {RenderFormats.reduce(
          (children, Format) => (
            <Format.render {...props.attributes}>{children}</Format.render>
          ),
          props.children
        )}
      </span>
    )
  }, [])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        editor={editor}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          const renderBlock = BlockSettings.find(v => v.shortcut && v.shortcut(event))
          const renderFormat = FormatSettings.find(v => v.shortcut && v.shortcut(event))
          if (renderBlock && renderFormat) {
            console.error(
              `Shortcut is same in block setting "${renderBlock.name}" and format setting "${renderFormat.name}"`
            )
            return
          }

          if (renderBlock) {
            event.preventDefault()
            const isActive = isActiveBlock(editor, renderBlock.name)
            Transforms.setNodes(
              editor,
              { type: isActive ? null : renderBlock.name },
              {
                match: n => Editor.isBlock(editor, n),
              }
            )
          }

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
