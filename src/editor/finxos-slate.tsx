import React, { useMemo, useState, useRef, ReactNode } from 'react';
import { createEditor, Node, Editor, Location } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { ControlsProvider } from '@finxos/hooks/use-controls';
import { SettingsProvider } from '@finxos/hooks/use-settings';
import { mergeDefaultData } from '@finxos/tools';
import { EditBar, Toolbar } from '@finxos/components/index';

import { compose } from './untils';

import { BlockSetting } from '@finxos/blocks';
import { FormatSetting } from '@finxos/formats';

import { withPaste, withVoid, withSetting } from './with';

interface Props {
  content: Node[];
  className?: string;
  blocks: BlockSetting[];
  formats: FormatSetting[];
  children: ReactNode;
}
interface State {
  value: any[];
  lastSelection: Location | null;
}

class FinxosSlate extends React.Component<Props, State> {
  private container: React.RefObject<HTMLDivElement>;
  private editor: Editor;

  constructor(props: Readonly<Props>) {
    super(props);
    const { blocks, formats, content } = this.props;

    this.container = React.createRef();

    this.editor = compose(createEditor(), [
      withHistory,
      withReact,
      editor => withPaste(editor, blocks, formats),
      editor => withVoid(editor, blocks),
      editor => withSetting(editor, blocks, formats),
    ]);

    this.state = {
      value: compose(content, [content => mergeDefaultData(content, blocks)]),
      lastSelection: null,
    };
  }

  render() {
    const { className = '', blocks, formats, children } = this.props;
    const { value, lastSelection } = this.state;

    return (
      <div className={`finxos-container ${className}`} ref={this.container}>
        <SettingsProvider settings={{ blocks, formats }}>
          <Slate
            // @ts-ignore
            editor={this.editor}
            value={value}
            onChange={value => {
              if (this.editor.selection !== null) {
                this.setState({
                  lastSelection: this.editor.selection,
                });
              }
              this.setState({
                value,
              });
            }}
          >
            <ControlsProvider container={this.container} lastSelection={lastSelection}>
              <Toolbar />
              <EditBar />
              {children}
            </ControlsProvider>
          </Slate>
        </SettingsProvider>
      </div>
    );
  }
}

export default FinxosSlate;
