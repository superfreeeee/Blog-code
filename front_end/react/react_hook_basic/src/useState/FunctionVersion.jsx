import React, { useState } from 'react'

function FunctionVersion() {
  const [name, setName] = useState('Alice')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  return (
    <div>
      <h3>In Function Component</h3>
      <div>name: {name}</div>
      <input value={name} onChange={handleNameChange} />
    </div>
  )
}

export default FunctionVersion
