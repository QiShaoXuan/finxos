import React from 'react';
import Icon from './bold.svg';

import __ from '@finxos/i18n';
import { FormatRenderProps } from '../interface';

export default {
  name: 'bold',
  title: __('Bold'),
  icon: Icon,
  render: (props: FormatRenderProps) => {
    return <strong {...props.attributes}>{props.children}</strong>;
  },
  shortcut: ['ctrl', 'b'],
  paste: (el: HTMLElement) => {
    const { nodeName, style } = el;
    return nodeName === 'B' || nodeName === 'STRONG' || style.fontWeight === 'bold';
  },
};
