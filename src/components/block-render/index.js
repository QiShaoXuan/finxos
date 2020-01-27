import React from 'react';
import './style.scss';
export default props => {
  const { RenderSetting } = props;
  return <RenderSetting.render {...props} />;

  // return (
  //   <div className="fincos-block">
  //     <RenderSetting.render {...props} />
  //   </div>
  // );
};
