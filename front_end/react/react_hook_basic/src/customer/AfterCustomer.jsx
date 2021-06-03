import React, { useEffect, useState } from 'react'

function useName(initName) {
  const [name, setName] = useState(initName)

  function handleNameChange(e) {
    setName(e.target.value)
  }

  useEffect(() => {
    document.title = `name: ${name}`
  }, [name])

  return [name, handleNameChange]
}

function useTimer() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date())
    }, 1000)
    return () => clearTimeout(timer)
  }, [time])

  return time
}

function AfterCustomer() {
  const [name, onNameChange] = useName('Alice')
  const time = useTimer()

  return (
    <div>
      <h2>封装之后</h2>
      <div>name: {name}</div>
      <input value={name} onChange={onNameChange} />
      <div>当前时间: {time.toLocaleString()}</div>
    </div>
  )
}

export default AfterCustomer
