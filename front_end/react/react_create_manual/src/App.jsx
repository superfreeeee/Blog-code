import React from 'react'

import Main from './router/Main'
import Counter from './pages/counter'

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <h3>Include React Router & Redux usage</h3>
      <h3>Build by webpack + Babel</h3>
      <hr />
      <h1>React Router</h1>
      <Main></Main>
      <hr />
      <h1>React Redux</h1>
      <Counter></Counter>
    </div>
  )
}

export default App
