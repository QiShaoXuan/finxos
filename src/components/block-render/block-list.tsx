import React from 'react';
import { Path } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { Dropdown, Select } from '@finxos/ui-components';
import { convertBlock, getBlock } from '@finxos/tools';
import { BlockSetting } from '@finxos/blocks';

const { Option } = Select;

import './style.scss';

export default (props: { [key: string]: any }) => {
  const editor = useSlate();
  const select = (
    <div>
      <Select
        open={true}
        onBlur={() => {
          editor.deleteBackward('character');
        }}
        style={{ width: 200, opacity: 0, transform: 'translateY(-100%)' }}
        onChange={targetName => {
          if (editor.selection === null) {
            return;
          }
          convertBlock(editor, {
            currentBlock: getBlock(editor, Path.parent(editor.selection.focus.path)),
            targetName,
          });
          editor.deleteBackward('character');
          ReactEditor.focus(editor);
        }}
      >
        {editor.setting.blocks.map((block: BlockSetting) => {
          return block.isBlock === false ? null : (
            <Option key={block.name} value={block.name}>
              <div className="finxos-transform-block-list__item">
                {block.icon ? <block.icon/> : null}
                <span className="finxos-transform-block-list__item-name">{block.name}</span>
              </div>
            </Option>
          );
        })}
      </Select>
    </div>
  );

  return (
    <Dropdown overlay={select} visible={true}>
      <span></span>
    </Dropdown>
  );
};
