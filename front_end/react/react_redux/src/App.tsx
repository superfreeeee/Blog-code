import React from 'react'
import { Provider } from 'react-redux'

import Basic from './basic/Basic'
import Class from './class/Class'
import Hook from './hook/Hook'

import { createTimerStore } from './timer'

const withThunk = true

const store = createTimerStore(withThunk)
const store2 = createTimerStore(withThunk)

export default function App() {
  return (
    <div>
      <h1>React Redux</h1>
      <Basic />
      <Provider store={store}>
        <Class />
      </Provider>
      <Provider store={store2}>
        <Hook />
      </Provider>
    </div>
  )
}
