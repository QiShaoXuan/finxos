import React, { useReducer } from 'react'
import SelectedBlocksProvider from './hooks/use-active-blocks'
import { FinxosSlate, FinxosEditable } from './editor'
import Header from './components/header'
import BlockMenu from './components/block-menu'
import ToolBar from './components/toolbar'

import 'antd/dist/antd.css'
import './style.scss'
import BlockSettings from './blocks'
import FormatSettings from './formats';


export default props => {
  return (
    <SelectedBlocksProvider>
      <div className="finxos-container">
        <div className="finxos-wrapper">
          <FinxosSlate content={props.content}>
            <Header>
              <BlockMenu BlockSettings={BlockSettings} />
            </Header>
            <ToolBar/>
            <FinxosEditable blocks={BlockSettings} formats={FormatSettings}/>
          </FinxosSlate>
        </div>
      </div>
    </SelectedBlocksProvider>
  )
}
