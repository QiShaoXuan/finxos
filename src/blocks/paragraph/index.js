import React from 'react';
import { Transforms } from 'slate';
import { useSelected } from 'slate-react';
import __ from '@finxos/i18n';
import Icon from './paragraph.svg';
export default {
  name: 'paragraph',
  title: __('Paragraph'),
  icon: Icon,
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
  render: props => {
    return (
      <p {...props.attributes} className="finxos-paragraph">
        {props.children}
      </p>
    );
  },
  save: props => {
    return 'default';
  },
};
