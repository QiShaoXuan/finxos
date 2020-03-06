import React from 'react';

import { IconButton } from '@finxos/ui-components';

import H2 from './icons/h2.svg';
import H3 from './icons/h3.svg';
import H4 from './icons/h4.svg';
import left from '@finxos/icons/left.svg';
import center from '@finxos/icons/center.svg';
import right from '@finxos/icons/right.svg';

export default props => {
  const { currentData, setBlockData } = props;
  return (
    <div>
      <div className="finxos-heading__operation">
        {[
          { Icon: H2, level: 2 },
          { Icon: H3, level: 3 },
          { Icon: H4, level: 4 },
        ].map(Data => {
          const { level, Icon } = Data;
          return (
            <IconButton
              key={level}
              className={level === currentData.level ? 'active' : ''}
              onMouseDown={e => {
                e.preventDefault();
                setBlockData({
                  level,
                });
              }}
              icon={Icon}
            />
          );
        })}
      </div>
      <div className="finxos-heading__operation">
        {[
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
        })}
      </div>
    </div>
  );
};
