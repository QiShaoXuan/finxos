import React, { createContext, useContext, useMemo } from 'react';
import { compositionKeyToCode } from '@finxos/tools';
export const SettingsContext = createContext({
  blocks: [],
  formats: [],
  formatShortcuts: [],
});

export const useSettings = () => {
  return useContext(SettingsContext);
};

export default props => {
  const formatShortcuts = useMemo(() => {
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
