import React, { ReactNode } from 'react';
import Icon from './underline.svg';
import __ from '@finxos/i18n';
import { FormatSetting } from '@finxos/formats';

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
  shortcut: ['ctrl', 'u'],

  paste: (el: HTMLElement) => {
    const { nodeName, style } = el;
    return nodeName === 'U' || style.textDecoration === 'underline';
  },
} as FormatSetting;
