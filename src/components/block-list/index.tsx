import React from 'react';
import { useSlate, useFocused } from 'slate-react';
import { Menu, Dropdown, Button } from '@finxos/ui-components';
import { setSelection, getBlockRange, insertBlock } from '@finxos/tools';

import './style.scss';
import { BlockSetting } from '@finxos/blocks';

const menu = () => {
  const editor = useSlate();
  const {
    settings: { blocks },
  } = editor;
  const focused = useFocused();
  return (
    <Menu
      onClick={({ key }) => {
        let path;
        if (focused && editor.selection) {
          path = [editor.selection.anchor.path[0] + 1];
        } else {
          path = [editor.children.length];
        }
        insertBlock(editor, { path, targetName: key });
        setSelection(editor, getBlockRange(editor, path));
      }}
    >
      {blocks.map((block: BlockSetting) => {
        return block.isBlock === false ? null : (
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
};

export default (props: { style?: {}; [key: string]: any }) => {
  return (
    <Dropdown overlay={menu}>
      <div style={props.style}>
        <Button shape="circle" icon="plus" />
      </div>
    </Dropdown>
  );
};
