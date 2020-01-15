import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Editor, Text, Node, Range } from 'slate';
import { Slate, Editable, withReact, useFocused, useSelected } from 'slate-react';
import { withHistory } from 'slate-history';
import { useSelectedBlocks } from '../hooks/use-active-blocks';

import { renderElement, renderLeaf, isActiveBlock, isActiveFormat } from './untils';
import getCurrentCaretPositionStyle from '../tools/caret-position';

import BlockSettings from '../blocks';
import FormatSettings from '../formats';

import ToolBar from '../components/toolbar';
import './style.scss';
import BlockMenu from '../components/block-menu';
import Header from '../ui-components/header';

const defaultInitParams = {
  content: [],
};

export default initParams => {
  const params = Object.assign(defaultInitParams, initParams);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(params.content);

  const [toolBarVisible, setToolBarVisible] = useState(false);
  const [toolBarPosition, settoolBarPosition] = useState(null);
  const { selectedBlocks } = useSelectedBlocks();
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => {
        setValue(value);
        // -------------------- set toolbar visible and position ----------------------
        const { selection, children } = editor;
        console.log('Node', Node);

        // console.log('get',node)
        //
        //  console.log('node',  Editor.node(editor, path))
        //  console.log('leaves', Array.from( Node.levels(editor, path)))

        if (selection) {
          setToolBarVisible(!Range.isCollapsed(selection));
          if (!Range.isCollapsed(selection)) {
            settoolBarPosition(getCurrentCaretPositionStyle());
          }
        } else {
          setToolBarVisible(false);
        }
        // -------------------- END - set toolbar visible and position ----------------------
      }}
    >
      <Header>
        <BlockMenu BlockSettings={BlockSettings} />
        {/*<div>*/}
        {/*  {config.selectedBlocks.map(v => (*/}
        {/*    <span key={v}>{v}</span>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </Header>
      <ToolBar visible={toolBarVisible} position={toolBarPosition} formatSettings={FormatSettings}></ToolBar>
      <Editable
        editor={editor}
        renderElement={useCallback(props => renderElement(props, BlockSettings), [])}
        renderLeaf={useCallback(props => renderLeaf(props, FormatSettings), [])}
        onKeyDown={event => {
          const renderBlock = BlockSettings.find(v => v.shortcut && v.shortcut(event));
          const renderFormat = FormatSettings.find(v => v.shortcut && v.shortcut(event));
          if (renderBlock && renderFormat) {
            console.error(
              `Shortcut is same in block setting "${renderBlock.name}" and format setting "${renderFormat.name}"`
            );
            return;
          }

          // if (renderBlock) {
          //   event.preventDefault()
          //   const isActive = isActiveBlock(editor, renderBlock.name)
          //   Transforms.setNodes(
          //     editor,
          //     { type: isActive ? null : renderBlock.name },
          //     {
          //       match: n => Editor.isBlock(editor, n),
          //     }
          //   )
          // }

          // if (renderFormat) {
          //   event.preventDefault();
          //   const isActive = isActiveFormat(editor, renderFormat.name);
          //   Transforms.setNodes(
          //     editor,
          //     { [renderFormat.name]: isActive ? null : true },
          //     { match: n => Text.isText(n), split: true }
          //   );
          // }
        }}
      />
    </Slate>
  );
};
