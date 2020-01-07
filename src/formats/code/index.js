import React from 'react'

export default {
  name: 'code',
  title: '代码段',
  icon: () => <img src={require('./code.svg')} alt="" />,
  render: props => {
    return <code {...props.attributes}>{props.children}</code>
  },
  shortcut: event => {
    return event.ctrlKey && event.key === '`'
  },
}
<Icon type="" />
