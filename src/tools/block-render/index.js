import React, { useContext } from 'react'

import { useSelected, useFocused } from 'slate-react'
import { ConfigContext } from '../../store/index'

export default props => {
  const { RenderSetting } = props
  const focused = useFocused()
  const selected = useSelected()
  console.log('focused',focused)
  
  
console.log('selected',selected)

  const { configDispatch } = useContext(ConfigContext)

  // configDispatch({
  //   type: focused && selected ? 'addSelectedBlock' : 'removeSelectedBlock',
  //   data: RenderSetting.name,
  // })

  return (
    <>
      <RenderSetting.render {...props} />
    </>
  )
}
