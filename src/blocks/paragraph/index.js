import React from 'react'
import { useSelected } from 'slate-react'

export default {
  name: 'paragraph',
  render: props => {
    const selected = useSelected()
    return <p {...props.attributes}>{props.children}</p>
  },
  hotKey: '',
  transform: props => {
    return 'default'
  },
}
