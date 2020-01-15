import React from 'react';
import { Range, Editor } from 'slate';
import { Button } from '@finxos/ui-components';
import { useSlate } from 'slate-react';

export default () => {
  const editor = useSlate();
  const { selection } = editor;

  return (
    <Button
      onMouseDown={() => {
        
      }}
    >
      click to tset
    </Button>
  );
};
