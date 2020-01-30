import React from 'react';
import __ from '@finxos/i18n';
import operation from './list-operation';
import data from './data'
import Icon from './icons/list.svg';

import './style.scss';

const name = 'list';

export default {
  name,
  title: __('List'),
  icon: Icon,
  data,
  operation,
  // transform: [
  //   {
  //     name: 'p',
  //     data: {
  //       level: 2,
  //     },
  //   },
  // ],
  render: props => {
    const { data } = props;
    const Tag = data.type.indexOf('ul') === -1 ? 'ol' : 'ul';

    return (
      <Tag className="finxos-list" {...props.attributes}>
        {props.children}
      </Tag>
    );
  },
  save: props => {
    return 'default';
  },
};
