import React from 'react'

export default {
  name: 'default',
  render: props => <p {...props.attributes}>{props.children}</p>,
  hotKey: '',
  transform: props => {
    return 'default'
  },
}
