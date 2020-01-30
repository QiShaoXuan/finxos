import { Path } from 'slate';
import { useSelected, ReactEditor, useSlate } from 'slate-react';
import { getBlock } from '@finxos/tools';

const letters = 'abcdefghijklmnopqrstuvwxyz';

export const getItemPrefix = (editor, path, type, deep) => {
  return type.indexOf('ul') === -1 ? getOlIcon(editor, path, type, deep) : getUlIcon(editor, path, type, deep);
};

export const getListDeep = (editor, itemPath) => {
  let deep = -1;
  let path = itemPath;

  while (path.length > 1) {
    path = Path.parent(path);
    if (getBlock(editor, path).type === 'list') {
      deep += 1;
    }
  }

  return deep;
};

const getItemIndex = (editor, itemPath) => {
  let index = 0;
  let limit = 0;
  while (limit <= itemPath[itemPath.length - 1]) {
    if (getBlock(editor, itemPath.slice(0, itemPath.length - 1).concat(limit)).type === 'list-item') {
      index += 1;
    }
    limit += 1;
  }
  return index;
};

const convertRoman = (num, upper = true) => {
  var aArray = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var rArray = upper
    ? ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    : ['m', 'cm', 'd', 'cd', 'c', 'xc', 'l', 'xl', 'x', 'ix', 'v', 'iv', 'i'];
  var str = '';
  for (var i = 0; i < aArray.length; i++) {
    while (num >= aArray[i]) {
      str += rArray[i];
      num -= aArray[i];
    }
  }
  return str;
};

const getUlIcon = (editor, path, type, deep) => {
  const firstIndex = Number(type.replace('ul', '')) - 1;
  return '▶●■▶●■'.slice(firstIndex, firstIndex + 3)[deep % 3];
};

const getOlIcon = (editor, path, type, deep) => {
  switch (type) {
    case 'ol1':
      return path
        .reduce((indexGroup, p, i) => {
          if (i > 0) {
            indexGroup.push(getItemIndex(editor, path.slice(0, i + 1)));
          }
          return indexGroup;
        }, [])
        .join('.');
      return '';
    case 'ol2':
      return path.length > 2
        ? path
            .reduce((indexGroup, p, i) => {
              if (i > 1) {
                indexGroup.push(getItemIndex(editor, path.slice(0, i + 1)));
              }
              return indexGroup;
            }, [])
            .join('.')
        : convertRoman(getItemIndex(editor, path));
      return '';
    case 'ol3':
      const index = getItemIndex(editor, path);
      switch (deep % 3) {
        case 0:
          return `${index}.`;
        case 1:
          return `${letters[(index - 1) % 26]}.`;
        case 2:
          return `${convertRoman(index, false)}.`;
      }
    default:
      return '';
  }
};

function setTemplateOl3(uls, level = 0) {
  const lis = getLis(uls);
  lis.forEach((li, i) => {
    const index = i + 1;
    let prefix = '';
    switch (level % 3) {
      case 0:
        prefix = `${index}.`;
        break;
      case 1:
        for (let j = 0; j < Math.ceil(index / 26); j++) {
          prefix += `${enWord[i % 26]}`;
        }
        prefix += '.';
        break;
      case 2:
        prefix = `${convertToRomans(index)}.`;
        break;
    }
    li.setAttribute('data-prefix', prefix);
    const childUls = getChildUl(li);
    if (childUls) {
      setTemplateOl3(childUls, level + 1);
    }
  });
}
