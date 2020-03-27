import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSlate } from 'slate-react';
import { useControls } from '@finxos/hooks';
import ToolbarButton from './toolbar-button';
import { FormatSetting } from '@finxos/formats';
import './style.scss';

export default (props: { protal?: HTMLElement }) => {
  const editor = useSlate();
  const { showToolBar, selectedBlockSettings } = useControls();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(showToolBar);
  }, [showToolBar]);

  if (!showToolBar) {
    return null;
  }

  const { protal = document.body } = props;
  const domSelection = window.getSelection();
  const domRange = (domSelection as Selection).getRangeAt(0);
  const rect = domRange.getBoundingClientRect();

  const {
    settings: { formats },
  } = editor;

  const position = {
    top: `${rect.top + window.pageYOffset}px`,
    left: `${rect.left + window.pageXOffset + rect.width / 2}px`,
  };

  return createPortal(
    <div className="finxos-toolbar" style={{ ...position }}>
      <div className={`toolbar-wrapper ${open ? 'toolbar-wrapper--open' : ''}`}>
        {formats.map((format: FormatSetting) => {
          if (format.toolbar === false) {
            return null;
          }
          if (selectedBlockSettings.length > 1 && format.acrossBlock === false) {
            return null;
          }

          for (let i = 0; i < selectedBlockSettings.length; i++) {
            if (
              selectedBlockSettings[i].preventFormats &&
              (selectedBlockSettings[i] as { preventFormats: string[] }).preventFormats.includes(format.name)
            ) {
              return null;
            }
          }

          return <ToolbarButton format={format} key={format.name} />;
        })}
      </div>
    </div>,
    protal
  );
};
