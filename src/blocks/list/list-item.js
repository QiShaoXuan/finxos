import React, { useMemo } from 'react';
import { useSelected, ReactEditor, useSlate } from 'slate-react';
import { getItemPrefix, getListDeep } from './untils';
import __ from '@finxos/i18n';
import data from './data';

export default {
  name: 'list-item',
  title: __('ListItem'),
  data,
  render: props => {
    const editor = useSlate();
    const path = useMemo(() => ReactEditor.findPath(editor, props.element), [props.element, useSelected()]);
    const deep = useMemo(() => getListDeep(editor, path), [path]);
    const {
      data: { type },
    } = props;

    return (
      <li
        className={`finxos-list-item finxos-list-item--${type}`}
        data-deep={deep + 1}
        data-prefix={useMemo(() => getItemPrefix(editor, path, type, deep), [path, type])}
      >
        {props.children}
      </li>
    );
  },
  save: props => {
    return 'default';
  },
};
