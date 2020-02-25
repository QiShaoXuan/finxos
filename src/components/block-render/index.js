import React from 'react';
import { transformBlock } from '@finxos/blocks';
import './style.scss';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { deepClone } from '@finxos/tools';
export default props => {
  const { RenderSetting } = props;

  // return (
  //   <div className="finxos-block">
  //     <RenderSetting.render {...props} />
  //     {check(props.element.children) ? (
  //       RenderSetting.placeholder ? (
  //         <span className="finxos-block-placeholder" data-placeholder={RenderSetting.placeholder}></span>
  //       ) : null
  //     ) : null}
  //   </div>
  // );

  return (
    <div className="fincos-block">
      <RenderSetting.render {...props} />
    </div>
  );
};
//
// const check = children => {
//   if (children.length !== 1) {
//     return false;
//   }
//   if (children[0].children) {
//     return check(children[0].children);
//   }
//   if (children[0].text.length === 0) {
//     return true;
//   }
//   return false;
// };
