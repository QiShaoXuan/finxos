import React from 'react';
import { Transforms } from 'slate';
import { useSelected, useSlate } from 'slate-react';
import { Button, IconButton } from '@finxos/ui-components';
import __ from '@finxos/i18n';
import listItem from './list-item';

import Icon from './icons/list.svg';
import Ul from './icons/ul.svg';
import Ul1 from './icons/ul1.svg';
import Ul2 from './icons/ul2.svg';
import Ul3 from './icons/ul3.svg';

const listType = ['ul1', 'ol1'];
const list = {
  name: 'list',
  title: __('List'),
  icon: Icon,
  data: {
    type: 'ul1',
  },
  operation: props => {
    const { data, editor } = props;
    return (
      <div>
        {[
          { Icon: Ul1, type: 'ul1' },
          { Icon: Ul2, type: 'ul2' },
          { Icon: Ul3, type: 'ul3' },
        ].map(Type => {
          const { type, Icon } = Type;
          return (
            <IconButton
              size="small"
              key={type}
              className={type === data.type ? 'active' : ''}
              onMouseDown={e => {
                e.preventDefault();
                props.setBlockData({
                  type,
                });
              }}
            >
              <Icon />
            </IconButton>
          );
        })}
      </div>
    );
  },

  // transform: [
  //   {
  //     name: 'p',
  //     data: {
  //       level: 2,
  //     },
  //   },
  // ],
  render: props => {
    return <ul {...props.attributes}>{props.children}</ul>;
  },
  save: props => {
    return 'default';
  },
};

export default [list, listItem];
