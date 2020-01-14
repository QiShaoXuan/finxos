import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import { Tooltip } from 'antd';

import { updateFormat } from '@Finxos/tools/handle-format';
import { setSelection } from '@Finxos/tools/handle-selection';
import { useControlsContext } from '@Finxos/hooks/use-controls';
import __ from '@Finxos/i18n';
import TooltipContent from './popup';

import LinkIcon from './link.svg';

import './style.scss';

export const name = 'link';

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
    const { editorDom, lastSelection } = useControlsContext();

    const [visible, setVisible] = useState(false);
    const [addingLink, setAddingLink] = useState(!attributes.url);

    return (
      <Tooltip
        title={() => (
          <TooltipContent
            visible={isActive || visible}
            attributes={attributes}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            addingLink={addingLink}
            setAddingLink={setAddingLink}
            onPressEnter={url => {
              setSelection(editor, editorDom, lastSelection).then(() => {
                updateFormat(editor, name, attributes, { url });
                setAddingLink(false);
                setVisible(false);
              });
            }}
          />
        )}
        overlayStyle={{ maxWidth: 500 }}
        visible={isActive || visible}
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
