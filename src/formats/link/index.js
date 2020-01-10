import React, { useCallback, useMemo, memo } from 'react';
import { useFocused, useSlate } from 'slate-react';
import getCurrentFormats from '@Finxos/tools/get-current-formats';

import Icon from './link.svg';
import __ from '@Finxos/i18n';

import './style.scss';

const name = 'link';
export default {
  name,
  title: __('Link'),
  icon: Icon,
  attributes: {
    url: '',
  },
  render: memo(props => {
    const editor = useSlate();

    const focused = useFocused();
    const { selection } = editor;

    // useMemo(() => {
    const formats = getCurrentFormats(editor);
    console.log(formats);
    // }, [selection, focused]);

    return (
      <a className="finxos-link" {...props}>
        {props.children}
      </a>
    );
  }),
  shortcut: event => {
    return event.ctrlKey && event.key === 'u';
  },
};
