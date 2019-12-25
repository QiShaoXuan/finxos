import React, { useMemo, useState } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])
  console.log('----------------------------')
  console.log('editor', editor)
  console.log('----------------------------')

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        onKeyDown={event => {
          if (event.key === '&') {
            // Prevent the ampersand character from being inserted.
            event.preventDefault()
            // Execute a command to insert text when the event occurs.
            editor.apply({ type: 'insert_text', text: 'and' })
          }
        }}
      />
    </Slate>
  )
}

class Finxos extends React.Component {
  render() {
    return <App />
  }
}

export default Finxos
