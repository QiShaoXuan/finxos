import React from 'react';
import { useSlate } from 'slate-react';

import { Menu, Dropdown, Button } from 'antd';
import createBlock from '../../tools/create-block.js';

export default props => {
  const editor = useSlate();

  const { BlockSettings } = props;
  const menu = (
    <Menu>
      {BlockSettings.map(block => (
        <Menu.Item key={block.name} onClick={() => createBlock(editor, block.name)}>
          {block.title}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button>添加</Button>
    </Dropdown>
  );
};
