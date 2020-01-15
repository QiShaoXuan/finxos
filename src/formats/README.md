```jsx harmony
import __ from '@finxos/i18n';

const formatsSettings = {
  name: 'formatName',
  title: __('format title'),
  icon: ReactNode,
  attributes: {
    url: '',
    blank: true,
  },
  acrossBlock: true,
  toolbar: true,
  render: props => {
    return <Tag {...props.attributes}>{props.children}</Tag>;
  },
  shortcut: event => {
    return event.ctrlKey && event.key === 'XXX';
  },
};
```
