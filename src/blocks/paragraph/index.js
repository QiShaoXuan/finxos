import React from 'react';
import { useSelected } from 'slate-react';
import __ from '@finxos/i18n';

export default {
  name: 'paragraph',
  title: __('Paragraph'),
  render: props => {
    return <p {...props.attributes}>{props.children}</p>;
  },
  transform: props => {
    return 'default';
  },
};
