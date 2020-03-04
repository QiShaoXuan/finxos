import React, { useMemo } from 'react';
import './style.scss';
import { useSlate } from 'slate-react';
import { isHighestBlock } from '@finxos/tools';
import BlockList from './block-list';

const check = children => {
  if (children.length !== 1) {
    return false;
  }
  if (children[0].children) {
    return check(children[0].children);
  }
  if (children[0].text.length === 1 && children[0].text === '/') {
    return true;
  }
  return false;
};

export default props => {
  const { RenderSetting, element } = props;
  const editor = useSlate();

  if (RenderSetting.isBlock === false) {
    return <RenderSetting.render {...props} />;
  }

  const showList = useMemo(() => {
    if (check(element.children)) {
      return isHighestBlock(editor, element);
    }

    return false;
  }, [element.children]);

  return (
    <div className="fincos-block">
      {showList ? <BlockList /> : null}
      <RenderSetting.render {...props} />
    </div>
  );
};
