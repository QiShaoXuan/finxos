import React, { useReducer } from 'react'
import { ConfigContext, ConfigReducer } from './store'
import Editor from './editor'
import Header from './components/header'
import { Button } from './components/button'

import 'antd/dist/antd.css'
import './style.scss'

const initialConfig = {
  selectedBlocks: [],
}

export default props => {
  const [config, configDispatch] = useReducer(ConfigReducer, initialConfig)

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        configDispatch,
      }}
    >
      <div className="finxos-container">
        <Header>
          <Button type="primary">Primary</Button>
          <div>
            {config.selectedBlocks.map(v => (
              <span key={v}>{v}</span>
            ))}
          </div>
        </Header>
        <div className="finxos-wrapper">
          <Editor {...props} />
        </div>
      </div>
    </ConfigContext.Provider>
  )
}
