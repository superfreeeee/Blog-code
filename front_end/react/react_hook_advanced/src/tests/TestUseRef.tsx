import React, { useCallback, useEffect, useRef } from 'react'

const TestUseRef = () => {
  const inputRef = useRef<HTMLInputElement>()

  const handleChange = useCallback(() => {
    console.log(`value = ${inputRef.current.value}`)
  }, [inputRef])

  return (
    <div>
      <h2>useRef</h2>
      <input type="text" ref={inputRef} onChange={handleChange} />
    </div>
  )
}

export default TestUseRef
