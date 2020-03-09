import React from 'react';
import { BlockSetting } from '@finxos/blocks';
import { FormatSetting } from '@finxos/formats';
export declare const SettingsContext: React.Context<{
    formats: FormatSetting[];
    blocks: BlockSetting[];
    formatShortcuts: {};
}>;
export declare const useSettings: () => {
    formats: FormatSetting[];
    blocks: BlockSetting[];
    formatShortcuts: {};
};
export declare const SettingsProvider: (props: {
    settings: {
        formats: FormatSetting[];
        blocks: BlockSetting[];
    };
    children: React.ReactNode;
}) => JSX.Element;
//# sourceMappingURL=use-settings.d.ts.map