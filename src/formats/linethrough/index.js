import React from 'react';
import Icon from './throughline.svg';
import __ from '@finxos/i18n';
import './style.scss';
export default {
  name: 'linethrough',
  title: __('Linethrough'),
  icon: Icon,
  render: props => {
    return (
      <del className="finxos-linethrough" {...props.attributes}>
        {props.children}
      </del>
    );
  },
  // shortcut: event => {
  //   return event.ctrlKey && event.key === '';
  // },
};
