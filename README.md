# Finxos

## What

一个基于 `slate.js` 的富文本框架，并内置提供了常用的富文本编辑工具。

## Why

`slate.js` 是一个富文本编辑开发的工具。为了避免 "The editor's 'schema' was hardcoded and hard to customize" 等一系列问题，`slate.js` 提供了一套基础而简洁的 API，不提供任何既定模式，而只提供一套指令来共开发者发挥。就像 `jQuery` 或 `React` 之于浏览器，只提供发挥的平台。

但是在大多数场合，开发者需要的是一套 `Bootstrap` 或者 `antd` 甚至于 `antd Pro` 的开发方案。于是 Finxos 决定来做先行者。

## Feature

- 插件优先。遵照 `slate.js` 理念，插件依然是一等公民，所有工具，视图以规定形式申明、注册，开发者仅需关注该插件的内部逻辑及渲染。
- 尽可能少的模式。作为一个库或者说是框架，模式的规范必不可少，但是 Finxos 会尽可能的少且开放
- 重新定义的规范。模糊了 `slate.js` 对于 mark，element 的定义，以 format，block 定义展示逻辑。format 指文字的额外属性及可能的操作，block 指块级展示元素，block 可以包含 block，而 format 不能包含 format（属性不能包含属性）。
- 一个已经设计好的富文本编辑逻辑。
- 一个已经设计好的 UI 组件库。

如上所言，Finxos 只是一个类似于 `antd Pro` 之于 `React` 的框架，它融合了作者认为比较好的富文本操作方式，并会会尽力做到最好，但这些肯定不会适用于所有人。所以，你也可以开发另一个如 `React-Bootstrap` 的框架。当然，也更欢迎你来帮助改进。




## TODO

1. 各种弹窗出现的动画
2. 首次加载 content 需要检查 type
3. block 转换可以优化  
```js
Transforms.setNodes(editor, {
  type: 'paragraph',
  children: [
    {
      text: '天姥连天向天横，势拔五岳掩赤城。',
    },
  ],
});
```
