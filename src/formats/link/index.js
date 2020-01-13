import React, { useState } from 'react';
import { Tooltip, Button, Input, Switch, Icon } from 'antd';
import LinkIcon from './link.svg';
import __ from '@Finxos/i18n';
import { updateFormat } from '@Finxos/tools/handle-format';
import './style.scss';
import { useSlate } from 'slate-react';
import { setSelection } from '@Finxos/tools/handle-selection';
import { useControlsContext } from '@Finxos/hooks/use-controls';

const name = 'link';

const TooltipContent = props => {
  const editor = useSlate();
  const { attributes, onFocus, onPressEnter, addingLink, setAddingLink } = props;

  const [url, setUrl] = useState(attributes.url);

  const [editable, setEditable] = useState(false);
  const setAttr = (key, value) => {
    updateFormat(editor, name, attributes, { [key]: value });
  };

  return (
    <div className="finxos-link-tooltip__content" onMouseDown={e => e.stopPropagation()}>
      {addingLink || editable ? (
        <>
          <Input
            autoFocus={true}
            size="small"
            placeholder={__('input href')}
            value={url}
            onChange={e => {
              setUrl(e.target.value);
            }}
            onFocus={() => {
              onFocus();
            }}
            onBlur={() => {
              setUrl(attributes.url);
            }}
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
        </>
      ) : (
        <>
          <a href={attributes.url} target={attributes.blank ? '_blank' : 'self'}>
            {attributes.url}
            {attributes.blank ? <Icon type="paper-clip" /> : ''}
          </a>
          <Button
            onMouseDown={e => {
              e.stopPropagation();
              setEditable(false);
              setAddingLink(true);
            }}
            size="small"
            icon="edit"
            style={{ marginLeft: 8, flexShrink: 0 }}
          />
        </>
      )}

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

export default {
  name,
  title: __('Link'),
  icon: LinkIcon,
  attributes: {
    url: '',
    blank: true,
  },
  render: props => {
    const {
      controls: { isActive },
      attributes,
    } = props;
    const editor = useSlate();

    const [visible, setVisible] = useState(false);
    const [lastSelection, setLastSelection] = useState(editor.selection);
    const [addingLink, setAddingLink] = useState(!attributes.url);
    const { containerRef } = useControlsContext();
    console.log('render');

    // const lastSelection = editor.history.undos[editor.history.undos.length - 1].path
    return (
      <Tooltip
        title={() => (
          <TooltipContent
            attributes={attributes}
            onFocus={() => setVisible(true)}
            addingLink={addingLink}
            setAddingLink={setAddingLink}
            onPressEnter={url => {
              setSelection(editor, containerRef, lastSelection).then(() => {
                updateFormat(editor, name, attributes, { url });
                setAddingLink(false);
              });
            }}
          />
        )}
        overlayStyle={{ maxWidth: 500 }}
        visible={isActive || visible}
        onVisibleChange={show => {
          if (!show) {
            setLastSelection(editor.selection);
          }
        }}
        overlayClassName="finxos-link-tooltip"
        placement="bottom"
        trigger="click"
      >
        <a className="finxos-link" {...props}>
          {props.children}
        </a>
      </Tooltip>
    );
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'l';
  },
};
