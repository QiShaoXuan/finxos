import React from 'react';
import __ from '@finxos/i18n';
import operation from './operation';
import transform from './transform';
import onKeyDown from './on-key-down';
import data from './data';
import {BlockSetting} from '@finxos/blocks'
import Icon from './icons/list.svg';

import './style.scss';

const name = 'list';

export default {
  name,
  title: __('List'),
  icon: Icon,
  data,
  onKeyDown,
  operation,
  transform,
  render: props => {
    const { data } = props;
    const Tag = data.type.indexOf('ul') === -1 ? 'ol' : 'ul';

    return (
      <Tag className="finxos-list" {...props.attributes}>
        {props.children}
      </Tag>
    );
  },
  paste: el => {
    const { nodeName } = el;
    return nodeName === 'UL'
      ? {
          data: {
            type: 'ul1',
          },
        }
      : nodeName === 'OL'
      ? {
          data: {
            type: 'ol1',
          },
        }
      : false;
  },
} as BlockSetting
