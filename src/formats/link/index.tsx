import React, { useMemo, useState } from 'react';
import { Range } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { Tooltip } from '@finxos/ui-components';
import { updateFormat, setSelection, deepClone } from '@finxos/tools';
import { useControls } from '@finxos/hooks';
import __ from '@finxos/i18n';
import TooltipContent from './popup';
import LinkIcon from './link.svg';
import { FormatRenderProps, FormatSetting } from '@finxos/formats';

import './style.scss';

interface Props extends FormatRenderProps {
  attributes: {
    url: string;
    blank: boolean;
  };
}

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
  render: (props: Props) => {
    const { element, attributes } = props;
    const editor = useSlate();
    // const { lastSelection } = useControls();

    const [visible, setVisible] = useState(false);
    const [addingLink, setAddingLink] = useState(!attributes.url);

    const isActive = useMemo(() => {
      if (!editor.selection) {
        return false;
      }
      return Range.includes(editor.selection, ReactEditor.findPath(editor, element));
    }, [editor.selection]);

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
            onPressEnter={(url: string) => {
              // setSelection(editor, lastSelection).then(() => {
              //   updateFormat(editor, name, attributes, { url });
              //   setAddingLink(false);
              //   setVisible(false);
              // });
            }}
          />
        )}
        overlayStyle={{ maxWidth: 500 }}
        visible={isActive || visible}
        overlayClassName="finxos-link-tooltip"
        placement="bottom"
        trigger="click"
      >
        <a className="finxos-link">{props.children}</a>
      </Tooltip>
    );
  },
  shortcut: ['ctrl', 'l'],
  paste: (el: HTMLElement) => {
    const { nodeName } = el;
    if (nodeName === 'A') {
      const attr = deepClone(attributes);
      attr.url = el.getAttribute('href') || '';
      return attr;
    }
    return false;
  },
} as FormatSetting;
