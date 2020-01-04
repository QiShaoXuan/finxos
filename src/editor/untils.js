import React, { useCallback } from 'react'
import { Editor } from 'slate'
import BlockSettings from '../blocks'
import FormatSettings from '../formats'

export const renderElement = props => {
  const {
    element: { type },
  } = props

  const RenderSetting =
    BlockSettings.find(v => {
      return v.name === type
    }) || BlockSettings.find(v => v.name === 'paragraph')

  return <RenderSetting.render {...props} />
}

export const renderLeaf = props => {
  const RenderFormats = FormatSettings.filter(v => props.leaf[v.name])

  return (
    <span {...props.attributes}>
      {RenderFormats.reduce(
        (children, Format) => (
          <Format.render {...props.attributes}>{children}</Format.render>
        ),
        props.children
      )}
    </span>
  )
}

export const isActiveBlock = (editor, blockName) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === blockName,
  })
  return !!match
}

export const isActiveFormat = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
  })
  return !!match
}


function getRectangleFromRange(range) {

  if (!range.collapsed) {
    return range.getBoundingClientRect();
  }

  let _range = range,
    startContainer = _range.startContainer;

  if (startContainer.nodeName === 'BR') {
    const parentNode = startContainer.parentNode;
    const index = Array.from(parentNode.childNodes).indexOf(startContainer);
    range = document.createRange();
    range.setStart(parentNode, index);
    range.setEnd(parentNode, index);
  }

  let rect = range.getClientRects()[0];

  if (!rect) {
    var padNode = document.createTextNode("\u200B");
    range.insertNode(padNode);
    rect = range.getClientRects()[0];
    padNode.parentNode.removeChild(padNode);
  }

  return rect;
}
function getOffsetParent(node) {
  var closestElement;

  while (closestElement = node.parentNode) {
    if (closestElement.nodeType === window.Node.ELEMENT_NODE) {
      break;
    }
  }

  if (!closestElement) {
    return null;
  }

  if (getComputedStyle(closestElement).position !== 'static') {
    return closestElement;
  }

  return closestElement.offsetParent;
}
export function getCurrentCaretPositionStyle() {
  const selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return {};
  }

  const rect = getRectangleFromRange(selection.getRangeAt(0));
  if (!rect) {
    return {
      left: 0,
      top: 0
    };
  }
  let top = rect.top;
  let left = rect.left + rect.width / 2;

  const offsetParent = getOffsetParent(selection.anchorNode);
  if (offsetParent) {
    const parentRect = offsetParent.getBoundingClientRect();
    top -= parentRect.top;
    left -= parentRect.left;
  }

  return { top, left };
}
