import React from 'react';
import { useSelected } from 'slate-react';
import __ from '@finxos/i18n';
import Icon from './paragraph.svg';
export default {
  name: 'paragraph',
  title: __('Paragraph'),
  icon: Icon,
  render: props => {
    return <p {...props.attributes}>{props.children}</p>;
  },
  save: props => {
    return 'default';
  },
};
