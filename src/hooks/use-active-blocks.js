import React, { createContext, useContext, useReducer } from 'react'

export const SelectedBlocksContext = createContext()

export function SelectedBlocksReducer(state, action) {
  const { data } = action
  switch (action.action) {
    case 'add':
      if (state.has(data.attributes.ref.current)) {
        return state
      }

      state.set(data.attributes.ref.current, data)
      return state

    case 'remove':
      state.delete(data.attributes.ref.current)

      return state
    default:
      console.error(`Action ${action.type} is not definded`)
      return state
  }
}

export const useSelectedBlocks = () => {
  return useContext(SelectedBlocksContext)
}

export default props => {
  const [selectedBlocks, updateSelectedBlocks] = useReducer(SelectedBlocksReducer, new Map())

  return (
    <SelectedBlocksContext.Provider
      value={{
        selectedBlocks,
        updateSelectedBlocks,
      }}
    >
      {props.children}
    </SelectedBlocksContext.Provider>
  )
}
