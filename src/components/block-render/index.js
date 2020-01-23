import React from 'react';
import './style.scss';
export default props => {
  const { RenderSetting } = props;

  return (
    <div className="fincos-block">
      <RenderSetting.render {...props} />
    </div>
  );
};
