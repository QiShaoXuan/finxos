import React from 'react';
import {BlockRender} from '@finxos/components';
import { useControls } from '@finxos/hooks';
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
  const { currentFormats } = useControls();

  let ActiveFormats = [];

  for (let key in props.leaf) {
    if (key !== 'text') {
      let format = formats.find(v => v.name === key);
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

export const compose = (composeFns = [], target) => {
  if (!target) {
    return null;
  }
  return composeFns.reverse().reduce((handler, fn) => fn(handler), target);
};
