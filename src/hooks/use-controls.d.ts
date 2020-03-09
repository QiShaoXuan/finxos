import React from 'react';
import { Node } from 'slate';
export declare const ControlsContext: React.Context<{
    containerDom: HTMLElement | null;
    editorDom: HTMLElement | null;
    lastSelection: Range | null;
    selectedBlocks: Node[];
    currentFormats: {
        [key: string]: any;
    };
}>;
export declare const useControls: () => {
    containerDom: HTMLElement | null;
    editorDom: HTMLElement | null;
    lastSelection: Range | null;
    selectedBlocks: Node[];
    currentFormats: {
        [key: string]: any;
    };
};
export declare const ControlsProvider: (props: {
    container: any;
    lastSelection: any;
    children: React.ReactNode;
}) => JSX.Element;
//# sourceMappingURL=use-controls.d.ts.map