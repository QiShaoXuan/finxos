import React from 'react';
import './style.scss';

export default props => {
  const {
    RenderSetting,
  } = props;

  return <RenderSetting.render {...props} />;
};
