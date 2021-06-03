import React from 'react'
import CustomerHookSample from './customer'
import UseContextSample from './useContext'
import UseEffectSample from './useEffect'
import UseStateSample from './useState'

export default function App() {
  return (
    <div>
      <h1>React Hook API</h1>
      <UseStateSample />
      <UseEffectSample />
      <UseContextSample />
      <CustomerHookSample />
    </div>
  )
}
