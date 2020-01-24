export default (content, blocks) => {
  setData(content, blocks);
  return content;
};

const setData = (children, blocks) => {
  children.forEach(child => {
    if (child.type && !child.data) {
      const setting = blocks.find(v => v.name === child.type);
      child.data = setting && setting.data ? JSON.parse(JSON.stringify(setting.data)) : {};
    }

    if (child.children) {
      setData(child.children);
    }
  });
};