import React from 'react';
import { useSlate } from 'slate-react';
import __ from '@finxos/i18n';
import { defaultBlock } from '@finxos/blocks';
import { deepClone, setBlockData, getBlock, convertBlock, setSelection, getBlockFocus } from '@finxos/tools';
import BlockList from './block-list';
import './style.scss';

export const name = 'transform';
export default {
  name,
  title: __('Transform'),
  noTransform: true,
  onKeyDown: (event, editor) => {
    if (event.keyCode === 13 || event.keyCode === 8) {
      return;
    }

    event.preventDefault();

    const path = editor.selection.anchor.path.slice(0, editor.selection.anchor.path.length - 1);
    const {
      data: { showList, lastBlockName },
    } = getBlock(editor, path);

    // on tap "/"
    if (event.keyCode === 191) {
      setBlockData(editor, { showList: !showList });
      return;
    }
    // on tap other key
    if (event.key && event.key.length === 1) {
      convertBlock(editor, {
        currentBlock: {
          type: name,
          data: {},
          children: [{ text: event.key }],
        },
        targetName: lastBlockName || defaultBlock.name,
      });
    }
  },
  data: {
    showList: false,
    lastBlockName: '',
  },
  transform: {},
  render: props => {
    const {
      data: { showList, lastBlock },
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
