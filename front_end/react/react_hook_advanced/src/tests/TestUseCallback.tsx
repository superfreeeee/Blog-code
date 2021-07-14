import React, { useCallback } from 'react'
import useInput from '../hooks/useInput'
import { Row } from './TestUseMemo'

const TestUseCallback = () => {
  const [x, changeX] = useInput()
  const [y, changeY] = useInput()

  const concatXY = useCallback(() => {
    console.log(`concatXY = ${x + y}`)
    return x + y
  }, [x, y])

  return (
    <div>
      <h2>useCallback</h2>
      <Row label={'x:'} value={x} onChange={changeX} />
      <Row label={'y:'} value={y} onChange={changeY} />
      <Row label={'z:'} value={concatXY()} disabled />
    </div>
  )
}

export default TestUseCallback
