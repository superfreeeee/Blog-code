import React, { useEffect, useLayoutEffect } from 'react'

const TestUseLayoutEffect = () => {
  useEffect(() => {
    console.log('useEffect')
  }, [])

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  }, [])

  return (
    <div>
      <h2>useLayoutEffect</h2>
    </div>
  )
}

export default TestUseLayoutEffect
