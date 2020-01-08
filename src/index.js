import React, { useReducer } from 'react'
import SelectedBlocksProvider from './hooks/use-active-blocks'
import Editor from './editor'
import Header from './components/header'
import BlockMenu from './components/block-menu'
import { Button } from './components/button'

import 'antd/dist/antd.css'
import './style.scss'

export default props => {
  return (
    <SelectedBlocksProvider>
      <div className="finxos-container">
        <div className="finxos-wrapper">
          <Editor {...props} />
        </div>
      </div>
    </SelectedBlocksProvider>
  )
}
