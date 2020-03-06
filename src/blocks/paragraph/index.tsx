import React from 'react';
import __ from '@finxos/i18n';
import operation from './operation';
import { BlockSetting } from '@finxos/blocks';
import Icon from './icons/paragraph.svg';

import './style.scss';
export default {
  name: 'paragraph',
  title: __('Paragraph'),
  icon: Icon,
  data: {
    align: 'left',
  },
  transform: {
    target: ['heading', 'list'],
  },
  operation,
  render: props => {
    const { data } = props;
    return (
      <p {...props.attributes} className={`finxos-paragraph finxos-paragraph--${data.align}`}>
        {props.children}
      </p>
    );
  },
  paste: el => el.nodeName === 'P',
} as BlockSetting;
