import React from 'react';
import Icon from './code.svg';
import __ from '@finxos/i18n';

import './style.scss';
export default {
  name: 'code',
  title: __('Code'),
  icon: Icon,
  render: props => {
    return (
      <code className="finxos-line-code" {...props.attributes}>
        {props.children}
      </code>
    );
  },
  shortcut: event => {
    return event.ctrlKey && event.key === '`';
  },
  paste: el => {
    const { nodeName } = el;
    return nodeName === 'CODE' && el.parentNode.nodeName !== 'PRE';
  },
};
