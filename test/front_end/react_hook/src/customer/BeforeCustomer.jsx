import React, { useEffect, useState } from 'react'

function BeforeCustomer() {
  const [name, setName] = useState('Alice')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  useEffect(() => {
    document.title = `name: ${name}`
  }, [name])

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date())
    }, 1000)
    return () => clearTimeout(timer)
  }, [time])

  return (
    <div>
      <h2>封装之前</h2>
      <div>name: {name}</div>
      <input value={name} onChange={handleNameChange} />
      <div>当前时间: {time.toLocaleString()}</div>
    </div>
  )
}

export default BeforeCustomer
