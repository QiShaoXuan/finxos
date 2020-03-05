import React from 'react';
import Icon from './code.svg';
import __ from '@finxos/i18n';
import { FormatRenderProps } from '../interface';

import './style.scss';
export default {
  name: 'code',
  title: __('Code'),
  icon: Icon,
  render: (props: FormatRenderProps) => {
    return (
      <code className="finxos-line-code" {...props.attributes}>
        {props.children}
      </code>
    );
  },
  shortcut: ['ctrl', '`'],
  paste: (el: HTMLElement) => {
    const { nodeName } = el;
    return nodeName === 'CODE' && el.parentNode && el.parentNode.nodeName !== 'PRE';
  },
};
