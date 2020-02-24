import paragraph from './paragraph';
import transform from './transform';
import codeSetting from './code';
import heading from './heading';
import list from './list';

export const defaultBlock = paragraph;
export const transformBlock = transform;

export default [paragraph, heading, ...list, transform];
