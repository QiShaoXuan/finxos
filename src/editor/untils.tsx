import React, { useMemo } from 'react';
import { useSlate } from 'slate-react';
import { BlockSetting } from '@finxos/blocks';
import { FormatSetting } from '@finxos/formats';

export const renderElement = (props: { [key: string]: any }) => {
  const {
    settings: { defaultBlock, blocks },
  } = useSlate();

  const {
    element: { type },
  } = props;

  const currentBlockSetting = blocks.find((v: BlockSetting) => v.name === type) || defaultBlock;

  if (currentBlockSetting.isBlock === false) {
    return <currentBlockSetting.render {...props} />;
  }

  return (
    <div className="fincos-block">
      <currentBlockSetting.render {...props} />
    </div>
  );
};

export const renderLeaf = (props: { [key: string]: any }) => {
  const {
    settings: { formats },
  } = useSlate();

  const ActiveFormats = useMemo(() => {
    let formatArr = [];

    for (let key in props.leaf) {
      if (key !== 'text') {
        let format = formats.find((v: FormatSetting) => v.name === key);
        if (format) {
          formatArr.push(format);
        }
      }
    }
    return formatArr;
  }, [props.leaf]);

  return (
    <span {...props.attributes}>
      {ActiveFormats.reduce((children: any, Format: any) => {
        return (
          <Format.render attributes={props.leaf[Format.name]} element={props.text}>
            {children}
          </Format.render>
        );
      }, props.children)}
    </span>
  );
};

export function compose<T>(target: T, composeFns: ((target: T) => T)[]): T {
  return composeFns.reduce((handler, fn) => fn(handler), target);
}
