import React from 'react';
import Icon from './bold.svg';
import __ from '@finxos/i18n';

export default {
  name: 'bold',
  title: __('Bold'),
  icon: Icon,
  render: props => {
    return <strong {...props.attributes}>{props.children}</strong>;
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'b';
  },
  paste: el => {
    const { nodeName, style } = el;
    return nodeName === 'B' || nodeName === 'STRONG' || style.fontWeight === 'bold';
  },
};
