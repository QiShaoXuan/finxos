import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import SelectedBlocksProvider from '@Finxos/hooks/use-active-blocks';
import SettingsProvider from '@Finxos/hooks/use-setting';
import { defaultBlock } from '@Finxos/blocks';
import { compose } from './untils';

const initialSetting = {
  blocks: [defaultBlock],
  formats: [],
};

export default props => {
  const { content, className = '', blocks, formats } = props;
  const editor = useMemo(() => compose([withHistory, withReact], createEditor()), []);
  const [value, setValue] = useState(content);
  return (
    <div className={`finxos-container ${className}`}>
      <SettingsProvider setting={{ blocks, formats }}>
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
      </SettingsProvider>
    </div>
  );
};
