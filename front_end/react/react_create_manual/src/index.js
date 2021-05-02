import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  // <App></App>,
  document.getElementById('app')
)
