import { deepClone } from '@finxos/tools';
export default (content, blocks) => {
  setData(content, blocks);
  return content;
};

const setData = (children, blocks) => {
  children.forEach(child => {
    if (child.type && !child.data) {
      const setting = blocks.find(v => v.name === child.type);
      child.data = setting && setting.data ? deepClone(setting.data) : {};
    }

    if (child.children) {
      setData(child.children, blocks);
    }
  });
};
