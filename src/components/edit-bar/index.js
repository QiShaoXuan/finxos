import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { OperationArea } from '@finxos/components';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { Button } from '@finxos/ui-components';
import { BlockMenu } from '@finxos/components';
import { Range } from 'slate';

import './style.scss';

export default props => {
  const { protal = document.body } = props;

  const { editorDom } = useControls();

  const focused = useFocused();
  const editor = useSlate();
  const { selection } = editor;

  const [position, setPosition] = useState({ left: -100, top: -100 });

  useEffect(() => {
    if (focused && selection ) {
      const domBlock = editorDom.childNodes[selection.anchor.path[0]];
      const domRect = domBlock.getBoundingClientRect();
      const lineHeight = Number(window.getComputedStyle(domBlock)['line-height'].replace('px', ''));

      setPosition({
        top: `${domRect.top + (lineHeight - 24) / 2}px`,
        left: `${domRect.left - 40}px`,
      });
    } else {
      setPosition({ left: -100, top: -100 });
    }
  }, [focused, selection, selection && !Range.isCollapsed(selection)]);

  return createPortal(
    <div style={{ ...position }} className={`finxox-edit-bar`}>
      <Button shape="circle" icon="plus" size="small"></Button>
      <div className="edit-bar__popup-container">
        <div className="edit-bar__popup">
          <OperationArea divider={true} />
          <BlockMenu />
        </div>
      </div>
    </div>,
    protal
  );
};
