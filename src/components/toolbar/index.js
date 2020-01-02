import React from 'react'
import './style.scss'
export default props => {
  const { visible } = props
  return visible ? <div className="finxos-toolbar">111</div> : null
}
