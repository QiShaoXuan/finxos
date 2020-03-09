import React, { useMemo } from 'react';
import './style.scss';
import { Node } from 'slate';
import { useSlate } from 'slate-react';
import { isHighestBlock } from '@finxos/tools';
import BlockList from './block-list';
import { BlockSetting } from '@finxos/blocks';

const check = (children: Node[]): Node[] | boolean => {
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

export default (props: { blockSetting: BlockSetting | undefined; [key: string]: any }) => {
  const { blockSetting, element } = props;
  if (blockSetting === undefined) {
    return null;
  }
  const editor = useSlate();

  if (blockSetting.isBlock === false) {
    return <blockSetting.render {...props} />;
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
      <blockSetting.render {...props} />
    </div>
  );
};
