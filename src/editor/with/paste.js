import { jsx } from 'slate-hyperscript';
import { Editor, Transforms } from 'slate';

const deserialize = (el, blocks, formats) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

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

  for (let i = 0; i < blocks.length; i++) {
    const blockCheck = blocks[i].paste ? blocks[i].paste(el) : false;
    if (Boolean(blockCheck)) {
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

const findEndsOfChildren = editor => {
  const findPath = (parent, last) => {
    if (parent.children) {
      last.push(parent.children.length - 1);
      return findPath(parent.children[parent.children.length - 1], last);
    }
    return last;
  };

  let path = findPath(editor, []);
  const { text } = path.reduce(
    (last, current, i) => (i === path.length - 1 ? last[current] : last[current].children),
    editor.children
  );

  return {
    path,
    offset: text.length,
  };
};

export default (editor, blocks, formats) => {
  const { insertData } = editor;

  editor.insertData = data => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = deserialize(parsed.body, blocks, formats);

      if (fragment.length === 0) {
        return;
      }

      // delete fragment if selection is not collapsed first
      editor.deleteFragment();

      // judge cursor is in the end of content, new node need insert after current block
      // else move cursor to the after position
      let after = Editor.after(editor, editor.selection.focus);
      const isEnds = after === undefined;
      let endIndex = 0;
      if (after && after.offset === 0) {
        editor.apply({
          type: 'set_selection',
          properties: editor.selection,
          newProperties: {
            anchor: after,
            focus: after,
          },
        });
      }

      Transforms.splitNodes(editor, { at: editor.selection, mode: 'highest' });

      // insert text or node separately
      fragment.forEach((child, i) => {
        // distinguish format or block by the text property
        if (child.text) {
          if (/\n/.test(child.text) && !fragment[i + 1].text) {
            return;
          }
          editor.insertFragment([child]);
        } else {
          if (isEnds) {
            endIndex += 1;
          }
          editor.apply({
            type: 'insert_node',
            path: [editor.selection.focus.path[0] + endIndex],
            node: child,
          });
        }
      });

      // set cursor in the end of pasted content
      let before = isEnds ? findEndsOfChildren(editor) : Editor.before(editor, editor.selection.focus);
      editor.apply({
        type: 'set_selection',
        properties: editor.selection,
        newProperties: {
          anchor: before,
          focus: before,
        },
      });

      return;
    }

    insertData(data);
  };
  return editor;
};
