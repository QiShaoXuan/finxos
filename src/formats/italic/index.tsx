import React from 'react';
import Icon from './italic.svg';
import __ from '@finxos/i18n';
import { FormatRenderProps } from '../interface';


export default {
  name: 'italic',
  title: __('Italic'),
  icon: Icon,
  render: (props: FormatRenderProps) => {
    return <i {...props.attributes}>{props.children}</i>;
  },
  paste: (el: HTMLElement) => {
    const { nodeName, style } = el;
    return nodeName === 'I' || nodeName === 'EM' || style.fontStyle === 'italic';
  },
};
