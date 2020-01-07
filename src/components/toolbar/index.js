import React, { useEffect } from 'react'
import * as Slate from 'slate-react'

import './style.scss'
export default props => {
  const { visible, position } = props
  // const editor = useSlate()


  return visible ? (
    <div className="finxos-toolbar" style={{ ...position }}>
      <div className="toolbar-wrapper"></div>
    </div>
  ) : null
}

// DefaultElement: (...)
// DefaultLeaf: (...)
// Editable: (...)
// ReactEditor: (...)
// Slate: (...)
// useEditor: (...)
// useFocused: (...)
// useReadOnly: (...)
// useSelected: () => {…}
// useSlate: (...)
// withReact: (...)
