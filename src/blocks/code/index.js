import React from 'react'

export default {
  name: 'code',
  render: props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  },
  shortcut: event => {
    return event.ctrlKey && event.key === '`'
  },
  transform: props => {
    return 'code'
  },
}
