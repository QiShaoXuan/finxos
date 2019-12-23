import React from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'

const App = () => {
  const editor = React.useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = React.useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable />
    </Slate>
  )
}

class Finxos extends React.Component {
  render() {
    return <App />
  }
}

export default Finxos
