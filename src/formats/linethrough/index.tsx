import React from 'react';
import Icon from './throughline.svg';
import __ from '@finxos/i18n';
import { FormatSetting } from '../interface';

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
  paste: (el: HTMLElement) => {
    const { nodeName, style } = el;
    return nodeName === 'DEL' || nodeName === 'S' || style.textDecoration === 'line-through';
  },
  // shortcut: event => {
  //   return event.ctrlKey && event.key === '';
  // },
} as FormatSetting;
