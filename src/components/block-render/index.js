import React, { useEffect, useMemo } from 'react';
import { defaultBlock, transformBlock } from '@finxos/blocks';
import './style.scss';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { deepClone } from '@finxos/tools';

export default props => {
  const { RenderSetting, element } = props;
  const editor = useSlate();

  useEffect(() => {
    if (RenderSetting.canEmpty) {
      return;
    }
    if (isTransform(element)) {
      Transforms.setNodes(editor, {
        type: transformBlock.name,
        data: deepClone(transformBlock.data),
      });
    }
  }, [props]);

  return (
    <div className="fincos-block">
      <RenderSetting.render {...props} />
    </div>
  );
};

const isTransform = ({ type, children }) => {
  if (check(children) && type !== transformBlock.name) {
    return true;
  }
  return false;
};

const check = children => {
  if (children.length !== 1) {
    return false;
  }
  if (children[0].children) {
    return check(children[0].children);
  }
  if (children[0].text.length === 0) {
    return true;
  }
  return false;
};
