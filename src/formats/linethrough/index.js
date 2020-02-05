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
  paste: el => {
    const { nodeName, style } = el;
    return nodeName === 'DEL' || nodeName === 'S' || style.fontStyle === 'italic';
  },
  // shortcut: event => {
  //   return event.ctrlKey && event.key === '';
  // },
};
