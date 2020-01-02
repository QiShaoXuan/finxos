import React from 'react'
import Editor from './editor'
import Header from './components/header'

import './style.scss'

export default props => {
  return (
    <div className="finxos-container">
      <Header />
      <div className="finxos-wrapper">
        <Editor {...props} />
      </div>
    </div>
  )
}
