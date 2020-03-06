import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { BlockSetting } from '@finxos/blocks';
import { FormatSetting } from '@finxos/formats';

import { compositionKeyToCode } from '@finxos/tools';

export const SettingsContext = createContext({
  blocks: [],
  formats: [],
  formatShortcuts: {},
} as { formats: FormatSetting[]; blocks: BlockSetting[]; formatShortcuts: {} });

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = (props: {
  settings: {
    formats: FormatSetting[];
    blocks: BlockSetting[];
  };
  children: ReactNode;
}) => {
  const formatShortcuts: {} = useMemo(() => {
    return props.settings.formats.reduce((shortcuts, format) => {
      if (format.shortcut) {
        shortcuts[format.name] = compositionKeyToCode(format.shortcut);
      }
      return shortcuts;
    }, {});
  }, [props.settings.formats]);

  return (
    <SettingsContext.Provider
      value={{
        ...props.settings,
        formatShortcuts,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
