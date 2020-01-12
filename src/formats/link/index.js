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
      <Input size="small" placeholder={__('input href')} />
      <Button size="small" icon="enter" style={{ marginLeft: 8, flexShrink: 0 }} />
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
    const tooltipVisible = !!(formats[name] && props.attributes === formats[name]);
    if (formats[name]) {
      console.log(formats[name], props.attributes === formats[name]);
    }

    return (
      <Tooltip
        title={TooltipContent}
        overlayStyle={{ maxWidth: 500 }}
        visible={tooltipVisible}
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
