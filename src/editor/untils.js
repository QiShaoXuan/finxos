import React, { useMemo } from 'react';
import { BlockRender } from '@finxos/components';
import { useSettings } from '../hooks';

export const renderElement = props => {
  const { blocks } = useSettings();
  const {
    element: { type, data },
  } = props;

  const RenderSetting =
    blocks.find(v => {
      return v.name === type;
    }) || blocks.find(v => v.name === 'paragraph');

  return <BlockRender {...props} data={data} RenderSetting={RenderSetting} />;
};

export const renderLeaf = props => {
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
  });

  return (
    <span {...props.attributes}>
      {ActiveFormats.reduce((children, Format) => {
        return (
          <Format.render attributes={props.leaf[Format.name]} element={props.text}>
            {children}
          </Format.render>
        );
      }, props.children)}
    </span>
  );
};

export const compose = (target, composeFns = []) => {
  if (!target) {
    return null;
  }
  return composeFns.reduce((handler, fn) => fn(handler), target);
};
