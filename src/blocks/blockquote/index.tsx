import React from 'react';
import __ from '@finxos/i18n';
import { BlockSetting } from '@finxos/blocks';
import Icon from './blockquote.svg';

import './style.scss';

export default {
  name: 'blockquote',
  title: __('Blockquote'),
  icon: Icon,
  transform: {
    target: ['paragraph', 'heading', 'list'],
  },
  render: props => {
    return (
      <blockquote {...props.attributes} className="finxos-blockquote">
        {props.children}
      </blockquote>
    );
  },
  paste: el => el.nodeName === 'BLOCKQUOTE',
} as BlockSetting;
