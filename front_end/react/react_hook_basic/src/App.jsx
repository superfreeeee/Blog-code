import React from 'react'
import CustomerHookSample from './customer'
import UseContextSample from './useContext'
import UseEffectSample from './useEffect'
import UseStateSample from './useState'

export default function App() {
  return (
    <div style={{ marginLeft: '32px' }}>
      <h1>React Hook API</h1>
      <UseStateSample />
      <UseEffectSample />
      <UseContextSample />
      <CustomerHookSample />
    </div>
  )
}
