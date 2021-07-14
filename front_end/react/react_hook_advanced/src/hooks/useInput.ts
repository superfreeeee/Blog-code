import { ChangeEvent, ChangeEventHandler, useState } from 'react'

export default function useInput(
  initValue: string = ''
): [string, ChangeEventHandler<HTMLInputElement>] {
  const [value, setValue] = useState(initValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  return [value, handleChange]
}
