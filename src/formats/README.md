```jsx harmony
const formatsSettings = {
  name: 'formatName',
  title: __('format title'),
  icon: LinkIcon,
  attributes: {
    url: '',
    blank: true,
  },
  acrossBlock: false,
  render: props => {
    return <strong {...props.attributes}>{props.children}</strong>;
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'l';
  },
};
```
