import React from 'react';
import { Path, Node } from 'slate';
import { useSelected, ReactEditor, useSlate } from 'slate-react';

import __ from '@finxos/i18n';

export default {
  name: 'list-item',
  title: __('List-tem'),
  render: props => {
    const editor = useSlate();
    const parent = Node.get(editor, Path.parent(ReactEditor.findPath(editor, props.element)));
    const {
      data: { type },
    } = parent;
    return (
      <li>
        {type}:{props.children}
      </li>
    );
  },
  save: props => {
    return 'default';
  },
};
