import React from 'react';
import __ from '@finxos/i18n';

import Icon from './icons/heading.svg';
import operation from './operation';
import { BlockSetting } from '@finxos/blocks';
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
  // transform: [
  //   {
  //     name: 'paragraph',
  //     data: data => {
  //       return {
  //         align: data.align,
  //       };
  //     },
  //   },
  // ],
  transform: {
    target: ['paragraph'],
  },
  operation,
  paste: el => {
    const { nodeName } = el;
    if (/^H\d$/.test(nodeName)) {
      // @ts-ignore
      const [level] = nodeName.match(/\d/);
      return {
        data: {
          level: Number(level) > 4 ? 4 : level,
        },
      };
    }
    return false;
  },
  render: props => {
    const {
      element: { data },
    } = props;
    const Tag = `h${data.level}`;
    return (
      <Tag className={`finxos-heading finxos-heading--${data.align}`} {...props.attributes}>
        {props.children}
      </Tag>
    );
  },
} as BlockSetting;
