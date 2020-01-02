import React from 'react'

export default {
  name: 'bold',
  title: '粗体',
  render: props => {
    return <code {...props.attributes}>{props.children}</code>
  },
  shortcut: event => {
    return event.ctrlKey && event.key === '`'
  },
}
