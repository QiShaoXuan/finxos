import { ReactNode } from 'react';

interface Setting {
  name: string;
  title: string;
  icon(): ReactNode;
  noTransform: boolean;
  preventFormats: string[];
  canEmpty: boolean;
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
