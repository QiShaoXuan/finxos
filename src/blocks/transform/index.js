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
    // on tap "/"
    if (event.keyCode === 191) {
      const path = editor.selection.anchor.path.slice(0, editor.selection.anchor.path.length - 1);
      const {
        data: { showList },
      } = getBlock(editor, path);

      setBlockData(editor, { showList: !showList });
      return;
    }
    // on tap other key
    const memoPath = deepClone(editor.selection.anchor.path);
    convertBlock(editor, {
      currentBlock: {
        type: name,
        data: {},
        children: [{ text: event.key }],
      },
      targetName: defaultBlock.name,
    });
    setSelection(editor, getBlockFocus(editor, memoPath));
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
