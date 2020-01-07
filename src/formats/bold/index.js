import React from 'react'

export default {
  name: 'bold',
  title: '加粗',
  icon: () => <img src={require('./bold.svg')} alt="" />,
  render: props => {
    return <strong {...props.attributes}>{props.children}</strong>
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'b'
  },
}
