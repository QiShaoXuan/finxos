import { deepClone } from '@finxos/tools';

// export default [
//   {
//     name: 'paragraph',
//     data: data => {
//       return {};
//     },
//     options: {
//       match: n => n.type === 'list-item',
//     },
//     before: editor => {
//       Transforms.unwrapNodes(editor, {
//         match: n => n.type === 'list',
//         split: true,
//         mode: 'all',
//         at: Range.isCollapsed(editor.selection) ? getBlockRange(editor) : editor.selection,
//       });
//     },
//     after: editor => {
//       editor.children.forEach((child, i) => {
//         if (child.type === 'list-item') {
//           Transforms.setNodes(
//             editor,
//             {
//               type: 'paragraph',
//             },
//             {
//               mode: 'highest',
//               at: [i],
//               match: n => n.type === 'list-item',
//             }
//           );
//         }
//       });
//     },
//   },
// ];

export default {
  from: ({ children }) => {
    const item = {
      type: 'list-item',
      children: [{ text: '' }],
      data: { type: 'ul1' },
    };
    let items = [deepClone(item)];

    children.forEach(child => {
      const breakMatch = [...child.text.matchAll(/\n/g)].map(v => v.index);

      if (breakMatch.length) {
        breakMatch.push(child.text.length - 1);

        breakMatch.forEach((position, i) => {
          items[items.length - 1].children[0].text += child.text
            .slice(breakMatch[i - 1] === undefined ? 0 : breakMatch[i - 1], position)
            .replace('\n', '');

          if (i !== breakMatch.length - 1) {
            items.push(deepClone(item));
          }
        });
      } else {
        items[items.length - 1].children[0].text += child.text;
      }
    });

    return { children: items };
  },
  to: ({ children }) => {
    let texts = [];
    const helper = children => {
      children.forEach(child => {
        if (child.type === 'list-item') {
          texts.push(...child.children);
          texts.push({ text: '\n' });
        } else {
          helper(child.children);
        }
      });
    };

    helper(children);
    texts.splice(texts.length - 1, 1);

    return { children: texts };
  },
  target: ['paragraph'],
};
