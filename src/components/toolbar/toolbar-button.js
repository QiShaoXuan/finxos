import React, { memo } from 'react';
import { removeFormat, applyFormat } from '@Finxos/tools/handle-format';
import isActiveFormat from '@Finxos/tools/is-format-active';
import { useSlate } from 'slate-react';

let num = 1;
export default props => {
  const editor = useSlate();

  let { format } = props;
  const isActive = isActiveFormat(editor, format.name);

  return (
    <div
      className={`toolbar-button ${isActive ? 'active' : ''}`}
      onMouseDown={e => {
        e.preventDefault();
        num += 1;
        isActive
          ? removeFormat(editor, format)
          : applyFormat(editor, format.name, format.attributes ? Object.assign({}, format.attributes) : true);
        // isActive ? removeFormat(editor, format) : applyFormat(editor, format.name, { url: num });
      }}
    >
      {<format.icon />}
    </div>
  );
};
