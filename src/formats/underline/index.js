import React from 'react';
import Icon from './underline.svg';
import __ from '@finxos/i18n';
import './style.scss';
export default {
  name: 'underline',
  title: __('Underline'),
  icon: Icon,
  render: props => {
    return (
      <span className="finxos-underline" {...props.attributes}>
        {props.children}
      </span>
    );
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'u';
  },
};
