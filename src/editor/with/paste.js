import { jsx } from 'slate-hyperscript';
import { Editor, Transforms } from 'slate';
import { defaultBlock } from '@finxos/blocks';

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
    // paste 方法返回的是 boolean 或者对象
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

const handleFragment = fragment => {
  // 处理解析过的 fragment
  // 如果是开始存在的 text ，直接插入到当前 block 中
  // 如果是 block 之间的 text ，则创建一个默认 block 并插入（未识别的 block 也会转换为 text，同样的被转换为默认block）
  const splitIndex = fragment.findIndex(v => v.type);
  if (splitIndex === -1) {
    return [fragment];
  }
  let group = [];

  group.push(fragment.slice(0, splitIndex));

  for (let i = splitIndex; i < fragment.length; i++) {
    if (fragment[i].text) {
      if (i === splitIndex || fragment[i - 1].type) {
        group.push({
          type: defaultBlock.name,
          data: JSON.parse(JSON.stringify(defaultBlock.data)),
          children: [fragment[i]],
        });
      } else {
        group[group.length - 1].children.push(fragment[i]);
      }
    } else {
      group.push(fragment[i]);
    }
  }
  return group;
};

export default (editor, blocks, formats) => {
  const { insertData } = editor;

  editor.insertData = data => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = handleFragment(deserialize(parsed.body, blocks, formats));

      if (fragment.length === 0) {
        return;
      }
      console.log('fragment', fragment);

      // 删除掉当前已选中的部分
      editor.deleteFragment();

      // 如果光标在 block 的末尾处，则将光标移动至下一 block 的开始位置已使 splitNodes 生效
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

      fragment.forEach((child, i) => {
        // 数组应该仅存在于第一项，即直接插入到当前 block 中
        if (Array.isArray(child)) {
          editor.insertFragment(child);
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

      // 将光标设置到粘贴结束的位置
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
