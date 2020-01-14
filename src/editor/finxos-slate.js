import React, { useMemo, useState, useRef } from 'react';
import { createEditor } from 'slate';
import { Slate, useSlate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import ControlsProvider from '@Finxos/hooks/use-controls';
import SettingsProvider from '@Finxos/hooks/use-settings';
import { compose } from './untils';
import TestButton from '@Finxos/components/test-button';

export default props => {
  const { content, className = '', blocks, formats } = props;
  const editor = useMemo(() => compose([withHistory, withReact], createEditor()), []);
  const [value, setValue] = useState(content);
  const [lastSelection, setLastSelection] = useState(editor.selection);
  const container = useRef(null);

  return (
    <div className={`finxos-container ${className}`} ref={container}>
      <SettingsProvider settings={{ blocks, formats }}>
        <Slate
          editor={editor}
          value={value}
          onChange={value => {
            if (editor.selection !== null) {
              setLastSelection(editor.selection);
            }
            setValue(value);
          }}
        >
          <ControlsProvider container={container} lastSelection={lastSelection}>
            {props.children}
            <TestButton />
          </ControlsProvider>
        </Slate>
      </SettingsProvider>
    </div>
  );
};
