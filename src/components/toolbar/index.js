import React, { useEffect } from 'react'

import './style.scss'
export default props => {
  const { visible ,position} = props

  return visible ? <div className="finxos-toolbar" style={{...position}}>
    <div className="toolbar-wrapper"></div>
  </div> : null
}
