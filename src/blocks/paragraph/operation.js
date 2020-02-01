import React from 'react';
import { IconButton } from '@finxos/ui-components';

import left from './icons/left.svg';
import center from './icons/center.svg';
import right from './icons/right.svg';

export default props => {
  const { data } = props;

  return [
    { Icon: left, align: 'left' },
    { Icon: center, align: 'center' },
    { Icon: right, align: 'right' },
  ].map(Data => {
    const { align, Icon } = Data;
    return (
      <IconButton
        key={align}
        className={align === data.align ? 'active' : ''}
        onMouseDown={e => {
          e.preventDefault();
          props.setBlockData({
            align,
          });
        }}
        icon={Icon}
      />
    );
  });
};
