import React from 'react';
import { createPortal } from 'react-dom';
import OperationArea from '@finxos/components/operation-area';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { Button } from '@finxos/ui-components';
import { Range } from 'slate';

import './style.scss';

export default props => {
  const { protal = document.body } = props;

  const { editorDom } = useControls();

  const focused = useFocused();
  const editor = useSlate();
  const { selection } = editor;

  const position = () => {
    if (focused && selection && Range.isCollapsed(selection)) {
      const domBlock = selection.anchor.path
        .slice(0, selection.anchor.path.length - 1)
        .reduce((parent, path) => parent.childNodes[path], editorDom).childNodes[0];
      const domRect = domBlock.getBoundingClientRect();
      const lineHeight = Number(window.getComputedStyle(domBlock)['line-height'].replace('px', ''));

      return {
        top: `${domRect.top + (lineHeight - 24) / 2}px`,
        left: `${domRect.left - 40}px`,
      };
    } else {
      return { left: -100, top: -100 };
    }
  };

  return createPortal(
    <div style={{ ...position() }} className={`finxox-edit-bar`}>
      <Button shape="circle" icon="plus" size="small"></Button>
      <div className="edit-bar__popup-container">
        <div className="edit-bar__popup">
          <OperationArea divider={true} />
        </div>
      </div>
    </div>,
    protal
  );
};
