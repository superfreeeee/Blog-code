import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import Default from './Default'
import Home from './Home'
import configureStore from '../store/configureStore'
import Info from './Info'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const store = configureStore(history)

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <h1>React Router with redux</h1>
          <ul>
            <li><Link to="/">Default</Link></li>
            <li><Link to="/123">Default 123</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/home/456">Home 456</Link></li>
          </ul>
          <Info></Info>
          <Switch>
            <Route path="/"            exact={true} component={Default}></Route>
            <Route path="/home"        exact={true} component={Home}></Route>
            <Route path="/:userId"      exact={true} component={Default}></Route>
            <Route path="/home/:userId" exact={true} component={Home}></Route>
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
