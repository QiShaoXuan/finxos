import React from 'react'

export default {
  name: 'paragraph',
  render: props => <p {...props.attributes}>{props.children}</p>,
  hotKey: '',
  transform: props => {
    return 'default'
  },
}
