import React from 'react';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { Button } from '@finxos/ui-components';
import OperationArea from '@finxos/components/operation-area';

import './style.scss';
export default props => {
  const { RenderSetting, attributes } = props;

  const focused = useFocused();
  const selected = useSelected();
  const editor = useSlate();

  return (
    <div className="fincos-block">
      <OperationArea />
      <RenderSetting.render {...props} />
    </div>
  );
};
