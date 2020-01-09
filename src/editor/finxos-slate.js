import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { compose } from './untils';

export default props => {
  const { content } = props;

  const editor = useMemo(() => compose([withHistory, withReact], createEditor()), []);
  const [value, setValue] = useState(content);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => {
        setValue(value);
      }}
    >
      {props.children}
    </Slate>
  );
};
