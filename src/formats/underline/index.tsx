import React, { ReactNode } from 'react';
import Icon from './underline.svg';
import __ from '@finxos/i18n';
import { FormatRenderProps } from '../interface';

import './style.scss';
export default {
  name: 'underline',
  title: __('Underline'),
  icon: Icon,
  render: (props: FormatRenderProps) => {
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
} as {
  name: string;
  title: string;
  icon(): ReactNode;
  render(): ReactNode;
  shortcut?: string[];
  paste(el: HTMLElement): boolean | {};
  toolbar?: boolean;
  acrossBlock?: boolean;
  attributes?: { [key: string]: any };
};
