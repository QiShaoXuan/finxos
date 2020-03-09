import { Editor } from 'slate';
import { FormatSetting } from '@finxos/formats';
export declare const getCurrentFormats: (editor: Editor) => Record<string, any>;
export declare const isFormatActive: (editor: Editor, formatName: string) => boolean;
export declare const applyFormat: (editor: Editor, name: string, attributes?: boolean | {} | undefined) => void;
export declare const removeFormat: (editor: Editor, formatName: string) => void;
export declare const updateFormat: (editor: Editor, name: string, properties: {}, newProperties: {}) => void;
export declare const toggleFormat: (editor: any, formatSetting: FormatSetting) => void;
//# sourceMappingURL=index.d.ts.map