import React from 'react'
import AliasRef from './refs/AliasRef'
import CallbackRef from './refs/CallbackRef'
import ForwardRef from './refs/ForwardRef'
import ReactCreateRef from './refs/ReactCreateRef'
import StringRef from './refs/StringRef'

export default function App() {
  return (
    <div className="container">
      <h1>React Refs 引用</h1>
      <StringRef />
      <CallbackRef />
      <ReactCreateRef />
      <ForwardRef />
      <AliasRef />
    </div>
  )
}
