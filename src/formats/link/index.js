import React, { useCallback } from 'react';
import { useFocused, useSlate } from 'slate-react';
import isActiveFormat from '@Finxos/tools/is-format-active';

import Icon from './link.svg';
import __ from '@Finxos/i18n';

import './style.scss';

const name = 'link';
export default {
  name,
  title: __('Link'),
  icon: Icon,
  render: props => {
    const editor = useSlate();

    const focused = useFocused();
    const { selection } = editor;

    const a = useCallback(() => {
     console.log(' isActiveFormat(editor, name)', isActiveFormat(editor, name))
     ;
    }, [selection, focused]);
console.log('props',props)

    return (
      <a className="finxos-link" aa={a()} {...props.attributes}>
        {props.children}
      </a>
    );
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'u';
  },
};
