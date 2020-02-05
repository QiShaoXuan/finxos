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
  paste: el => {
    const { nodeName, style } = el;
    return nodeName === 'I' || nodeName === 'EM' || style.textDecoration === 'line-through';
  },
  // shortcut: event => {
  //   return event.ctrlKey && event.key === 'b';
  // },
};
