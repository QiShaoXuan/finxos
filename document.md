## Editor

1. Editor.above(editor)

- 获取当前位置的最上层 block

2. `addMark(editor: Editor, key: string, value: any): void`

- 添加 mark

3. Editor.after(editor, at)

```js
const [start, end] = Range.edges(selection);
Editor.after(editor, start);
```

- 获取起始位置的前一个位置

4. Editor.before(editor, at)

- 获取起始位置的后一个位置

5. Editor.deleteBackward(editor)

- 以光标位置开始（selection 为 null），向前删除文字

6. Editor.deleteForward(editor)

- 以光标位置开始（selection 为 null），向后删除文字

7. Editor.deleteFragment(editor)

- 删除当前选择的 selection

8. Editor.edges(editor, more...)

- 获取当前 selection 的起始结束位置

```js
const [start, end] = Range.edges(selection);
```

9. `end(editor: Editor, at: Location): Point`

- 获取选中部分的结束位置

10. `start(editor: Editor, at: Location): Point`

- 获取选中部分的起始位置

11. `fragment(editor: Editor, at: Location): Descendant[]`

- 获取当前 selection 内的 block

12. `hasBlocks(editor: Editor, element: Element): boolean`

- 是否存在 Block

13. Editor.hasInlines(editor, more...)

- 是否存在 inline

14. Editor.hasTexts(editor, more...)

- 是否存在 text

15. Editor.insertBreak(editor)

- 在当前位置换行，如果选中，则选中部分被删除后换行

16. `insertFragment(editor: Editor, fragment: Node[]): void`

- 添加一段 fragment

```js
Editor.insertFragment(editor, [
  {
    type:'paragraph'
    children: [{ text: 'outer code' }],
  },
]);
```

17. `insertNode(editor: Editor, node: Node): void`

- 添加一个 block

18. `insertText(editor: Editor, text: string): void`

- 添加一个文字

19. Editor.isBlock(editor, more...)

- 是否为块级

20. Editor.isEditor(editor)

- 是否为 Editor 对象

21. Editor.isEnd(editor, more...)

-

22. Editor.isEdge(editor, more...)

-

23. `isEmpty(editor: Editor, element: Element): boolean `

- 当前 block 是否为空

24. Editor.isInline(editor, more...)

-

25. Editor.isNormalizing(editor)

-

26. Editor.isStart(editor, more...)

-

27. Editor.isVoid(editor, more...)

- 是否为不可编辑

28. Editor.last(editor, more...)

-

29. Editor.leaf(editor, at)

-   获取最底层节点

30. Editor.levels(editor)

- 遍历一个位置上的所有级别

31. Editor.marks(editor)

- 当前选中部分的包含的 format 集合

32. Editor.next(editor)

-

33. Editor.node(editor, more...)

-   获取当前位置的 block

34. Editor.nodes(editor)

- 遍历编辑器中的所有节点

35. Editor.normalize(editor)

-

36. Editor.parent(editor, more...)

-

37. Editor.path(editor, more...)

-

38. Editor.pathRef(editor, more...)

-

39. Editor.pathRefs(editor)

-

40. Editor.point(editor, more...)

-

41. Editor.pointRef(editor, more...)

-

42. Editor.pointRefs(editor)

-

43. Editor.positions(editor)

-   获取所有选中的光标位置

44. Editor.previous(editor)

-  获取当前 block 的上一个 block

45. Editor.range(editor, more...)

- 获取当前 selection，貌似好 editor.selection 同

46. Editor.rangeRef(editor, more...)

-

47. Editor.rangeRefs(editor)

-

48. Editor.removeMark(editor, more...)

-

49. Editor.start(editor, more...)

-

50. Editor.string(editor, more...)

-

51. Editor.transform(editor, more...)

-

52. Editor.unhangRange(editor, more...)

-

53. Editor.void(editor)

-

54. Editor.withoutNormalizing(editor, more...)
