import React from 'react'

export default {
  name: '',
  render: props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  },
  hotKey: '',
  transform: props => {
    return 'code'
  },
}
