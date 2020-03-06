import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import './style.scss';

export default (props: { portal: HTMLElement; left?: ReactNode; right?: ReactNode }) => {
  const { portal = document.body, left, right } = props;
  return createPortal(
    <div className="finxos-header">
      <div className="header__left">{left}</div>
      <div className="header__right">{right}</div>
    </div>,
    portal
  );
};
