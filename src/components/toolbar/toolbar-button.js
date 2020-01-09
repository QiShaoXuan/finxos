import React from 'react';
import toggleFormat from '@Finxos/tools/toogle-format';
import isActiveFormat from '@Finxos/tools/is-format-active';
import { useSlate } from 'slate-react';

export default props => {
  const editor = useSlate();

  const { format } = props;
  const isActive = isActiveFormat(editor, format.name);

  return (
    <div className={`toolbar-button ${isActive ? 'active' : ''}`} onClick={() => toggleFormat(editor, format.name)}>
      {<format.icon />}
    </div>
  );
};
