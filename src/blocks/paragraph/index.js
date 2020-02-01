import React from 'react';
import { Transforms } from 'slate';
import { useSelected } from 'slate-react';
import __ from '@finxos/i18n';
import operation from './operation';

import Icon from './icons/paragraph.svg';

import './style.scss'
export default {
  name: 'paragraph',
  title: __('Paragraph'),
  icon: Icon,
  data: {
    align: 'left',
  },
  transform: [
    {
      name: 'heading',
      data: {
        level: 2,
      },
      options: {
        match: n => n.type === 'heading',
      },
    },
    {
      name: 'list-item',
      data: {
        type: 'ul1',
      },
      after: editor => {
        const block = { type: 'list', children: [], data: { type: 'ul1' } };
        Transforms.wrapNodes(editor, block);
      },
    },
  ],
  operation,
  render: props => {
    const {data} = props;

    return (
      <p {...props.attributes} className={`finxos-paragraph finxos-paragraph--${data.align}`}>
        {props.children}
      </p>
    );
  },
  save: props => {
    return 'default';
  },
};
