import React, { memo } from 'react';
import { removeFormat, applyFormat, isFormatActive } from '@finxos/tools';
import { useSlate } from 'slate-react';
import { IconButton } from '@finxos/ui-components';

export default props => {
  const editor = useSlate();
  let { format } = props;
  const isActive = isFormatActive(editor, format.name);
  return (
    <IconButton
      size="small"
      className={`toolbar-button ${isActive ? 'active' : ''}`}
      onMouseDown={e => {
        e.preventDefault();
        isActive ? removeFormat(editor, format.name) : applyFormat(editor, format.name, format.attributes);
      }}
      icon={format.icon}
    />
  );
};
