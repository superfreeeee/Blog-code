import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import About from '../pages/about'
import Home from '../pages/home'

function Main() {
  const defaultLink = <Link to="/">Default</Link>
  const homeLink = <Link to="/home">Home</Link>
  const aboutLink = <Link to="/about">About</Link>
  const otherLink = <Link to="/other">Other</Link>

  return (
    <BrowserRouter>
      {defaultLink} | {homeLink} | {aboutLink} | {otherLink}
      <Switch>
        <Route exact path="/">
          <h2>Default Content</h2>
        </Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route>
          <h2>Unknown, Redirect to 404</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Main
