import bold from './bold';
import code from './code';
import italic from './italic';
import underline from './underline';
import link from './link';
import throughline from './linethrough';
import { FormatSettings } from './interface';

export { FormatSettings, FormatRenderProps } from './interface';

export default <FormatSettings[]>[bold, italic, underline, link, code, throughline];
