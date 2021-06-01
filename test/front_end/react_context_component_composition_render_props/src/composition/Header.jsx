import React, { Component } from 'react'

class Header extends Component {
  render() {
    const { left, right } = this.props
    return (
      <div className="header">
        <div className="left">{left}</div>
        <div className="center">
          <h2>Header</h2>
        </div>
        <div className="right">{right}</div>
      </div>
    )
  }
}

export default Header
