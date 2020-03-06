import { ReactNode } from 'react';
import { Node } from 'slate';

export interface FormatSetting {
  name: string;
  title: string;
  icon(): ReactNode;
  render(): ReactNode;
  shortcut?: string[];
  paste(el: HTMLElement): boolean | {};
  toolbar?: boolean;
  acrossBlock?: boolean;
  attributes?: { [key: string]: any };
}

export interface FormatRenderProps {
  attributes: { [key: string]: any };
  element: Node;
  children: ReactNode;
}
