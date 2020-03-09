import React, { ReactNode, KeyboardEvent, ReactElement, FunctionComponent, SVGAttributes } from 'react';
import { Editor, Node } from 'slate';

export interface Operation {
  (props: {
    currentData: { [key: string]: any };
    setBlockData(data: { [key: string]: any }, options?: { [key: string]: any }): void;
  }): ReactNode;
}

export interface Transform {
  from?: <T extends { children: Node[]; data?: { [key: string]: any } }>(props: T) => T;
  to?: <T extends { children: Node[]; data?: { [key: string]: any } }>(props: T) => T;
  target: string[];
}

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
  operation?: Operation;
  transform?: Transform;
  isVoid?: boolean;
}
