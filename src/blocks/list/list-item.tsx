import React, { useMemo } from 'react';
import { useSelected, ReactEditor, useSlate } from 'slate-react';
import { getItemPrefix, getListDeep } from './untils';
import __ from '@finxos/i18n';
import data from './data';
import { BlockSetting } from '@finxos/blocks';
import Icon from './icons/list.svg';

export default {
  name: 'list-item',
  title: __('ListItem'),
  icon: Icon,
  isInline: true,
  data,
  render: props => {
    const editor = useSlate();
    const path = useMemo(() => ReactEditor.findPath(editor, props.element), [props.element, useSelected()]);
    const deep = useMemo(() => getListDeep(editor, path), [path]);
    const {
      element: {
        data: { type },
      },
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
  paste: el => {
    const { nodeName } = el;

    return el.parentNode && nodeName === 'LI'
      ? {
          data: {
            type: el.parentNode.nodeName === 'OL' ? 'ol1' : 'ul1',
          },
        }
      : false;
  },
} as BlockSetting;
