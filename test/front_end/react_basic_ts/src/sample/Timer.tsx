import React, { useEffect, useState } from 'react'

function useTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date())
    }, 1000)
  }, [time])

  return time
}

function Timer() {
  const time = useTime()

  return (
    <div>
      <div>当前时间: {time.toLocaleString()}</div>
    </div>
  )
}

export default Timer
