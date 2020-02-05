import { jsx } from 'slate-hyperscript';

const ELEMENT_TAGS = {
  A: el => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
};

const deserialize = (el, blockPastes, formatPastes) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el;

  // if (nodeName === 'PRE' && el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
  //   parent = el.childNodes[0];
  // }

  const children = Array.from(parent.childNodes)
    .map(child => deserialize(child, blockPastes, formatPastes))
    .flat();

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children);
  }

  for (let format in formatPastes) {
    const formatCheck = formatPastes[format](el);
    if (Boolean(formatCheck)) {
      return children.map(child => jsx('text', { format: formatCheck }, child));
    }
  }

  // if (TEXT_TAGS[nodeName]) {
  //   const attrs = TEXT_TAGS[nodeName](el);
  //   return children.map(child => jsx('text', attrs, child));
  // }

  return children;
};

export default (editor, blocks, formats) => {
  const { insertData } = editor;

  editor.insertData = data => {
    const html = data.getData('text/html');

    const blockPastes = blocks
      .filter(v => v.paste)
      .reduce((group, setting) => {
        group[setting.name] = setting.paste;
        return group;
      }, {});
    const formatPastes = formats
      .filter(v => v.paste)
      .reduce((group, setting) => {
        group[setting.name] = setting.paste;
        return group;
      }, {});

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = deserialize(parsed.body, blockPastes, formatPastes);

      console.log('parsed', parsed);
      console.log('fragment', fragment);

      // Transforms.insertFragment(editor, fragment)
      return;
    }

    insertData(data);
  };
  return editor;
};
