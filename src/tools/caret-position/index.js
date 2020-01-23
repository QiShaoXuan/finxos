export default function caretPosition() {
  const selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return {};
  }

  const rect = getRectangleFromRange(selection.getRangeAt(0));
  if (!rect) {
    return {
      left: 0,
      top: 0,
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
    var padNode = document.createTextNode('\u200B');
    range.insertNode(padNode);
    rect = range.getClientRects()[0];
    padNode.parentNode.removeChild(padNode);
  }

  return rect;
}
function getOffsetParent(node) {
  var closestElement;

  while ((closestElement = node.parentNode)) {
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
