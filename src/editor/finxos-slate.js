import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import SelectedBlocksProvider from '@Finxos/hooks/use-active-blocks';
import FormatSettingsProvider from '@Finxos/hooks/use-format-settings';
import BlockSettingsProvider from '@Finxos/hooks/use-block-settings';
import { compose } from './untils';

export default props => {
  const { content, className = '', blocks, formats } = props;
  const editor = useMemo(() => compose([withHistory, withReact], createEditor()), []);
  const [value, setValue] = useState(content);
  return (
    <div className={`finxos-container ${className}`}>
      <BlockSettingsProvider blockSettings={blocks}>
        <FormatSettingsProvider formatSettings={formats}>
          <SelectedBlocksProvider>
            <Slate
              editor={editor}
              value={value}
              onChange={value => {
                setValue(value);
              }}
            >
              {props.children}
            </Slate>
          </SelectedBlocksProvider>
        </FormatSettingsProvider>
      </BlockSettingsProvider>
    </div>
  );
};
