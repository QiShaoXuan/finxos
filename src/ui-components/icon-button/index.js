import React from 'react';
import './style.scss';
export default props => {
  return (
    <div onMouseDown={props.onMouseDown} className={`finxos-icon-button ${props.className}`}>
      <props.icon />
      {props.children}
    </div>
  );
};
