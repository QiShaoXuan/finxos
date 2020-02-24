import React from 'react';
import __ from '@finxos/i18n';
import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import { defaultBlock } from '@finxos/blocks';
import { deepClone } from '@finxos/tools';

import './style.scss';

export default {
  name: 'transform',
  title: __('Transform'),
  onKeyDown: (event, editor, selectedBlocks) => {
    if (event.keyCode === 13 || event.keyCode === 8) {
      return;
    }
    if (event.keyCode === 191) {
      event.preventDefault();
      return;
    }

    Transforms.setNodes(
      editor,
      {
        type: defaultBlock.name,
        data: deepClone(defaultBlock.data),
      },
      {
        mode: 'all',
        at: editor.selection,
      }
    );
  },
  transform:{

  },
  render: props => {
    const editor = useSlate();
    return (
      <div {...props.attributes} className="finxos-transform">
        {props.children}
      </div>
    );
  },
};
