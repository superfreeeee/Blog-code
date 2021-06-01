import React, { Component } from 'react'

class SideBar extends Component {
  render() {
    return <div className="sidebar">{this.props.children}</div>
  }
}

export default SideBar
