import React from 'react';
import Icon from './italic.svg';
import __ from '@finxos/i18n';
export default {
  name: 'italic',
  title: __('Italic'),
  icon: Icon,
  render: props => {
    return <i {...props.attributes}>{props.children}</i>;
  },
  // shortcut: event => {
  //   return event.ctrlKey && event.key === 'b';
  // },
};
