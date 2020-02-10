import { jsx } from 'slate-hyperscript';
import { Transforms } from 'slate';
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

const deserialize = (el, blocks, formats) => {
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
    .map(child => deserialize(child, blocks, formats))
    .flat();

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  // if (ELEMENT_TAGS[nodeName]) {
  //   const attrs = ELEMENT_TAGS[nodeName](el);
  //   return jsx('element', attrs, children);
  // }

  //
  // return jsx('element', { type: 'paragraph', data: { align: 'center' } }, children);
  // return jsx('element', { type: 'paragraph', data: { align: 'left' } }, children);

  for (let i = 0; i < blocks.length; i++) {
    const blockCheck = blocks[i].paste ? blocks[i].paste(el) : false;
    if (Boolean(blockCheck)) {
      console.log("blockCheck", blockCheck);

      return jsx(
        'element',
        Object.assign(
          {
            type: blocks[i].name,
            data: JSON.parse(JSON.stringify(blocks[i].data)),
          },
          typeof blockCheck === 'object' ? blockCheck : {}
        ),
        children
      );
    }
  }

  for (let i = 0; i < formats.length; i++) {
    const formatCheck = formats[i].paste ? formats[i].paste(el) : false;
    if (Boolean(formatCheck)) {
      return children.map(child => jsx('text', { [formats[i].name]: formatCheck }, child));
    }
  }

  return children;
};

export default (editor, blocks, formats) => {
  const { insertData } = editor;

  editor.insertData = data => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = deserialize(parsed.body, blocks, formats);

      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };
  return editor;
};
