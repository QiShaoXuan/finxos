import React from 'react';
import { useSlate } from 'slate-react';
import __ from '@finxos/i18n';
import { defaultBlock } from '@finxos/blocks';
import { deepClone, setBlockData, getBlock } from '@finxos/tools';
import BlockList  from './block-list';
import './style.scss';
import { Transforms } from 'slate';

export default {
  name: 'transform',
  title: __('Transform'),
  noTransform: true,
  onKeyDown: (event, editor) => {
    if (event.keyCode === 13 || event.keyCode === 8) {
      return;
    }

    if (event.keyCode === 191) {
      event.preventDefault();
      const path = editor.selection.anchor.path.slice(0, editor.selection.anchor.path.length - 1);
      const {
        data: { showList },
      } = getBlock(editor, path);

      setBlockData(editor, { showList: !showList });
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
  data: {
    showList: false,
  },
  transform: {},
  render: props => {
    const {
      data: { showList },
    } = props;

    const editor = useSlate();

    return (
      <div {...props.attributes} className="finxos-transform">
        <BlockList visible={showList} setVisible={() => setBlockData(editor, { showList: !showList })} />
        {props.children}
      </div>
    );
  },
};
