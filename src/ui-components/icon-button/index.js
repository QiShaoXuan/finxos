import React from 'react';
import './style.scss';
export default props => {
  return (
    <div {...props} className={`finxos-icon-button ${props.className}`}>
      {props.children}
    </div>
  );
};
