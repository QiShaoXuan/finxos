import paragraph from './paragraph';
import codeSetting from './code';
import heading from './heading';
import list from './list';

export const defaultBlock = paragraph;

export default [paragraph, heading, codeSetting, ...list];
