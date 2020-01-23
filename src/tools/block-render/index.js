import React, { useContext, useEffect } from 'react';
import { useSelected, useFocused } from 'slate-react';

export default props => {
  const { RenderSetting, attributes } = props;

  const focused = useFocused();
  const selected = useSelected();

  return (
    <>
      <RenderSetting.render {...props} />
    </>
  );
};
