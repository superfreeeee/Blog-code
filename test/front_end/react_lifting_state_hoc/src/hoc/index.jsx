import React, { useEffect, useState } from 'react'
import { init } from './store'
import HocVersion1 from './version1'
import HocVersion2 from './version2'

export default function HocSample() {
  const [showV1, setShowV1] = useState(true)

  const toggle = () => {
    setShowV1(!showV1)
    init()
  }

  return (
    <div>
      <h1>高阶组件 HOC</h1>
      <button onClick={toggle}>show version {showV1 ? 2 : 1}</button>
      {showV1 ? <HocVersion1></HocVersion1> : <HocVersion2></HocVersion2>}
    </div>
  )
}
