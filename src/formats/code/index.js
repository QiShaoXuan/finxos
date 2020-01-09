import React from 'react';
import Icon from './code.svg';
import __ from '@Finxos/i18n';

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
};
