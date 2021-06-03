import React, { useEffect, useRef, useState } from 'react'

function FunctionVersion() {
  const [name, setName] = useState('Alice')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  useEffect(() => {
    document.title = `name: ${name}`
  })

  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <div>
      <h3>In Function Component</h3>
      <div>name: {name}</div>
      <input ref={ref} value={name} onChange={handleNameChange} />
    </div>
  )
}

export default FunctionVersion
