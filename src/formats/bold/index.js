import React from 'react'

export default {
  name: 'bold',
  render: props => {
    return <strong {...props.attributes}>{props.children}</strong>
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'b'
  },
}
