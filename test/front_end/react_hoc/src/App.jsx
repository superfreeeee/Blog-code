import React, { useEffect, useState } from 'react'
import Version1 from './views/version1'
import Version2 from './views/version2'

export default function App() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    console.log(`visible: ${visible}`)
    setTimeout(() => {
      setVisible(false)
      console.log(`visible: ${visible}`)
    }, 3000)
  }, [])

  return (
    <div>
      <h1>高阶组件 HOC</h1>
      {visible && (
        <>
          {/* <Version1></Version1> */}
          <Version2></Version2>
        </>
      )}
    </div>
  )
}
