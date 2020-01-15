import React from 'react';
import __ from '@finxos/i18n';

export default {
  name: 'header',
  title: __('Header'),
  attributes: {
    level: 2,
  },
  preventFormats: ['bold'],
  render: props => {
    return <h2 {...props.attributes}>{props.children}</h2>;
  },
  transform: props => {
    return 'default';
  },
};
