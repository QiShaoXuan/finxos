import React, { useCallback } from 'react';
import { Editor } from 'slate';

import BlockRender from '../tools/block-render.js';

let num = 1;
export const renderElement = (props, BlockSettings) => {
  const {
    element: { type },
  } = props;

  const RenderSetting =
    BlockSettings.find(v => {
      return v.name === type;
    }) || BlockSettings.find(v => v.name === 'paragraph');
  return <BlockRender {...props} RenderSetting={RenderSetting} />;
};

export const renderLeaf = props => {
  let ActiveFormats = [];
  for (let key in props.leaf) {
    if (key !== 'text' && props.leaf[key] !== null) {
      ActiveFormats.push(props.leaf[key]);
      if (key === 'link') {
        num += 1;
      }
    }
  }

  return (
    <span {...props.attributes}>
      {ActiveFormats.reduce((children, Format) => {
        return (
          <Format.render {...Format.attributes} data-num={num}>
            {children}
          </Format.render>
        );
      }, props.children)}
    </span>
  );
};

export const isActiveBlock = (editor, blockName) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === blockName,
  });
  return !!match;
};

export const compose = (composeFns = [], target) => {
  if (!target) {
    return null;
  }
  return composeFns.reverse().reduce((handler, fn) => fn(handler), target);
};
