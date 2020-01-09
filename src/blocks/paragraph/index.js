import React from 'react';
import { useSelected } from 'slate-react';

export default {
  name: 'paragraph',
  title: '段落',
  placeholder: 'This is paragraph',
  render: props => {
    const selected = useSelected();
    return <p {...props.attributes}>{props.children}</p>;
  },
  transform: props => {
    return 'default';
  },
};
