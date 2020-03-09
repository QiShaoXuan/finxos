import React, { useMemo } from 'react';
import { BlockRender } from '@finxos/components';
import { useSettings } from '../hooks';
import { FormatSetting } from '@finxos/formats';

export const renderElement = (props: { [key: string]: any }) => {
  const { blocks } = useSettings();
  const {
    element: { type, data },
  } = props;

  const blockSetting =
    blocks.find(v => {
      return v.name === type;
    }) || blocks.find(v => v.name === 'paragraph');

  return <BlockRender {...props} data={data} blockSetting={blockSetting} />;
};

export const renderLeaf = (props: { [key: string]: any }) => {
  const { formats } = useSettings();
  const ActiveFormats = useMemo(() => {
    let formatArr = [];

    for (let key in props.leaf) {
      if (key !== 'text') {
        let format = formats.find(v => v.name === key);
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

// export function compose <T>(target:any, composeFns:[] ) => {
//   if (!target) {
//     return null;
//   }
//   return composeFns.reduce((handler, fn) => fn(handler), target);
// };
export function compose<T>(target: T, composeFns: ((target: T) => T)[]): T {
  return composeFns.reduce((handler, fn) => fn(handler), target);
}
