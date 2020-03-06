import paragraph from './paragraph';
import transform from './transform';
import codeSetting from './code';
import heading from './heading';
import list from './list';
import blockquote from './blockquote';
import { BlockSetting } from './interface';

export const defaultBlock = paragraph;

export { BlockSetting } from './interface';

export default <BlockSetting[]>[paragraph, heading, ...list, blockquote];
