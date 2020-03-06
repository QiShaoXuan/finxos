import React from 'react';
import { IconButton } from '@finxos/ui-components';

import left from '@finxos/icons/left.svg';
import center from '@finxos/icons/center.svg';
import right from '@finxos/icons/right.svg';

export default props => {
  const { currentData, setBlockData } = props;

  return [
    { Icon: left, align: 'left' },
    { Icon: center, align: 'center' },
    { Icon: right, align: 'right' },
  ].map(Data => {
    const { align, Icon } = Data;
    return (
      <IconButton
        key={align}
        className={align === currentData.align ? 'active' : ''}
        onMouseDown={e => {
          e.preventDefault();
          setBlockData({
            align,
          });
        }}
        icon={Icon}
      />
    );
  });
};
