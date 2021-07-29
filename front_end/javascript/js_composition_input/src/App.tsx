import React, { useState } from 'react'

export default function App() {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    console.log('onChange:', e.target.value)
    setValue(e.target.value)
  }

  const handleCompositionStart = (e) => {
    console.log('onCompositionStart:', e.target.value)
  }

  const handleCompositionUpdate = (e) => {
    console.log('onCompositionUpdate:', e.target.value)
  }

  const handleCompositionEnd = (e) => {
    console.log('onCompositionEnd:', e.target.value)
  }

  return (
    <div>
      <h1>JS 事件: Composition Input 组合输入事件</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionUpdate={handleCompositionUpdate}
        onCompositionEnd={handleCompositionEnd}
      />
    </div>
  )
}
