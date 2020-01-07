import { createContext } from 'react'

export const ConfigContext = createContext()

export function ConfigReducer(state, action) {
  const { selectedBlocks } = state

  switch (action.type) {
    case 'addSelectedBlock':
      if (selectedBlocks.includes(action.data)) {
        return state
      }
      selectedBlocks.push(action.data)
      return { ...state, selectedBlocks }
    case 'removeSelectedBlock':
      const index = selectedBlocks.findIndex(v => v === action.data)
      if (index === -1) {
        return state
      }
      selectedBlocks.splice(index, 1)
      return { ...state, selectedBlocks }
    default:
      console.error(`Action ${action.type} is not definded`)
      return state
  }
}
