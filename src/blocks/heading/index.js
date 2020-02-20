import React from 'react';
import __ from '@finxos/i18n';

import Icon from './icons/heading.svg';
import operation from './operation';
import './style.scss';

export default {
  name: 'heading',
  title: __('Heading'),
  icon: Icon,
  data: {
    level: 2,
    align: 'left',
  },
  preventFormats: ['bold'],
  transform: [
    {
      name: 'paragraph',
      data: data => {
        return {
          align: data.align,
        };
      },
    },
  ],
  operation,
  paste: el => {
    const { nodeName } = el;
    if (/^H\d$/.test(nodeName)) {
      const [level] = nodeName.match(/\d/);
      return {
        data: {
          level: level > 4 ? 4 : level,
        },
      };
    }

    return false;
  },
  render: props => {
    const { data } = props;
    const Tag = `h${data.level}`;
    return (
      <Tag className={`finxos-heading finxos-heading--${data.align}`} {...props.attributes}>
        {props.children}
      </Tag>
    );
  },
};
