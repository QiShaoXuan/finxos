import React from 'react';
import { useSlate } from 'slate-react';
import { Menu, Dropdown } from '@finxos/ui-components';
import { useSettings } from '@finxos/hooks';
import { deepClone, convertBlock, setSelection, getBlockRange, getBlock } from '@finxos/tools';

import './style.scss';

export default props => {
  const { visible, setVisible } = props;
  const editor = useSlate();
  const { blocks } = useSettings();

  const menu = (
    <Menu
      onClick={({ key }) => {
        setVisible(false);
        const blockPath = editor.selection.anchor.path.slice(0, editor.selection.anchor.path.length - 1);
        const memoPath = deepClone(editor.selection.anchor.path);
        convertBlock(editor, blocks, getBlock(editor, blockPath), key);
        setSelection(editor, getBlockRange(editor, memoPath));
      }}
    >
      {blocks.map(block => {
        return block.noTransform === true ? null : (
          <Menu.Item key={block.name}>
            <div className="finxos-block-list__item">
              {block.icon ? <block.icon /> : null}
              <span className="finxos-block-list__item-name">{block.name}</span>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} visible={visible}>
        <span></span>
      </Dropdown>
    </>
  );
};
