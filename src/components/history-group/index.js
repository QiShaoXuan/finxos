import React from 'react';
import { Button } from 'antd';
import Undo from './undo.svg';
import Redo from './redo.svg';
import './style.scss';
import { useSlate } from 'slate-react';
export default () => {
  const editor = useSlate();

  return (
    <Button.Group className="finxos-history-group">
      <Button
        onClick={() => {
          editor.undo();
        }}
        disabled={editor.history.undos.length === 0}
        className={`history-button ${editor.history.undos.length ? 'can-click' : ''}`}
      >
        <Undo />
      </Button>
      <Button
        onClick={() => {
          editor.redo();
        }}
        disabled={editor.history.redos.length === 0}
        className={`history-button ${editor.history.redos.length ? 'can-click' : ''}`}
      >
        <Redo />
      </Button>
    </Button.Group>
  );
};
