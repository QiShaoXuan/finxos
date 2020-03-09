import {
  FunctionComponent, ReactElement,
  ReactNode,
  SVGAttributes,
} from 'react'
import { Node } from 'slate';

export interface FormatSetting {
  name: string;
  title: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>>;
  render(props:FormatRenderProps): ReactElement;
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
