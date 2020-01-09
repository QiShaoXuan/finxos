import React from 'react'

export default {
  name: 'code',
  title: '代码块',
  render: props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  },
  transform: props => {
    return 'code'
  },
}
