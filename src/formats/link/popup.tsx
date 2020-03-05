import React, { useEffect, useRef, useState } from 'react';
import { useSlate } from 'slate-react';
import { Button, Icon, Input, Switch, Tooltip } from '@finxos/ui-components';
import { updateFormat } from '@finxos/tools';
import __ from '@finxos/i18n';
import { name } from './index';

const focusInputFocus = (container: HTMLElement | null) => {
  if (container === null) {
    return;
  }
  setTimeout(() => {
    const input = container.querySelector('input');
    if (input) {
      input.focus();
    }
  });
};

export default (props: {
  attributes: { url: string; blank: boolean };
  onFocus(): void;
  onPressEnter(url: string): void;
  addingLink: boolean;
  setAddingLink(adding: boolean): void;
  onBlur(): void;
  visible: boolean;
}) => {
  const editor = useSlate();
  const { attributes, onFocus, onPressEnter, addingLink, setAddingLink, onBlur, visible } = props;
  const containerRef = useRef(null);
  const [url, setUrl] = useState<string>(attributes.url);

  const [editable, setEditable] = useState(false);
  const setAttr = (key: string, value: any) => {
    updateFormat(editor, name, attributes, { [key]: value });
  };

  useEffect(() => {
    if (visible && editor.selection && editor.selection.anchor.offset === editor.selection.focus.offset) {
      const current = containerRef.current;
      if (editor.selection.anchor.offset === editor.selection.focus.offset && current !== null) {
        focusInputFocus(current);
      }
    }
  });

  return (
    <div className="finxos-link-popup__content" onMouseDown={e => e.stopPropagation()} ref={containerRef}>
      <div className={`finxos-link-popup__wrapper ${addingLink || editable ? 'link-popup--show' : 'link-popup--hide'}`}>
        <Input
          autoFocus={true}
          size="small"
          placeholder={__('input href')}
          value={url}
          onChange={e => {
            setUrl(e.target.value);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          onPressEnter={() => {
            onPressEnter(url);
            setEditable(!url);
          }}
        />
        <Button
          onMouseDown={() => {
            onPressEnter(url);
            setEditable(!url);
          }}
          size="small"
          icon="enter"
          style={{ marginLeft: 8, flexShrink: 0 }}
        />
      </div>

      <div
        className={`finxos-link-popup__wrapper ${!addingLink && !editable ? 'link-popup--show' : 'link-popup--hide'}`}
      >
        <div className="link-tooltip__content">
          <a href={attributes.url} target={attributes.blank ? '_blank' : 'self'}>
            {attributes.url}
            {attributes.blank ? <Icon type="paper-clip" /> : ''}
          </a>
        </div>
        <Button
          onMouseDown={e => {
            e.stopPropagation();
            setEditable(false);
            setAddingLink(true);
            if (containerRef.current !== null) {
              focusInputFocus(containerRef.current);
            }
          }}
          size="small"
          icon="edit"
          style={{ marginLeft: 8, flexShrink: 0 }}
        />
      </div>

      <Tooltip title={__('Open in New Tab')}>
        <Switch
          size="small"
          checked={attributes.blank}
          style={{ marginLeft: 8 }}
          onChange={checked => setAttr('blank', checked)}
        />
      </Tooltip>
    </div>
  );
};
