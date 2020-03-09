import React, { useMemo, useState, useRef, ReactNode } from 'react';
import { createEditor, Node,Range } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { ControlsProvider } from '@finxos/hooks/use-controls';
import { SettingsProvider } from '@finxos/hooks/use-settings';
import { mergeDefaultData } from '@finxos/tools';
import { compose } from './untils';

import { BlockSetting } from '@finxos/blocks';
import { FormatSetting } from '@finxos/formats';

import { withPaste, withVoid, withSetting } from './with';

export default (props: {
  content: Node[];
  className?: string;
  blocks: BlockSetting[];
  formats: FormatSetting[];
  children: ReactNode;
}) => {
  const { content, className = '', blocks, formats, children } = props;
  const editor = useMemo(
    () =>
      compose(createEditor(), [
        withHistory,
        withReact,
        editor => withPaste(editor, blocks, formats),
        editor => withVoid(editor, blocks),
        editor => withSetting(editor, blocks, formats),
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
          // @ts-ignore
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
            {children}
          </ControlsProvider>
        </Slate>
      </SettingsProvider>
    </div>
  );
};
