import { keyCodes } from './key-code-list';

const assistMap = {
  ctrl: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey',
  meta: 'metaKey',
};

export const keyToCode = key => {
  if (Array.isArray(key)) {
    return key.map(code => keyCodes[code.toUpperCase()]);
  }

  if (typeof key === 'string') {
    return keyCodes[key.toUpperCase()];
  }
};

/*
 * Handle composition shortcuts
 *
 * @param { array } keys
 *
 * @return    {
 *               keyCode?:number,
 *               assist:['ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey']
 *            }
 */

export const compositionKeyToCode = keys =>
  keys.reduce(
    (composition, key, i) => {
      key = key.toLowerCase();

      if (assistMap[key]) {
        composition.assist.push(assistMap[key]);
      } else {
        composition.keyCode = keyCodes[key];
      }

      return composition;
    },
    {
      assist: [],
      value: keys,
    }
  );
