import bold from './bold';
import code from './code';
import italic from './italic';
import underline from './underline';
import link from './link';
import throughline from './linethrough';
import { FormatSetting } from './interface';

export { FormatSetting, FormatRenderProps } from './interface';

export default <FormatSetting[]>[bold, italic, underline, link, code, throughline];
