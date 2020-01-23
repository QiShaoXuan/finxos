import React, { memo } from 'react';
import { removeFormat, applyFormat, isFormatActive } from '@finxos/tools';
import { useSlate } from 'slate-react';

export default props => {
  const editor = useSlate();

  let { format } = props;
  const isActive = isFormatActive(editor, format.name);

  return (
    <div
      className={`toolbar-button ${isActive ? 'active' : ''}`}
      onMouseDown={e => {
        e.preventDefault();
        isActive ? removeFormat(editor, format.name) : applyFormat(editor, format.name, format.attributes);
      }}
    >
      <format.icon />
    </div>
  );
};
