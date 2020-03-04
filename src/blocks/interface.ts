import { ReactNode } from 'react';

export interface BlockSetting {
  name: string;
  title: string;
  icon(): ReactNode;
  isBlock: boolean;
  preventFormats: string[];
  data: {};
  on(): undefined;
  onKeyDown(): undefined;
  operation(): ReactNode;
  transform?: {
    to?(): { childre: []; data?: {} };
    from?(): { childre: []; data?: {} };
    target(): string[];
  };
  render(): ReactNode;
  paste(): boolean | {};
}
