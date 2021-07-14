import { useDebugValue } from 'react'

export default function useNothing(bool: boolean) {
  useDebugValue(bool ? 'Online' : 'Offline')
}
