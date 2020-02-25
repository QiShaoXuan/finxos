import React from 'react';
import { useSlate } from 'slate-react';
import { Dropdown, Select } from '@finxos/ui-components';
import { useSettings } from '@finxos/hooks';
import { deepClone, convertBlock, setSelection, getBlockRange, getBlock } from '@finxos/tools';
const { Option } = Select;
import './style.scss';

export default props => {
  const { visible, setVisible } = props;
  const editor = useSlate();
  const { blocks } = useSettings();

  const select = (
    <div>
      <Select
        // showSearch
        // autoFocus={true}
        open={visible}
        onBlur={() => {
          setVisible(false);
        }}
        style={{ width: 200, opacity: 0, transform: 'translateY(-100%)' }}
        onChange={targetName => {
          setVisible(false);
          const blockPath = editor.selection.anchor.path.slice(0, editor.selection.anchor.path.length - 1);
          const memoPath = deepClone(editor.selection.anchor.path);
          convertBlock(editor, {
            blocks,
            currentBlock: getBlock(editor, blockPath),
            targetName,
          });
          setSelection(editor, getBlockRange(editor, memoPath));
        }}
      >
        {blocks.map(block => {
          return block.noTransform === true ? null : (
            <Option key={block.name} value={block.name}>
              <div className="finxos-transform-block-list__item">
                {block.icon ? <block.icon /> : null}
                <span className="finxos-transform-block-list__item-name">{block.name}</span>
              </div>
            </Option>
          );
        })}
      </Select>
    </div>
  );

  return (
    <Dropdown overlay={select} visible={visible}>
      <span></span>
    </Dropdown>
  );
};
