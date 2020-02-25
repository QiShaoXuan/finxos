import React, { useMemo, useState, useRef } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import ControlsProvider from '@finxos/hooks/use-controls';
import SettingsProvider from '@finxos/hooks/use-settings';
import { mergeDefaultData } from '@finxos/tools';
import { compose } from './untils';
import withPaste from './with/paste';
import withVoid from './with/void';
import TestButton from '@finxos/components/test-button';

export default props => {
  const { content, className = '', blocks = [], formats = [] } = props;
  const editor = useMemo(
    () =>
      compose(createEditor(), [
        withHistory,
        withReact,
        editor => withPaste(editor, blocks, formats),
        editor => withVoid(editor, blocks),
      ]),
    []
  );
  const [value, setValue] = useState(compose(content, [content => mergeDefaultData(content, blocks)]));
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
          </ControlsProvider>
        </Slate>
      </SettingsProvider>
    </div>
  );
};
