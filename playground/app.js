import React from 'react'
import ReactDom from 'react-dom'
import Finxos from '../src/index'
import './assets/styles/reset.scss'

class App extends React.Component {
  render() {
    return (
      <>
        <Finxos />
      </>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
