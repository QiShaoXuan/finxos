import React from 'react';
import { useSlate } from 'slate-react';
import getCurrentFormats from '@Finxos/tools/get-current-formats';
import { Tooltip, Button, Input, Switch } from 'antd';
import Icon from './link.svg';
import __ from '@Finxos/i18n';

import './style.scss';

const name = 'link';

const TooltipContent = () => {
  return (
    <div className="finxos-link-tooltip__content">
      <Input size="small" placeholder="small size" />
      <Button size="small" icon="enter" style={{ marginLeft: 8 }} />
      <Tooltip title={__('Open in New Tab')}>
        <Switch size="small" defaultChecked style={{ marginLeft: 8 }} />
      </Tooltip>
    </div>
  );
};

export default {
  name,
  title: __('Link'),
  icon: Icon,
  attributes: {
    url: '',
  },
  render: props => {
    const editor = useSlate();
    const formats = getCurrentFormats(editor);
console.log('props',props)

    return (
      <>
        <a className="finxos-link" {...props}>
          {props.children}
        </a>
      </>
    );
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'u';
  },
};
