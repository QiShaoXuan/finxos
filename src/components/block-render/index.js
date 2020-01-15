import React from 'react';
import { useFocused, useSelected ,useSlate} from 'slate-react';

export default props => {
  const { RenderSetting, attributes } = props;

  const focused = useFocused();
  const selected = useSelected();
  const editor = useSlate();
  console.log('editor', editor);


  return (
    <div className="fincos-block">
      <RenderSetting.render {...props} />
    </div>
  );
};
