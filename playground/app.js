import React from 'react'
import ReactDom from 'react-dom'
import Finxos from '../src'
import './assets/styles/reset.scss'

const content = [
  {
    type: 'paragraph',
    children: [
      // {
      //   type: 'code',
      //   children: [{
      //     type: 'paragraph',
      //     children: [{ text: 'inner paragraph' }],
      //   }],
      // },
      { text: 'A line of text in a paragraph.' },
    ],
  },
  {
    type: 'code',
    children: [{ text: 'outer code' }],
  },
]
class App extends React.Component {
  render() {
    return (
      <>
        <Finxos content={content} />
      </>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
