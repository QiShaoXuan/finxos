import React from 'react';
import './style.scss';
export default {
  name: 'code',
  title: '代码段',
  icon: () => <img src={require('./code.svg')} alt="" />,
  render: props => {
    return (
      <code className="finxos-line-code" {...props.attributes}>
        {props.children}
      </code>
    );
  },
  shortcut: event => {
    return event.ctrlKey && event.key === '`';
  },
};
