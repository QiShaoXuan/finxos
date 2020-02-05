import React from 'react';
import __ from '@finxos/i18n';
import { IconButton } from '@finxos/ui-components';
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
      const { level, Icon } = Data;
      return (
        <IconButton
          key={level}
          className={level === data.level ? 'active' : ''}
          onMouseDown={e => {
            e.preventDefault();
            props.setBlockData({
              level,
            });
          }}
          icon={Icon}
        />
      );
    });
  },
  paste: el => {
    const { nodeName } = el;
    return ['H1', 'H2', 'H3', 'H4'].find((v, i) => {
      if (v === nodeName) {
        return {
          data: {
            level: i,
          },
        };
      }
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
