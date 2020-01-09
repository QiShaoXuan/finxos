import React from 'react';
import { createPortal } from 'react-dom';

import './style.scss';

export default props => {
  const { portal = document.body } = props;
  return createPortal(<div className="finxos-header">{props.children}</div>, portal);
};
