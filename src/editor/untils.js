import React, { useCallback } from 'react'
import { Editor } from 'slate'

import BlockRender from '../tools/block-render'

export const renderElement = (props, BlockSettings) => {
  const {
    element: { type },
  } = props

  const RenderSetting =
    BlockSettings.find(v => {
      return v.name === type
    }) || BlockSettings.find(v => v.name === 'paragraph')

  return <BlockRender {...props} RenderSetting={RenderSetting} />
}

export const renderLeaf = (props, FormatSettings) => {
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
}

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
