import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import Default from './Default'
import Home from './Home'

export interface RouteUserParam {
  userId: string
}

export default function App() {
  return (
    <div>
      <h1>React Router</h1>
      <Router>
        <ul>
          <li><Link to="/">Default</Link></li>
          <li><Link to="/123">Default 123</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/home/456">Home 456</Link></li>
        </ul>
        <Switch>
          <Route path="/"            exact={true} component={Default}></Route>
          <Route path="/home"        exact={true} component={Home}></Route>
          <Route path="/:userId"      exact={true} component={Default}></Route>
          <Route path="/home/:userId" exact={true} component={Home}></Route>
        </Switch>
      </Router>
    </div>
  )
}
