import React from 'react';
import __ from '@finxos/i18n';
import { Button, IconButton } from '@finxos/ui-components';
import { useSlate } from 'slate-react';

import H2 from './icons/h2.svg';
import H3 from './icons/h3.svg';
import H4 from './icons/h4.svg';
import Icon from './icons/heading.svg';

import './style.scss';

export default {
  name: 'heading',
  title: __('Heading'),
  icon: Icon,
  data: {
    level: 2,
  },
  preventFormats: ['bold'],
  transform: [
    {
      name: 'paragraph',
      children: children => {
        return children.map(v => {
          v.bold = true;
          return v;
        });
      },
      data: data => {
        return {};
      },
    },
  ],
  operation: props => {
    const { data } = props;

    return [
      { Icon: H2, level: 2 },
      { Icon: H3, level: 3 },
      { Icon: H4, level: 4 },
    ].map(Data => {
      return (
        <IconButton
          size="small"
          key={Data.level}
          className={Data.level === data.level ? 'active' : ''}
          onMouseDown={e => {
            e.preventDefault();
            props.setBlockData({
              level: Data.level,
            });
          }}
        >
          <Data.Icon />
        </IconButton>
      );
    });
  },
  render: props => {
    const { data } = props;
    const Tag = `h${data.level}`;
    return (
      <Tag className="finxos-heading" {...props.attributes}>
        {props.children}
      </Tag>
    );
  },
};
