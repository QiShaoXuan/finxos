import React from 'react';
import { Editor } from 'slate';

import BlockRender from '@Finxos/tools/block-render.js';
import getCurrentFormats from '@Finxos/tools/get-current-formats';
import { useFocused, useSlate } from 'slate-react';

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

export const renderLeaf = (props, FormatSettings) => {
  const editor = useSlate();
  const currentFormats = getCurrentFormats(editor);

  let ActiveFormats = [];

  for (let key in props.leaf) {
    if (key !== 'text') {
      let format = FormatSettings.find(v => v.name === key);
      if (format) {
        ActiveFormats.push(format);
      }
    }
  }

  return (
    <span {...props.attributes}>
      {ActiveFormats.reduce((children, Format) => {
        return (
          <Format.render
            attributes={props.leaf[Format.name]}
            controls={{
              isActive: Boolean(currentFormats[Format.name] && props.leaf[Format.name] === currentFormats[Format.name]),
            }}
          >
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
