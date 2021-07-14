import React, { ChangeEventHandler, useMemo } from 'react'
import useInput from '../hooks/useInput'

export interface RowProps {
  label: string
  value: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

export const Row = (props: RowProps) => {
  const { label, ...rest } = props
  return (
    <div>
      <label>
        {label} <input type="text" {...rest} />
      </label>
    </div>
  )
}

const TestUseMemo = () => {
  const [x, changeX] = useInput()
  const [y, changeY] = useInput()

  const z = useMemo(() => {
    console.log(`recalculate concatXY = ${x + y}`)
    return x + y
  }, [x, y])

  return (
    <div>
      <h2>useMemo</h2>
      <Row label={'x:'} value={x} onChange={changeX} />
      <Row label={'y:'} value={y} onChange={changeY} />
      <Row label={'z:'} value={z} disabled />
    </div>
  )
}

export default TestUseMemo
