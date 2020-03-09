import React, { memo } from 'react';
import { removeFormat, applyFormat, isFormatActive } from '@finxos/tools';
import { useSlate } from 'slate-react';
import { IconButton } from '@finxos/ui-components';
import { FormatSetting } from '@finxos/formats';

export default (props: { format: FormatSetting }) => {
  const editor = useSlate();
  let { format } = props;
  const isActive = isFormatActive(editor, format.name);
  return (
    <IconButton
      className={`toolbar-button ${isActive ? 'active' : ''}`}
      onMouseDown={e => {
        e.preventDefault();
        isActive ? removeFormat(editor, format.name) : applyFormat(editor, format.name, format.attributes);
      }}
      icon={format.icon}
    />
  );
};
