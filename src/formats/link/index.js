import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import { Tooltip } from '@finxos/ui-components';

import { updateFormat, setSelection } from '@finxos/tools';
import { useControls } from '@finxos/hooks';
import __ from '@finxos/i18n';
import TooltipContent from './popup';

import LinkIcon from './link.svg';

import './style.scss';

export const name = 'link';

const attributes = {
  url: '',
  blank: true,
};

export default {
  name,
  title: __('Link'),
  icon: LinkIcon,
  attributes,
  acrossBlock: false,
  toolbar: true,
  render: props => {
    const {
      controls: { isActive },
      attributes,
    } = props;
    console.log('attributes', attributes);

    const editor = useSlate();
    const { editorDom, lastSelection } = useControls();

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
        <a className="finxos-link" >
          {props.children}
        </a>
      </Tooltip>
    );
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'l';
  },
  paste: el => {
    const { nodeName, href } = el;
    if (nodeName === 'A') {
      const attr = JSON.parse(JSON.stringify(attributes));
      attr.url = href || '';
      return attr;
    }
    return false;
  },
};
