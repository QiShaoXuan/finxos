import React, { useContext, useEffect } from 'react'
import { useSelectedBlocks } from '../hooks/use-active-blocks'
import { useSelected, useFocused, useSlate } from 'slate-react'

export default props => {
  const { RenderSetting, attributes } = props

  const { updateSelectedBlocks } = useSelectedBlocks()

  const focused = useFocused()
  const selected = useSelected()

  updateSelectedBlocks({
    action: focused && selected ? 'add' : "remove",
    data: {
      attributes,
      RenderSetting,
    },
  })

  return (
    <>
      <RenderSetting.render {...props} />
    </>
  )
}
