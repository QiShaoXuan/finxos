import { Editor, Path } from 'slate';
export declare const getBlockFocus: (editor: Editor, start: Path) => {
    anchor: {
        path: Path;
        offset: number;
    };
    focus: {
        path: Path;
        offset: number;
    };
} | undefined;
export declare const getBlockRange: (editor: Editor, start?: number[] | undefined) => {
    anchor: {
        path: Path;
        offset: number;
    };
    focus: {
        path: Path;
        offset: number;
    };
} | undefined;
//# sourceMappingURL=block-range.d.ts.map