import React from 'react';
import { removeFormat, applyFormat } from '@Finxos/tools/handle-format';
import isActiveFormat from '@Finxos/tools/is-format-active';
import { useSlate } from 'slate-react';

export default props => {
  const editor = useSlate();

  const { format } = props;
  const isActive = isActiveFormat(editor, format.name);

  return (
    <div
      className={`toolbar-button ${isActive ? 'active' : ''}`}
      onMouseDown={e => {
        e.preventDefault();
        isActive ? removeFormat(editor, format) : applyFormat(editor, format);
      }}
    >
      {<format.icon />}
    </div>
  );
};
