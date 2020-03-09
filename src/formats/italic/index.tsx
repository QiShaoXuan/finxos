import React from 'react';
import Icon from './italic.svg';
import __ from '@finxos/i18n';
import { FormatSetting } from '../interface';

export default {
  name: 'italic',
  title: __('Italic'),
  icon: Icon,
  render: props => {
    return <i {...props.attributes}>{props.children}</i>;
  },
  paste: (el: HTMLElement) => {
    const { nodeName, style } = el;
    return nodeName === 'I' || nodeName === 'EM' || style.fontStyle === 'italic';
  },
} as FormatSetting;
