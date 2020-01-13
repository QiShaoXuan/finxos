import React, { useMemo, useState, useRef } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import SelectedBlocksProvider from '@Finxos/hooks/use-active-blocks';
import ControlsProvider from '@Finxos/hooks/use-controls';
import { defaultBlock } from '@Finxos/blocks';
import { compose } from './untils';
import TestButton from '@Finxos/components/test-button';
const initialSetting = {
  blocks: [defaultBlock],
  formats: [],
};

export default props => {
  const { content, className = '', blocks, formats } = props;
  const editor = useMemo(() => compose([withHistory, withReact], createEditor()), []);
  const [value, setValue] = useState(content);
  const container = useRef(null);

  return (
    <div className={`finxos-container ${className}`} ref={container}>
      <ControlsProvider value={{ settings: { blocks, formats }, containerRef: container }}>
        <SelectedBlocksProvider>
          <Slate
            editor={editor}
            value={value}
            onChange={value => {
              setValue(value);
            }}
          >
            {props.children}
            <TestButton />
          </Slate>
        </SelectedBlocksProvider>
      </ControlsProvider>
    </div>
  );
};
