import React, { ReactNode, KeyboardEvent, ReactElement, FunctionComponent, SVGAttributes } from 'react';
import { Editor, Node } from 'slate';

export interface BlockSetting {
  name: string;
  title: string;
  // icon(): ReactNode;
  icon: FunctionComponent<SVGAttributes<SVGElement>>;
  data: { [key: string]: any };
  render: (props: { [key: string]: any }) => ReactElement;
  paste(el: HTMLElement): boolean | {};
  isBlock?: boolean;
  preventFormats?: string[];
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>, editor: Editor, selectedBlocks: Node[]): undefined;
  operation?(props: { currentData: { [key: string]: any }; setBlockData(data: {}, options: {}): void }): ReactNode;
  transform?: {
    to?(): { childre: []; data?: {} };
    from?(): { childre: []; data?: {} };
    target: string[];
  };
  isVoid?: boolean;
}
