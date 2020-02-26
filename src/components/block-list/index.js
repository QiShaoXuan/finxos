import React from 'react';
import { useSlate, useFocused } from 'slate-react';
import { Menu, Dropdown, Button, Icon } from '@finxos/ui-components';
import { useSettings } from '@finxos/hooks';
import { setSelection, getBlockRange, insertBlock } from '@finxos/tools';

import './style.scss';
export default props => {
  const { blocks } = useSettings();
  const editor = useSlate();
  const focused = useFocused();
  const menu = (
    <Menu
      onClick={({ key }) => {
        let path;
        if (focused) {
          path = [editor.selection.anchor.path[0] + 1];
        } else {
          path = [editor.children.length];
        }
        insertBlock(editor, { blocks, path, targetName: key });
        setSelection(editor, getBlockRange(editor, path));
      }}
    >
      {blocks.map(block => {
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
  return (
    <Dropdown overlay={menu}>
      <div style={props.style}>
        <Button shape="circle" icon="plus" />
      </div>
    </Dropdown>
  );
};
